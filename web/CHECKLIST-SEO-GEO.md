# Checklist LMD: funcionalidad, SEO, GEO y Schema

Corte: 24 ago 2026, 14:21. Criterio: básico de lanzamiento.

**44 checks:** 34 listos · 5 parciales · 5 faltan

El canvas de Cursor (panel visual) está en:

`C:\Users\Admin\.cursor\projects\d-Cursor-LMD-web\canvases\seo-geo-schema-checklist.canvas.tsx`

Ese archivo **no** vive dentro de `D:\Cursor\LMD\web`, por eso no sale en el explorador del proyecto. Esta copia sí.

## Qué falta atacar ahora

- [ ] Formulario real (API/CRM) con página de gracias. Mailto pierde leads.
- [x] LocalBusiness: geo, hasMap, GMB en sameAs, areaServed como ciudades.
- [x] sameAs con Google Business Profile. LinkedIn sigue siendo el de Abe (dato enviado).
- [ ] Schema Person del equipo + autores en BlogPosting.
- [ ] OG distinto por tipo de página (twitter:image ya está; casi todo comparte una foto de testimonial).
- [x] CaseStudy en cada caso. Falta Place en `/service-areas`.
- [x] Hub `/services` de verdad. Hoy `/services` hace 301 a SEO.
- [x] Imágenes a `next/image`.



## Funcionalidad


| Estado  | Check                      | En el sitio                                                              | Qué falta                               |
| ------- | -------------------------- | ------------------------------------------------------------------------ | --------------------------------------- |
| Listo   | Navegación                 | Header, footer, servicios, industrias, áreas, blog, casos                |                                         |
| Listo   | Búsqueda interna           | `/search` + overlay + API                                                | noindex, correcto                       |
| Parcial | Captura de leads           | MailtoForm, hero URL, exit popup, get-report                             | Sin backend, CRM, honeypot ni thank-you |
| Listo   | NAP visible                | Tel, email, Doral, mapa en Contact                                       |                                         |
| Listo   | 404 y redirects WP         | not-found + next.config + wp-legacy-redirects.json                       |                                         |
| Listo   | Consentimiento y analytics | Banner, Consent Mode, GA4 G-MWB9XB0TWX y G-TW5DCPSRT1, Hotjar, TVSquared | Meta Pixel sigue en env                 |
| Parcial | Accesibilidad básica       | Skip link, panel a11y, `/accessibility`                                  | No es auditoría WCAG                    |
| Listo   | Headers de seguridad       | CSP (Hotjar y TVSquared), HSTS, nosniff                                  |                                         |
| Listo   | Hub de servicios           | `/services` lista los 12 servicios, glow y CollectionPage |                                         |
| Listo   | Imágenes Next              | SiteImage en header, footer, home, about, blog, 404                      |                                         |




## SEO on-page y crawl


| Estado  | Check                | En el sitio                                        | Qué falta                             |
| ------- | -------------------- | -------------------------------------------------- | ------------------------------------- |
| Listo   | Title y description  | generateMetadata + template                        |                                       |
| Listo   | Canonical            | Páginas indexables                                 |                                       |
| Listo   | robots.txt           | Allow /, llms, sitemaps, `/rss.xml`                |                                       |
| Listo   | Sitemaps             | `/sitemap.xml` + `/blog/sitemap.xml`               |                                       |
| Listo   | html lang            | `lang=en`                                          |                                       |
| Listo   | Breadcrumbs          | UI + BreadcrumbList                                | Home emite WebPage, no BreadcrumbList |
| Listo   | noindex privado      | `/search` follow; `/get-report` nofollow           |                                       |
| Listo   | Redirects legacy     | `/about`, `.html`, slugs WP                        |                                       |
| Parcial | Open Graph / Twitter | twitter:image en layout                            | Casi todo comparte OG_IMAGE           |
| Listo   | H1                   | Un H1 por página. Posts: h1 de WP a h2. Home local |                                       |
| Parcial | Alt                  | Equipo, casos, partners, portadas + next/image     | Blog legado usa el título como alt    |
| Listo   | RSS                  | `/rss.xml`, footer, robots                         |                                       |




## GEO


| Estado | Check            | En el sitio                                                               | Qué falta                                |
| ------ | ---------------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| Listo  | llms.txt         | Páginas, servicios, GMB y RSS                                             |                                          |
| Listo  | llms-full.txt    | Brief + copy + artículos                                                  |                                          |
| Listo  | Crawlers de IA   | GPTBot, ClaudeBot, PerplexityBot allow                                    |                                          |
| Listo  | Entidad NAP      | Geo, hasMap, sameAs redes + GMB                                           |                                          |
| Listo  | FAQ              | Home + `/faqs`                                                            |                                          |
| Listo  | Cobertura tópica | 12 servicios, 27 industrias, 5 áreas, 7 casos, 30 posts                   |                                          |
| Listo  | sameAs           | Instagram, Facebook, LinkedIn de Abe, GMB                                 | No hay LinkedIn de empresa               |
| Listo  | areaServed       | US, Florida, Doral, Miami, Miami Lakes, Hialeah, Coral Gables, Sweetwater |                                          |
| Falta  | Person / autores | Equipo en About sin JSON-LD                                               | Person + sameAs. Blog firma Organization |
| Falta  | Hechos citables  | Sin founded, headcount, certs estructuradas                               | Ficha About estable                      |




## [Schema.org](http://Schema.org)


| Estado  | Tipo                                | Dónde                              | Hueco                                               |
| ------- | ----------------------------------- | ---------------------------------- | --------------------------------------------------- |
| Listo   | LocalBusiness + ProfessionalService | Home `/#business`                  | Sin openingHours ni priceRange (a propósito)        |
| Listo   | WebSite + SearchAction              | Home `/#website`                   |                                                     |
| Listo   | FAQPage                             | Home y `/faqs`                     |                                                     |
| Listo   | Service                             | Las 12 URLs `/services/[slug]`     |                                                     |
| Listo   | BreadcrumbList                      | Interiores y legales               | No en home                                          |
| Listo   | WebPage / AboutPage / ContactPage   | Estáticas + home                   |                                                     |
| Parcial | Blog + BlogPosting                  | `/blog` e `/[slug]`                | author Organization, dateModified = datePublished   |
| Listo   | GeoCoordinates                      | 25.806263, -80.323761 + hasMap GMB |                                                     |
| Falta   | Place                               | service-areas son WebPage          | Miami, Hialeah, etc. como Place                     |
| Falta   | Person                              | About tiene 8 personas en HTML     | employee / founder en el grafo                      |
| Listo   | CaseStudy                           | Cada caso + CollectionPage         | Sin Review inventado                                |
| Falta   | HowTo / Offer                       | Process y planes en home           | HowTo del proceso. Offer solo si hay precios reales |


