Add a new yacht to the ALMA Yachting fleet.

Yachts are managed in WordPress (cms.almayachting.com → Fleet → Add new). Ask the user for:
- Yacht name and builder (e.g. "Lagoon 50", "Fountaine Pajot 47")
- Year built
- Number of guests, cabins, bathrooms, crew
- Starting price per week in EUR
- Base port

Then draft, in the same editorial voice (luxury, Greek sailing, evocative):
- The description (main editor)
- 8 highlights (one per line in "Highlights")
- Specifications (LOA, beam, draft, displacement, sail area, engines, fuel/water capacity, max/cruising speed)
- SEO & GEO panel: meta title, meta description, focus key phrase, content summary, 3–5 FAQ entries

Either give the user the text to paste, or create it via the REST API (`POST /wp-json/wp/v2/vessels`
with `title`, `content`, `status`, `fields`) using WP_URL / WP_USER / WP_APP_PASSWORD from .env.local.
The website, footer and sitemap pick it up automatically.
