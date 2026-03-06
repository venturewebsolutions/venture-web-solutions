import type { APIRoute } from 'astro'
import { url } from '@/lib/url'

const getContent = (sitemapURL: string) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL}
`

export const GET: APIRoute = () => {
  const sitemapURL = url('/sitemap-index.xml')
  const content = getContent(sitemapURL).trim()
  return new Response(content)
}
