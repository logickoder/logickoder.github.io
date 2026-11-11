import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

// The favicon (src/app/icon.svg) rendered square for iOS, which applies its own
// corner mask, so the rounded background rect is squared off here.
export function GET() {
  const svg = readFileSync(join(process.cwd(), 'src/app/icon.svg'), 'utf8').replace('rx="14"', 'rx="0"');
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt="" width={180} height={180} src={`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`} />
    ),
    { width: 180, height: 180 }
  );
}
