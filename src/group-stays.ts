import { type Week, weeks } from './data';

export type LodgingParty = 4 | 5 | 6;
export interface GroupStay {
  name: string;
  slug: string;
  area: string;
  distance: string;
  layout: string;
  note: string;
  prices: Record<Week, Partial<Record<LodgingParty, number>>>;
  capacity: number;
}

export const groupStays: GroupStay[] = [
  {
    name: 'Studio Valleverde 11D — Happy Rentals', slug: 'studio-valleverde-11d-ski-in-ski-out-happy-rentals',
    area: 'Borgata · tańsza opcja dla 4 osób', distance: 'Combetta 30 m · Nuova Nube 40 m wg Booking',
    layout: '35 m² · 2 pojedyncze łóżka + sofa · kuchnia i balkon',
    note: 'Bezzwrotnie, bez wyżywienia, z podatkami i opłatami widocznymi w ofercie. Ocena 6,0/10 z tylko 2 opinii — tańszy wariant z kompromisem jakościowym. Adres Via del Colle 52. Dodatkowy dojazd Sestriere–Borgata nie jest wyceniony.',
    prices: {feb: {}, march: {}, early: {4: 896}, late: {4: 896}}, capacity: 4,
  },
  {
    name: 'Hostdomus — Ski Lift', slug: 'hostdomus-ski-lift-fronte-piste',
    area: 'Borgata · przy wyciągach', distance: 'Nube d’Argento 50 m · Nuova Nube 100 m',
    layout: '42 m² · 1 sypialnia z 4 pojedynczymi łóżkami + sofa w salonie · 1 łazienka',
    note: 'Cena bezzwrotna, bez wyżywienia, z podatkami i opłatami widocznymi w ofercie. Zwrotna kaucja 300 € za lokal płatna osobno. Brak oceny gości. Dojazd z końcowego przystanku 285 w Sestriere do Borgata wymaga dodatkowego transferu; koszt niepotwierdzony.',
    prices: {feb: {}, march: {}, early: {4: 1651, 5: 1788, 6: 1925}, late: {4: 2008, 5: 2174, 6: 2341}}, capacity: 6,
  },
  {
    name: 'Residence Nube d’Argento — większy apartament', slug: 'residence-nube-d-argento',
    area: 'Borgata · bezpośrednio przy stoku', distance: 'Nube d’Argento ok. 30 m',
    layout: '5–6 osób: 36 m², łóżko podwójne + 2 łóżka piętrowe. Dla 4 osób: 27 m², łóżko podwójne + 1 piętrowe.',
    note: 'Cena bezzwrotna, bez wyżywienia, z podatkami i opłatami pokazanymi przez Booking. Wariant dla 5 osób ma własną wycenę; nie dzielimy ceny dla 6 gości. Dodatkowy dojazd Sestriere–Borgata nie jest wyceniony.',
    prices: {feb: {4: 1687}, march: {4: 1428}, early: {4: 1213, 5: 1624, 6: 1645}, late: {4: 1213, 5: 1624, 6: 1645}}, capacity: 6,
  },
  {
    name: 'Appartamento Prestige', slug: 'appartamento-prestige-sestriere',
    area: 'Sestriere · przestronnie, znacznie drożej', distance: 'Cit Roc 100 m · Baby 1 i Baby 2 po 200 m wg Booking',
    layout: '85 m² · 2 sypialnie, salon i 2 łazienki · maks. 5 dorosłych',
    note: 'Opcja premium wyraźnie ponad założonym budżetem. Oferta zawiera parking i internet; bez wyżywienia, z podatkami i opłatami. Taryfa z bezpłatnym anulowaniem — termin i godzinę sprawdź w ofercie. Booking opisuje łóżka: 2 podwójne w pierwszej sypialni, piętrowe w drugiej i sofa w salonie, lecz wycena dopuszcza maksymalnie 5 osób.',
    prices: {feb: {}, march: {}, early: {4: 3954, 5: 4182}, late: {5: 4182}}, capacity: 5,
  },
  {
    name: 'Terrazza su Sestriere Lux', slug: 'casa-vacanze-sestriere',
    area: 'Sestriere · duży apartament premium', distance: 'Cit Roc 150 m · Garnel 350 m wg Booking',
    layout: '140 m² · 4 sypialnie i 3 łazienki · oferta dla 6 dorosłych',
    note: 'Znacznie drożej od założonego budżetu. Dwa duże łóżka podwójne i 3 pojedyncze według opisu; wycena dla 6 osób. Cena z podatkami i opłatami, bez wyżywienia. Dostępna taryfa z bezpłatnym anulowaniem — termin i godzinę sprawdź w ofercie.',
    prices: {feb: {}, march: {}, early: {6: 5929}, late: {6: 5420}}, capacity: 6,
  },
];

export function groupBooking(stay: GroupStay, week: Week, count: LodgingParty): string {
  return `https://www.booking.com/hotel/it/${stay.slug}.en-gb.html?checkin=${weeks[week].start}&checkout=${weeks[week].end}&group_adults=${count}&group_children=0&no_rooms=1&selected_currency=EUR`;
}
