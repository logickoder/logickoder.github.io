// Regenerates src/components/home/schematic.svg from src/assets/schematic.drawio.
// Needs the draw.io desktop CLI (`drawio`) locally; CI uses the committed SVG.
// Edit the diagram in draw.io, then run `pnpm schematic`.
//
// The export keeps draw.io's edge flow animation (flowAnimation=1). This script
// swaps the fixed colors and fonts for the site's CSS variables so the drawing
// follows the light/dark theme.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const src = 'src/assets/schematic.drawio';
const out = 'src/components/home/schematic.svg';
const tmp = join(mkdtempSync(join(tmpdir(), 'schematic-')), 'raw.svg');

execFileSync('drawio', ['-x', '-f', 'svg', '-o', tmp, src], { stdio: 'inherit' });
let svg = readFileSync(tmp, 'utf8');

const colors = {
  '#888888': 'var(--line2)',
  '#d2691e': 'var(--accent)',
  '#666666': 'var(--fg3)',
  '#444444': 'var(--fg2)',
  'rgb(136, 136, 136)': 'var(--line2)',
  'rgb(210, 105, 30)': 'var(--accent)',
  'rgb(102, 102, 102)': 'var(--fg3)',
  'rgb(68, 68, 68)': 'var(--fg2)'
};
for (const [from, to] of Object.entries(colors)) {
  svg = svg.replace(new RegExp(from.replace(/[()]/g, '\\$&'), 'gi'), to);
}

// draw.io wraps colors in light-dark(light, dark) for its own dark mode. The site
// has its own theme variables, so keep only the (already mapped) light value.
svg = svg.replace(/light-dark\((var\(--[\w-]+\)),\s*(?:rgb\([^)]*\)|#[0-9a-f]+)\)/gi, '$1');

// draw.io appends a "Text is not SVG" fallback link to its FAQ for old viewers. Drop it.
svg = svg.replace(/<switch><g requiredFeatures="[^"]*"\/><a [^>]*svg-export-text-problems[^>]*>[\s\S]*?<\/a><\/switch>/g, '');

// Each label also carries a base64 PNG fallback for viewers without
// foreignObject. Every browser that runs this site has it, and the PNGs were
// about 80% of the file, which ships twice (HTML plus the RSC payload).
svg = svg.replace(/<image [^>]*xlink:href="data:image\/png;base64,[^"]*"[^>]*\/>/g, '');

svg = svg
  .replace(/fill="#ffffff"/gi, 'fill="var(--surface)"')
  .replace(/<\?xml[^>]*>\s*/, '')
  .replace(/<!DOCTYPE[^>]*>\s*/, '')
  .replace(/font-family="[^"]*"/g, 'font-family="var(--font-mono)"')
  .replace(/font-family:\s*[^;"]+/g, 'font-family: var(--font-mono)')
  .replace(/\scontent="[^"]*"/, '')
  .replace(/style="background(?:-color)?:[^"]*"/, '')
  .replace(/<svg([^>]*?)\swidth="[^"]*"\s+height="[^"]*"/, '<svg$1')
  .replace(
    '<svg',
    '<svg role="img" aria-label="Schematic: a battery powers a load through an inverter. Sensors feed a microcontroller running a small on-device model, which talks to a phone app." class="schematic"'
  );

writeFileSync(out, svg);
console.log(`wrote ${out} (${svg.length} bytes)`);
