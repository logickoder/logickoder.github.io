import type { NextConfig } from 'next';

// Static export for GitHub Pages. The user site owns logickoder.dev, so the
// project sites (/retrostash, /redactly, /keyguarde, /21DaysOfCode) keep
// resolving under the same domain. No server runtime on purpose.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
};

export default nextConfig;
