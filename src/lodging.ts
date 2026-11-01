import { lodgingRecords } from "./lodging-records";

export type LodgingStatus = "available" | "unavailable" | "unverified" | "capacity";
export interface LodgingQuote {
  propertyId: string;
  week: string;
  party: number;
  totalEUR: number | null;
  flexibleEUR: number | null;
  status: LodgingStatus;
  source: string;
  checkedAt: string | null;
  notes: string;
  rateAccess: string;
}
export const lodgingCheckedDate = "01.11.2026";
export function lodgingQuote(propertyId: string, week: string, party: number): LodgingQuote | undefined {
  return lodgingRecords.find(
    (quote) => quote.propertyId === propertyId && quote.week === week && quote.party === party,
  );
}
export function lodgingPrice(quote: LodgingQuote | undefined): number | null {
  return quote?.status === "available" && typeof quote.totalEUR === "number" && quote.totalEUR > 0
    ? quote.totalEUR
    : null;
}
export function flexiblePrice(quote: LodgingQuote | undefined): number | null {
  return lodgingPrice(quote) !== null && typeof quote?.flexibleEUR === "number" && quote.flexibleEUR > 0
    ? quote.flexibleEUR
    : null;
}
export function lodgingStatus(quote: LodgingQuote | undefined): string {
  if (quote?.status === "available") return "Dostępne w odczycie";
  if (quote?.status === "unavailable") return "Brak miejsc w sprawdzonym kanale";
  if (quote?.status === "capacity") return "Przekroczony limit katalogowy";
  return "Brak aktualnej wyceny";
}
export function lodgingDetails(quote: LodgingQuote | undefined): string {
  if (!quote) return "Nie potwierdzono ceny dla tego terminu i liczby osób. Starszej wyceny nie używamy.";
  const date = quote.checkedAt
    ? `Odczyt ${new Date(quote.checkedAt).toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" })}. `
    : "";
  const access =
    quote.rateAccess === "public" ? "" : "Odczyt w sesji z programem Genius; cena może zależeć od uprawnień. ";
  return `${date}${access}${quote.notes.replaceAll("flexibleEUR", "elastyczna")}`;
}
export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character,
  );
}
