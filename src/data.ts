export type Party = 2 | 4;
export type Week = "early" | "late" | "feb" | "march";
export const fx = 4.3;
export const sources = {
  guide: "https://turyn.pl/turyn-jako-baza-w-alpy/",
  airport: "https://www.trenitalia.com/en/connections/torino-caselle-airport.html",
  railBags: "https://www.trenitalia.com/it/regionale/viaggiare-con-il-regionale.html",
  busBags: "https://torino.arriva.it/titoli-di-viaggio-arriva-italia/",
  bus: "https://arriva.it/app/uploads/sites/4/2020/07/000285.pdf",
  link: "https://www.trenitalia.com/it/regionale/collegamenti-regionale/vialattea-link.html",
  skipass: "https://www.vialattea.it/wp-content/uploads/2026/07/Prezziario-ITA_3.pdf",
  resort: "https://www.vialattea.it/",
  sports: "https://ssr-weu2.wizzair.com/en-gb/help-centre/booking-information-and-services/baggage/special-baggage",
  metro: "https://www.gtt.to.it/cms/linee-e-orari/torino-e-cintura/urbana/251-regolamento-metro",
  fares:
    "https://mtm.torino.it/it/tariffe/biglietti-e-abbonamenti-per-i-servizi-extraurbani-ferroviari-e-navigazione-dal-1-luglio-2026/",
  skiMap: "https://www.vialattea.it/wp-content/uploads/2025/10/Skimap-2025-2026-DEF_compressed.pdf",
  walk: "https://www.google.com/maps/dir/?api=1&origin=Torino+Porta+Susa&destination=Torino+Porta+Nuova&travelmode=walking",
};
export const weeks = {
  feb: { label: "6–13 lutego", start: "2027-02-06", end: "2027-02-13", ski: "7–12 lutego", day: 6, pass: 287 },
  march: { label: "6–13 marca", start: "2027-03-06", end: "2027-03-13", ski: "7–12 marca", day: 6, pass: 287 },
  early: { label: "16–23 stycznia", start: "2027-01-16", end: "2027-01-23", ski: "17–22 stycznia", day: 16, pass: 261 },
  late: { label: "23–30 stycznia", start: "2027-01-23", end: "2027-01-30", ski: "24–29 stycznia", day: 23, pass: 287 },
};
export interface FlightQuote {
  baseFare: number;
  serviceFee: number;
  suitcaseShare: number;
  source: string;
}
export const flightFareDate = "01.11.2026";
export const flightFareNote =
  "Odczyt eSky 01.11.2026, 15:34–15:37: loty Wizz Air bezpośrednio, cena na osobę w obie strony przy wyszukiwaniu dla 1 dorosłego. Opłata serwisowa eSky jest pokazana oddzielnie i wliczona do sumy. To oferta pośrednika, nie cena potwierdzona w koszyku Wizz; strona przewoźnika zwracała błąd. Ceny dla 2 lub 4 pasażerów i koszyk z bagażem wymagają potwierdzenia.";
export const flightQuotes: Record<Week, FlightQuote> = {
  early: {
    baseFare: 278,
    serviceFee: 63,
    suitcaseShare: 152.715,
    source:
      "https://www.esky.pl/flights/search/ap/GDN/ap/TRN?pa=1&py=0&pc=0&pi=0&sc=economy&departureDate=2027-01-16&returnDate=2027-01-23&sort=price&requestSource=LandingPageDeals",
  },
  late: {
    baseFare: 298,
    serviceFee: 54,
    suitcaseShare: 139.04,
    source:
      "https://www.esky.pl/flights/search/ap/GDN/ap/TRN?pa=1&py=0&pc=0&pi=0&sc=economy&departureDate=2027-01-23&returnDate=2027-01-30&sort=price&requestSource=LandingPageDeals",
  },
  feb: {
    baseFare: 1078,
    serviceFee: 127,
    suitcaseShare: 139.04,
    source:
      "https://www.esky.pl/flights/search/ap/GDN/ap/TRN?pa=1&py=0&pc=0&pi=0&sc=economy&departureDate=2027-02-06&returnDate=2027-02-13&sort=price&requestSource=LandingPageDeals",
  },
  march: {
    baseFare: 1108,
    serviceFee: 138,
    suitcaseShare: 139.04,
    source:
      "https://www.esky.pl/flights/search/ap/GDN/ap/TRN?pa=1&py=0&pc=0&pi=0&sc=economy&departureDate=2027-03-06&returnDate=2027-03-13&sort=price&requestSource=LandingPageDeals",
  },
};
export const snowboardReserve = 501.44;
export function airfare(week: Week): number {
  const quote = flightQuotes[week];
  return quote.baseFare + quote.serviceFee;
}
export function flightCost(week: Week): number {
  return airfare(week) + flightQuotes[week].suitcaseShare + snowboardReserve;
}

