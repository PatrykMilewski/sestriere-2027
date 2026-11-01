import { type Week, weeks } from "./data";

export type LodgingParty = 4 | 5 | 6;
export interface GroupStay {
  id: string;
  name: string;
  slug: string;
  area: string;
  distance: string;
  layout: string;
  note: string;
  capacity: number;
}

export const groupStays: GroupStay[] = [
  {
    id: "valleverde",
    name: "Studio Valleverde 11D — Happy Rentals",
    slug: "studio-valleverde-11d-ski-in-ski-out-happy-rentals",
    area: "Borgata · tańsza opcja dla 4 osób",
    distance: "Combetta 30 m · Nuova Nube 40 m wg Booking",
    layout: "35 m² · 2 pojedyncze łóżka + sofa · kuchnia i balkon",
    note: "Ocena 6,0/10 z tylko 2 opinii — tańszy wariant z kompromisem jakościowym. Adres Via del Colle 52. Dodatkowy dojazd Sestriere–Borgata nie jest wyceniony.",
    capacity: 4,
  },
  {
    id: "hostdomus",
    name: "Hostdomus — Ski Lift",
    slug: "hostdomus-ski-lift-fronte-piste",
    area: "Borgata · przy wyciągach",
    distance: "Nube d’Argento 50 m · Nuova Nube 100 m",
    layout: "42 m² · 1 sypialnia z 4 pojedynczymi łóżkami + sofa w salonie · 1 łazienka",
    note: "Zwrotna kaucja 300 € za lokal płatna osobno. Brak oceny gości. Dojazd z końcowego przystanku 285 w Sestriere do Borgata wymaga dodatkowego transferu; koszt niepotwierdzony.",
    capacity: 6,
  },
  {
    id: "nube",
    name: "Residence Nube d’Argento — większy apartament",
    slug: "residence-nube-d-argento",
    area: "Borgata · bezpośrednio przy stoku",
    distance: "Nube d’Argento ok. 30 m",
    layout: "5–6 osób: 36 m², łóżko podwójne + 2 łóżka piętrowe. Dla 4 osób: 27 m², łóżko podwójne + 1 piętrowe.",
    note: "Wariant dla 5 osób ma własną wycenę; nie dzielimy ceny dla 6 gości. Dodatkowy dojazd Sestriere–Borgata nie jest wyceniony.",
    capacity: 6,
  },
  {
    id: "prestige",
    name: "Appartamento Prestige",
    slug: "appartamento-prestige-sestriere",
    area: "Sestriere · przestronnie, znacznie drożej",
    distance: "Cit Roc 100 m · Baby 1 i Baby 2 po 200 m wg Booking",
    layout: "85 m² · 2 sypialnie, salon i 2 łazienki · limit katalogowy 5 dorosłych",
    note: "Brak dostępnej taryfy w sprawdzonych terminach. Booking opisuje łóżka: 2 podwójne w pierwszej sypialni, piętrowe w drugiej i sofa w salonie, Dotychczasowy limit katalogowy to 5 osób; nie potwierdzono nowej maksymalnej obsady.",
    capacity: 5,
  },
  {
    id: "terrazza",
    name: "Terrazza su Sestriere Lux",
    slug: "casa-vacanze-sestriere",
    area: "Sestriere · duży apartament premium",
    distance: "Cit Roc 150 m · Garnel 350 m wg Booking",
    layout: "140 m² · 4 sypialnie i 3 łazienki · wariant katalogowy do 6 dorosłych",
    note: "Dwa duże łóżka podwójne i 3 pojedyncze według opisu. Brak dostępnej taryfy w sprawdzonych terminach.",
    capacity: 6,
  },
];

export function groupBooking(stay: GroupStay, week: Week, count: LodgingParty): string {
  return `https://www.booking.com/hotel/it/${stay.slug}.en-gb.html?checkin=${weeks[week].start}&checkout=${weeks[week].end}&group_adults=${count}&group_children=0&no_rooms=1&selected_currency=EUR`;
}
