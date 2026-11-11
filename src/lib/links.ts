// Links that leave the site open in a new tab; in-site links stay in the same tab.
export function external(href: string): { target?: '_blank'; rel?: string } {
  return /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