export interface Stay {
  id: string;
  name: string;
  slug: string;
  area: string;
  distance: string;
  description: string;
  layout: string;
  rating: string;
  coords: [number, number] | null;
  locationNote: string;
}
export const stays: Stay[] = [
  {
    id: "casa",
    name: "Casa Rossa",
    slug: "italian-style-in-sestriere-casa-rossa",
    area: "Sestriere · centrum",
    distance: "Baby 2: 450 m · Cit Roc: 600 m wg oferty",
    description: "Kuchnia, pralka i własny salon. Propozycja bazy do wspólnego gotowania i wieczorów w miejscowości.",
    layout: "30 m² · sypialnia z łóżkiem podwójnym + rozkładana sofa w salonie",
    rating: "8,8 / 10 · 8 opinii",
    coords: [44.961097, 6.882945],
    locationNote:
      "Via Terzo Reggimento Alpini 5. Aktualna dostępność i warunki zależą od terminu oraz obsady; odczyty są pokazane przy cenach. Punkt według mapy Booking, nie pomiar wejścia. 200 m dotyczy stoku; limit 500 m do użytecznego wyciągu wymaga potwierdzenia drogi pieszej. Check-in 16:00–21:00, check-out 09:00–11:00 — wcześniejsze wyjście ustalić z gospodarzem.",
  },
  {
    id: "nube",
    name: "Residence Nube d’Argento",
    slug: "residence-nube-d-argento",
    area: "Borgata · poniżej Sestriere",
    distance: "ok. 30 m do wyciągu wg oferty",
    description:
      "Najbliżej wyciągu. Oddzielna miejscowość Borgata: wieczorne wyjścia w centrum Sestriere wymagają dojazdu.",
    layout: "2 i 4 os.: publiczna oferta całego apartamentu 27 m², łóżko podwójne + piętrowe",
    rating: "7,9 / 10 · 172 opinie",
    coords: [44.9701669, 6.893082],
    locationNote:
      "Via del Colle 11, Borgata Sestriere. Ceny dla 2 i 4 dorosłych we wszystkich czterech terminach sprawdzono 01.11.2026. Punkt według mapy Booking. Oferta ski-to-door; wyciąg Nube d’Argento 30 m, Nuova Nube 200 m. Publiczne ceny dla 2 i 4 osób dotyczą apartamentu 27 m²; tańsze taryfy partnerskie i wymagające logowania pominięto. Autobus 285 kończy na Sestriere Parcheggio: dodatkowy transfer do Borgata i jego cena nie zostały potwierdzone, nie są w sumie kosztorysu.",
  },
];
export function booking(stay: Stay, week: Week, party: Party): string {
  const dates = weeks[week];
  return `https://www.booking.com/hotel/it/${stay.slug}.en-gb.html?checkin=${dates.start}&checkout=${dates.end}&group_adults=${party}&group_children=0&no_rooms=1&selected_currency=EUR`;
}
export function flightLink(week: Week, party: Party): string {
  const dates = weeks[week];
  return `https://www.skyscanner.pl/transport/loty/gdn/trn/${dates.start.slice(2).replaceAll("-", "")}/${dates.end.slice(2).replaceAll("-", "")}/?adultsv2=${party}&cabinclass=economy&rtn=1&preferdirects=true`;
}
export function wizzLink(week: Week, party: Party): string {
  return `https://www.wizzair.com/pl-PL/booking/select-flight/GDN/TRN/${weeks[week].start}/${weeks[week].end}/${party}/null/null`;
}
