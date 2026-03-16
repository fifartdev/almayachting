Add a new yacht to the ALMA Yachting fleet.

Ask the user for:
- Yacht name and builder (e.g. "Lagoon 50", "Fountaine Pajot 47")
- Year built
- Number of guests, cabins, bathrooms, crew
- Starting price per week in EUR
- Base port

Then add a complete entry to `src/lib/yachts.ts` following the exact same structure as the existing yachts, with:
- A realistic description in the same editorial voice (luxury, Greek sailing, evocative)
- 8 highlights bullet points
- Accurate specifications (loa, beam, draft, displacement, sailArea, engines, fuelCapacity, waterCapacity, maxSpeed, cruisingSpeed)
- Image paths using the pattern `/images/[YachtFolder]/[YachtName]-1.jpg` through `-N.jpg` (heroImage = `-1.jpg`, images array = the rest)
- Slug derived from the name (e.g. "lagoon-50", "fountaine-pajot-47")

Also add the yacht to the footer fleet links in `src/components/Footer.tsx`.
