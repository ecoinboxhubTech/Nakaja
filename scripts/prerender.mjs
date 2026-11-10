// Runs after `vite build` + `vite build --ssr`: injects the server-rendered page into dist/index.html
// so crawlers (Google, Bing, WhatsApp/Facebook/LinkedIn previews) get real content without running JS.
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const SITE = (process.env.SITE_URL || 'https://nakajahcare.org').replace(/\/$/, '')
const DEFAULT = 'https://nakajahcare.org'

const { render } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href)
const html = render()

const file = path.join(root, 'dist/index.html')
let page = readFileSync(file, 'utf8')
if (!page.includes('<div id="root"></div>')) throw new Error('prerender: <div id="root"></div> not found in dist/index.html')
page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
// the <noscript> fallback is redundant once real HTML is present
page = page.replace(/<noscript>[\s\S]*?<\/noscript>/, '')
if (SITE !== DEFAULT) page = page.split(DEFAULT).join(SITE)
writeFileSync(file, page)

// robots.txt + sitemap.xml with the real domain and today's date
const today = new Date().toISOString().slice(0, 10)
writeFileSync(path.join(root, 'dist/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`)
writeFileSync(path.join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`)

rmSync(path.join(root, 'dist-server'), { recursive: true, force: true })
console.log(`prerendered ${(html.length / 1024).toFixed(0)} KB of HTML for ${SITE}`)
