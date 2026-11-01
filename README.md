# Sestriere 2027

Polish group trip planner for January–March 2027. Prices are dated observations or explicitly marked estimates, not reservations. The page compares four dates and parties of two or four adults, with lodging links, baggage details and interactive maps.

Run `npm ci`, then `npm run dev`. `npm run build` checks TypeScript and creates the static site. GitHub Actions publishes `dist` to GitHub Pages.

Source data and external references live in `src/data.ts`; interactive content is in `src/main.ts`. Map data is attributed to OpenStreetMap and OpenSnowMap. The linked resort photo belongs to Sestriere.it.

Flight quotes updated on 1 November 2026 from live eSky results for one adult: 16–23 January 278 + 63 = 341 PLN; 23–30 January 298 + 54 = 352 PLN; 6–13 February 1078 + 127 = 1205 PLN; 6–13 March 1108 + 138 = 1246 PLN per person return before paid luggage. These are seller quotes including the mandatory eSky service fee, not independently verified Wizz checkout prices. Direct Wizz pages returned an error. Luggage remains a September estimate; group-seat availability and final cart are unconfirmed. All flight displays and budgets derive from `flightQuotes`, `airfare` and `flightCost` in `src/data.ts`.

Nube four-adult January rates now match the same-day checked hub quote (1302 EUR/unit/week); Casa Rossa four-adult January quotes are removed as unavailable. Other lodging observations remain explicitly historical. High-season Vialattea passes corrected to 287 EUR from the official 2026/27 tariff, matching the hub.
