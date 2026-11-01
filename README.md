# Sestriere 2027

Polish group trip planner for January–March 2027. Prices are dated observations or explicitly marked estimates, not reservations. The page compares four dates and parties of two or four adults, with lodging links, baggage details and interactive maps.

Run `npm ci`, then `npm run dev`. `npm run build` checks TypeScript and creates the static site. GitHub Actions publishes `dist` to GitHub Pages.

Source data and external references live in `src/data.ts`; interactive content is in `src/main.ts`. Map data is attributed to OpenStreetMap and OpenSnowMap. The linked resort photo belongs to Sestriere.it.

Flight quotes updated on 1 November 2026 from live eSky results for one adult: 16–23 January 278 + 63 = 341 PLN; 23–30 January 298 + 54 = 352 PLN; 6–13 February 1078 + 127 = 1205 PLN; 6–13 March 1108 + 138 = 1246 PLN per person return before paid luggage. These are seller quotes including the mandatory eSky service fee, not independently verified Wizz checkout prices. Direct Wizz pages returned an error. Luggage remains a September estimate; group-seat availability and final cart are unconfirmed. All flight displays and budgets derive from `flightQuotes`, `airfare` and `flightCost` in `src/data.ts`.

Lodging refreshed on 1 November 2026, 15:55–15:58 Europe/Warsaw: 60 exact-date/adult-count Booking searches, 31 available public whole-unit quotes, 29 unavailable in that channel, plus 12 configured capacity exclusions without separate searches. `src/lodging-records.ts` is the canonical normalized source; `src/lodging.ts` validates usable prices. No lodging price is stored in the property catalogues. Current public quotes include displayed taxes and charges; Hostdomus has a separate refundable EUR 300 deposit. Member and partner rates are excluded, so these are not guaranteed lowest market prices.

The calculator selects the cheapest checked available stay when the date or adult count changes and permits manual selection of another available stay. The four-date comparison independently chooses the cheapest catalogue stay for each date and matching adult count. Group quotes for 4/5/6 adults never reuse another occupancy's price. Unavailability, missing quotes and catalogue capacity limits are distinct. Properties without verified map coordinates remain unmarked.

A readable dated receipt is published at `public/noclegi-2026-11-01.md`; exact-source records are at `public/noclegi-2026-11-01.json`. High-season Vialattea passes remain 287 EUR from the official 2026/27 tariff, matching the hub. Flight and skipass data were preserved in this lodging refresh.
