import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// FYP device, drawn in draw.io with standard electrical symbols
// (src/assets/schematic.drawio → `pnpm schematic` → schematic.svg).
// Deliberately generic until submission (owner, 2026-11-10): no part numbers,
// no both-side sensing callout, no time-left output.
// The SVG is our own build artifact; colors are CSS variables. Read per render so
// `pnpm dev` shows a regenerated drawing without a restart (static export reads it once).
export default function Schematic() {
  const svg = readFileSync(join(process.cwd(), 'src/components/home/schematic.svg'), 'utf8');
  return <div className="schematic-wrap min-w-[720px]" dangerouslySetInnerHTML={{ __html: svg }} />;
}
