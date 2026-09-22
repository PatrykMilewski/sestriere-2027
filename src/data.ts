export type Party = 2 | 4;
export type Week = 'early' | 'late' | 'feb' | 'march';
export const fx = 4.3;
export const sources = {
  guide: 'https://turyn.pl/turyn-jako-baza-w-alpy/',
  airport: 'https://www.trenitalia.com/en/connections/torino-caselle-airport.html',
  railBags: 'https://www.trenitalia.com/it/regionale/viaggiare-con-il-regionale.html',
  busBags: 'https://torino.arriva.it/titoli-di-viaggio-arriva-italia/',
  bus: 'https://arriva.it/app/uploads/sites/4/2020/07/000285.pdf',
  link: 'https://www.trenitalia.com/it/regionale/collegamenti-regionale/vialattea-link.html',
  skipass: 'https://www.vialattea.it/wp-content/uploads/2026/07/Prezziario-ITA_3.pdf',
  resort: 'https://www.vialattea.it/',
  sports: 'https://ssr-weu2.wizzair.com/en-gb/help-centre/booking-information-and-services/baggage/special-baggage',
  metro: 'https://www.gtt.to.it/cms/linee-e-orari/torino-e-cintura/urbana/251-regolamento-metro',
  fares: 'https://mtm.torino.it/it/tariffe/biglietti-e-abbonamenti-per-i-servizi-extraurbani-ferroviari-e-navigazione-dal-1-luglio-2026/',
  skiMap: 'https://www.vialattea.it/wp-content/uploads/2025/10/Skimap-2025-2026-DEF_compressed.pdf',
  walk: 'https://www.google.com/maps/dir/?api=1&origin=Torino+Porta+Susa&destination=Torino+Porta+Nuova&travelmode=walking',
};
export const weeks = {
  feb: {label: '6–13 lutego', start: '2027-02-06', end: '2027-02-13', ski: '7–12 lutego', day: 6, pass: 305, flight: 2944.96},
  march: {label: '6–13 marca', start: '2027-03-06', end: '2027-03-13', ski: '7–12 marca', day: 6, pass: 305, flight: 2022.96},
  early: { label: '16–23 stycznia', start: '2027-01-16', end: '2027-01-23', ski: '17–22 stycznia', day: 16, pass: 261, flight: 2444.31 },
  late: { label: '23–30 stycznia', start: '2027-01-23', end: '2027-01-30', ski: '24–29 stycznia', day: 23, pass: 305 as number | null, flight: 2316.96 as number | null },
};
export interface Stay {
  id: string;
  name: string;
  slug: string;
  area: string;
  distance: string;
  description: string;
  layout: string;
  rating: string;
  prices: Record<Week, Record<Party, number | null>>;
  flexible: Record<Week, Record<Party, number | null>>;
  coords: [number, number] | null;
  locationNote: string;
}
export const stays: Stay[] = [
  {
    id: 'casa', name: 'Casa Rossa', slug: 'italian-style-in-sestriere-casa-rossa', area: 'Sestriere · centrum',
    distance: 'Baby 2: 450 m · Cit Roc: 600 m wg oferty',
    description: 'Kuchnia, pralka i własny salon. Propozycja bazy do wspólnego gotowania i wieczorów w miejscowości.',
    layout: '30 m² · sypialnia z łóżkiem podwójnym + rozkładana sofa w salonie', rating: '8,8 / 10 · 8 opinii',
    prices: {feb: {2: null, 4: null}, march: {2: null, 4: null}, early: {2: 885, 4: 906}, late: {2: 969, 4: 990}},
    flexible: {feb: {2: null, 4: null}, march: {2: null, 4: null}, early: {2: 994, 4: 1015}, late: {2: 1089, 4: 1110}},
    coords: [44.961097, 6.882945], locationNote: 'Via Terzo Reggimento Alpini 5. Punkt według mapy Booking, nie pomiar wejścia. 200 m dotyczy stoku; limit 500 m do użytecznego wyciągu wymaga potwierdzenia drogi pieszej. Check-in 16:00–21:00, check-out 09:00–11:00 — wcześniejsze wyjście ustalić z gospodarzem.',
  },
  {
    id: 'nube', name: 'Residence Nube d’Argento', slug: 'residence-nube-d-argento', area: 'Borgata · poniżej Sestriere',
    distance: 'ok. 30 m do wyciągu wg oferty',
    description: 'Najbliżej wyciągu. Oddzielna miejscowość Borgata: wieczorne wyjścia w centrum Sestriere wymagają dojazdu.',
    layout: '2 os.: pokój 21 m² · 4 os.: apartament 27 m², łóżko podwójne + piętrowe', rating: '7,8 / 10 · 172 opinie',
    prices: {feb: {2: null, 4: 1687}, march: {2: null, 4: 1428}, early: {2: 717, 4: 1213}, late: {2: 717, 4: 1213}},
    flexible: {feb: {2: null, 4: 1869}, march: {2: null, 4: 1582}, early: {2: 854, 4: 1435}, late: {2: 854, 4: 1435}},
    coords: [44.9701669, 6.893082], locationNote: 'Via del Colle 11, Borgata Sestriere. Punkt według mapy Booking. Oferta ski-to-door; wyciąg Nube d’Argento 30 m, Nuova Nube 200 m. Cena dla 2 i 4 osób dotyczy różnych typów lokalu. Autobus 285 kończy na Sestriere Parcheggio: dodatkowy transfer do Borgata i jego cena nie zostały potwierdzone, nie są w sumie kosztorysu.',
  },
];
export function booking(stay: Stay, week: Week, party: Party): string {
  const dates = weeks[week];
  return `https://www.booking.com/hotel/it/${stay.slug}.en-gb.html?checkin=${dates.start}&checkout=${dates.end}&group_adults=${party}&group_children=0&no_rooms=1&selected_currency=EUR`;
}
export function flightLink(week: Week, party: Party): string {
  const dates = weeks[week];
  return `https://www.skyscanner.pl/transport/loty/gdn/trn/${dates.start.slice(2).replaceAll('-', '')}/${dates.end.slice(2).replaceAll('-', '')}/?adultsv2=${party}&cabinclass=economy&rtn=1&preferdirects=true`;
}
export function wizzLink(week: Week, party: Party): string {
  return `https://www.wizzair.com/pl-PL/booking/select-flight/GDN/TRN/${weeks[week].start}/${weeks[week].end}/${party}/null/null`;
}
