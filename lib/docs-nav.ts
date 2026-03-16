/**
 * Single source of truth for docs navigation.
 * Used by DocsSidebar and DocsNextLink.
 */

export const DOC_SECTIONS = [
  {
    title: 'Overview',
    links: [
      { href: '/docs', label: 'Introduction' },
      { href: '/docs/getting-started', label: 'Getting Started' },
    ],
  },
  {
    title: 'Core Features',
    links: [
      { href: '/docs/lead-capture', label: 'Lead Capture' },
      { href: '/docs/crm', label: 'CRM Pipeline' },
      { href: '/docs/ai-tools', label: 'AI Tools' },
    ],
  },
  {
    title: 'Advanced',
    links: [
      { href: '/docs/imports', label: 'CSV Imports' },
      { href: '/docs/webhooks', label: 'Webhooks' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/docs/billing', label: 'Billing & Plans' },
      { href: '/docs/faq', label: 'FAQ' },
    ],
  },
] as const

export type DocLink = { href: string; label: string }
export const FLAT_DOC_LINKS: DocLink[] = DOC_SECTIONS.flatMap((s) =>
  s.links.map((l) => ({ href: l.href, label: l.label }))
)
