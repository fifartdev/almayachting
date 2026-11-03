# ALMA Headless (WordPress)

WordPress is the content admin; the Next.js app in this repo is the public website.
Everything is defined by the `alma-headless` plugin using WordPress core only:
no ACF, no page builders, no commercial plugins.

## Install

1. Copy `wordpress/alma-headless/` to `wp-content/plugins/` on the server (or zip the folder and upload it under **Plugins → Add New → Upload**).
2. Activate **ALMA Headless**.
3. Set **Settings → Permalinks** to "Post name".
4. Add to `wp-config.php`:

```php
define( 'ALMA_FRONTEND_URL', 'https://www.almayachting.com' );           // public visitors are redirected here
define( 'ALMA_REVALIDATE_URL', 'https://www.almayachting.com/api/revalidate' );
define( 'ALMA_REVALIDATE_SECRET', 'long-random-string' );                // same as REVALIDATE_SECRET on Vercel
```

5. For hero videos, make sure PHP allows large enough uploads (`upload_max_filesize` / `post_max_size` ≥ 32M).

## What the client edits

| Admin menu | Content | Frontend |
|---|---|---|
| **ALMA Site** | Site Settings, Homepage, About, Fleet, Destinations, Services, Contact page texts | Built-in pages |
| **Fleet** | Vessels: details, specs, highlights, hero image (featured image), gallery | `/fleet`, `/fleet/{slug}` |
| **Destinations** / **Services** / **Team** | One entry each; order = "Order" in Page Attributes | Their sections |
| **Pages** | Free pages: title, featured image (hero), block content, optional CTA band | `/{slug}` (standard template) |
| **Appearance → Menus** | "Main navigation" and "Footer navigation" | Header / footer |

Homepage hero: **Image slider** (1–6 images) **or** **Single video** (one file, no slider).
Choosing video removes the slider images on save; this is enforced on the server too.

Page slugs `fleet, destinations, services, about, contact, privacy, terms, api, admin` are
reserved for built-in routes and get `-page` appended automatically.

## REST API

| Endpoint | |
|---|---|
| `GET /wp-json/wp/v2/vessels` · `destinations` · `services` · `team-members` · `pages` | Core routes, plus `fields` (custom fields, media expanded) and `featuredImage` |
| `GET /wp-json/alma/v1/settings` | All settings screens keyed by slug |
| `GET /wp-json/alma/v1/settings/{key}` | One screen, e.g. `homepage` |
| `POST /wp-json/alma/v1/settings/{key}` | Partial update (authenticated, Editor+) |
| `GET /wp-json/alma/v1/menus/{primary\|footer}` | Menu tree with site-relative URLs |

Reads are public. Writes (e.g. the content migration script) use an **application password**
(Users → Profile → Application Passwords) for an Editor or Administrator account.
Revoke it after the migration.
