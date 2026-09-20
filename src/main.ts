import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';
import { booking, flightLink, fx, sources, stays, weeks, wizzLink, type Party, type Week } from './data';

let party: Party = 2;
let week: Week = 'early';
let selectedStay = 'casa';
const money = (n: number) => new Intl.NumberFormat('pl-PL', {maximumFractionDigits: 0}).format(n);
const pln = (n: number) => `${money(n)} zł`;
const eur = (n: number) => `${new Intl.NumberFormat('pl-PL', {maximumFractionDigits: 2}).format(n)} €`;
const external = (url: string, text: string, cls = '') => `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${text} <span aria-hidden="true">↗</span></a>`;
function element(id: string): HTMLElement {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element: ${id}`);
  return node;
}
function heading(label: string, title: string, description: string): string {
  return `<div class="section-heading"><div><p class="eyebrow">${label}</p><h2>${title}</h2></div><p>${description}</p></div>`;
}
function shell(): string {
  return `<a class="skip-link" href="#plan">Przejdź do planu</a>
  <header class="topbar"><a class="brand" href="#"><span class="brand-icon" aria-hidden="true">▲</span> ALPY / 27</a><nav aria-label="Sekcje planu"><a href="#plan">Koszty</a><a href="#dojazd">Dojazd</a><a href="#noclegi">Noclegi</a><a href="#trasy">Trasy</a></nav><span class="edition">GDAŃSK → SESTRIERE</span></header>
  <main><section class="hero"><div class="hero-copy"><p class="eyebrow">WŁOCHY · VIALATTEA · STYCZEŃ 2027</p><h1>TYDZIEŃ<br>NA <span>DESCE.</span></h1><p class="hero-intro">Sestriere. Sześć dni w górach, siedem nocy w Alpach. Plan dla całej ekipy.</p><a class="button primary" href="#plan">Zobacz plan i koszty <span>↓</span></a><div class="hero-facts"><div><strong>2 035<span> m</span></strong><small>miejscowość Sestriere</small></div><div><strong>400<span> km</span></strong><small>sieć Vialattea*</small></div><div><strong>6<span> dni</span></strong><small>na snowboardzie</small></div></div></div>
  <figure class="hero-photo"><img src="https://sestriere.it/wp-content/uploads/2019/10/PaginaInverno.jpg" alt="Zimowa panorama Sestriere i otaczających stoków Vialattea" fetchpriority="high"><div class="photo-stamp">SESTRIERE<br><span>45° N / 6° E</span></div><figcaption>${external('https://sestriere.it/en/winter-in-sestriere/', 'Fotografia: Sestriere.it')}</figcaption></figure></section>
  <div class="trip-strip"><span>01 / WYBIERAMY WARIANT</span><span>7 NOCY <i>·</i> 6 DNI JAZDY <i>·</i> WŁASNY SPRZĘT</span><span>PROPOZYCJA, BEZ REZERWACJI</span></div>
  <section class="section" id="plan">${heading('WSPÓLNY KOSZTORYS', 'Ile kosztuje ten tydzień?', 'Wybierz grupę i termin. Każda kwota ma opis zakresu; rezerwy są oznaczone osobno.')}
  <div class="controls"><div><span class="control-label">Jedzie nas</span><div class="segmented" role="group" aria-label="Liczba osób"><button data-party="2" aria-pressed="true">2 osoby</button><button data-party="4" aria-pressed="false">4 osoby</button></div></div><div><span class="control-label">Termin · 2027</span><div class="segmented" role="group" aria-label="Termin wyjazdu"><button data-week="early" aria-pressed="true">16–23 sty</button><button data-week="late" aria-pressed="false">23–30 sty</button></div></div><div class="exchange"><b>1 € = 4,30 zł</b><span>Kurs do planowania, nie kurs banku</span></div></div><div id="budget" aria-live="polite"></div><div id="comparison"></div></section>
  <section class="section flight-section" id="loty">${heading('GDN ↔ TRN', 'Loty. Walizka. Snowboardy.', 'Na parę: jedna wspólna walizka 20 kg oraz po jednym pokrowcu snowboardowym na osobę.')}<div id="flights"></div></section>
  ${transportSection()}
  <section class="section" id="noclegi">${heading('02 / BAZA W GÓRACH', 'Klucze do dobrego tygodnia.', 'Cały pobyt, nie cena za noc. W apartamencie czteroosobowym Sprawdź układ łóżek: sofa w Casa Rossa, łóżko piętrowe w Nube.')}<div id="stays"></div><p class="footnote">Oferty sprawdzone 19–20.09.2026; dostępność może się zmienić. Odległości według opisów ofert, nie pomiaru zimowej drogi pieszej. Nic nie zostało zarezerwowane.</p></section>
  ${skiSection()}${itinerarySection()}${sourceSection()}</main>
  <footer><a class="brand" href="#">▲ ALPY / 27</a><p>Plan dla ekipy · Sestriere, styczeń 2027<br>Ceny i źródła sprawdzone 19–20 września 2026.</p><a href="#plan">Wróć do kosztów ↑</a></footer>`;
}
function totals(target: Week = week) {
  const stay = stays.find(s => s.id === selectedStay) ?? stays[0];
  const room = stay.prices[target][party];
  const flight = weeks[target].flight;
  const pass = weeks[target].pass;
  const transport = party * 190;
  const food = party * 850;
  const core = room !== null && flight !== null && pass !== null ? room * fx + flight * party / 2 + pass * fx * party + transport : null;
  return {stay, room, flight, pass, transport, food, core};
}
function budgetMarkup(): string {
  const t = totals();
  const rows = [
    ['Loty + wszystkie bagaże', t.flight === null ? 'Do potwierdzenia' : pln(t.flight * party / 2), `${party} osoby A/R · ${party / 2} × walizka 20 kg + ${party} × snowboard A/R${party === 4 ? ' · ekstrapolacja ceny dla pary' : ''}`],
    [t.stay.name, t.room === null ? 'Cena niepotwierdzona' : `${pln(t.room * fx)} <small>${eur(t.room)}</small>`, `7 nocy · cały lokal dla ${party} osób · bez wyżywienia · bezzwrotnie`],
    ['Skipass Vialattea', t.pass === null ? 'Do potwierdzenia' : `${pln(t.pass * fx * party)} <small>${eur(t.pass * party)}</small>`, `${party} × 6 dni · ${weeks[week].ski} · zakup online`],
    ['Transport na miejscu', `${pln(t.transport)} <span class="estimate">rezerwa</span>`, `${party} osoby lotnisko–Sestriere–lotnisko · przejazdy i bagaże · szacunek`],
  ];
  return `<div class="budget-layout"><div class="budget-table">${rows.map(([title, price, desc]) => `<div class="cost-row"><div><h3>${title}</h3><p>${desc}</p></div><strong>${price}</strong></div>`).join('')}<div class="budget-extra"><span>Jedzenie: dodatkowo ok. <b>${pln(t.food)}</b> / grupa</span><span>Ubezpieczenie sportowe, nośnik skipassu i dojazd do GDN: osobno</span></div></div><aside class="total-ticket"><div class="ticket-top"><span>WYBRANY WARIANT</span><b>${party} OS.</b></div><p>${weeks[week].label} 2027</p><span class="total-label">Loty + nocleg + skipass + transport</span><strong class="total-number">${t.core === null ? '—' : money(t.core)}<span>${t.core === null ? '' : ' zł'}</span></strong><div class="ticket-per">${t.core === null ? 'Brakuje danych do zsumowania wariantu.' : `<b>${pln(t.core / party)}</b> na osobę`}</div><p class="ticket-note">${t.core === null ? 'Otwórz linki do ofert poniżej. Brak ceny nie oznacza braku miejsc.' : `Z jedzeniem: ok. ${pln(t.core + t.food)} za grupę. Suma zawiera szacunkową rezerwę transportową.${selectedStay === 'nube' ? ' Dojazd Sestriere–Borgata dodatkowo: koszt niepotwierdzony.' : ''}`}</p><div class="ticket-bottom">7 NOCY <span>✳</span> 6 DNI JAZDY</div></aside></div>`;
}
function comparisonMarkup(): string {
  const first = totals('early').core;
  const second = totals('late').core;
  const difference = first !== null && second !== null ? second - first : null;
  const verdict = difference === null ? '16–23 stycznia: wariant bazowy.' : difference >= 0 ? `16–23 stycznia taniej o ${pln(difference)}.` : `23–30 stycznia taniej o ${pln(-difference)}.`;
  return `<div class="comparison"><div><p class="eyebrow">CZY TYDZIEŃ PÓŹNIEJ SIĘ OPŁACA?</p><h3>${verdict}</h3><p>${difference === null ? 'Porównanie niepełne — brakujących cen nie zastępujemy zerami.' : 'Porównanie z lotami Wizz Air, dla wybranego noclegu i grupy. Późniejszy tydzień ma tańsze loty, ale wyższy sezon skipassów. Transport i budżet jedzenia przyjęte tak samo.'}</p></div><div class="compare-weeks">${(['early', 'late'] as Week[]).map(w => {const t = totals(w); return `<div class="compare-week ${w === week ? 'selected' : ''}"><span>${weeks[w].label}</span><strong>${t.core === null ? 'Niepełna wycena' : pln(t.core)}</strong><small>${party} osoby · ten sam zakres · ${t.stay.name}</small></div>`;}).join('')}</div></div>`;
}
function flightsMarkup(): string {
  const costs = week === 'early' ? [1136, 305.43, 1002.88, 2444.31] : [1036, 278.08, 1002.88, 2316.96];
  const exact = (n: number) => n.toLocaleString('pl-PL', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' zł';
  return `<div class="flight-card"><div class="flight-route"><div><span>WYLOT · ${weeks[week].start.slice(8)}.01</span><strong>GDN <i>→</i> TRN</strong><p>11:55 → 14:10</p></div><div class="flight-airline">WIZZ AIR<span>bezpośrednio · taryfa regularna</span></div><div><span>POWRÓT · ${weeks[week].end.slice(8)}.01</span><strong>TRN <i>→</i> GDN</strong><p>15:00 → 17:10</p></div></div><div class="flight-breakdown"><span>Bilety dla pary A/R <b>${exact(costs[0])}</b></span><span>1 walizka 20 kg A/R <b>${exact(costs[1])}</b></span><span>2 snowboardy A/R <b>${exact(costs[2])}</b></span><span>Razem za parę <b>${exact(costs[3])}</b></span></div><div class="flight-links">${external(flightLink(week, party), `Skyscanner · ${party} osoby`, 'button primary')}${external(wizzLink(week, party), 'Sprawdź koszyk Wizz Air', 'button outline')}<p>Mały plecak 40 × 30 × 20 cm na osobę w cenie. Bez wyboru miejsc i Priority. Stawki bagażowe z formularza Wizz; drugi snowboard obliczony z tej samej stawki 250,72 zł / lot. Dla 4 osób przyjęto 2 × cenę pary, nie osobną ofertę dla 4 pasażerów.</p></div></div>`;
}
function staysMarkup(): string {
  return stays.map((stay, index) => `<article class="stay-card ${stay.id === selectedStay ? 'chosen' : ''}"><div class="stay-index">0${index + 1}<span>${stay.id === selectedStay ? 'W KOSZTORYSIE' : 'ALTERNATYWA'}</span></div><div class="stay-info"><p class="eyebrow">${stay.area}</p><h3>${stay.name}</h3><div class="stay-badges"><span>${stay.distance}</span><span>${stay.rating}</span></div><p>${stay.description}</p><p class="layout-note">${stay.layout}</p><details><summary>Lokalizacja i warunki</summary><p>${stay.locationNote}</p><p>Kwoty podstawowe: bezzwrotne, bez wyżywienia, z podatkami i opłatami pokazanymi przez Booking. Elastyczna Casa Rossa / Nube: anulowanie przed ${week === 'early' ? '2' : '9'} stycznia 2027; potwierdź dokładną godzinę w ofercie.</p></details></div><div class="stay-prices">${([2, 4] as Party[]).map(n => {const price = stay.prices[week][n]; const flexible = stay.flexible[week][n]; return `<div class="stay-price ${n === party ? 'active' : ''}"><span>${n} osoby / 7 nocy</span><strong>${price === null ? 'Sprawdź ofertę' : eur(price)}</strong><small>${price === null ? 'Cena niepotwierdzona' : `${pln(price * fx)} razem · ${pln(price * fx / n)} / os.`}</small>${flexible === null ? '' : `<small>Elastyczna: ${eur(flexible)} / lokal</small>`}${external(booking(stay, week, n), `Oferta dla ${n} osób`)}</div>`;}).join('')}<button class="select-stay" data-stay="${stay.id}" ${stay.id === selectedStay ? 'disabled' : ''}>${stay.id === selectedStay ? 'Wybrany do kosztorysu ✓' : 'Uwzględnij w kosztorysie'}</button></div></article>`).join('');
}
function transportSection(): string {
  return `<section class="section transport-section" id="dojazd">${heading('OD TERMINALU POD STOK', 'Ostatni odcinek. W góry.', 'Pociąg z lotniska, przesiadki i autobus z Oulx. Mapa pokazuje kolejność etapów, nie dokładny przebieg torów.')}<div class="transport-layout"><div class="map-wrap"><div id="transport-map" class="map" aria-label="Mapa dojazdu z lotniska w Turynie do Sestriere"></div><div class="map-key"><span><i class="line rail"></i>Pociąg</span><span><i class="line metro"></i>Pieszo między dworcami</span><span><i class="line bus"></i>Autobus 285</span></div></div><div class="journey"><div class="direction-tabs" role="group" aria-label="Kierunek podróży"><button data-direction="out" aria-pressed="true">W góry</button><button data-direction="back" aria-pressed="false">Na lotnisko</button></div><div id="journey-steps"></div></div></div><div class="transport-note"><b>Godziny lotów ≠ rozkład przesiadek.</b><p>Rozkład na styczeń 2027 nie został potwierdzony. Częstotliwości opisują obecny typowy układ, nie gwarantują konkretnego kursu w sobotę. Powrót: terminal TRN o 12:00–12:30, najpóźniej 13:00.</p></div><div id="transport-costs"></div></section>`;
}
function journeyMarkup(back: boolean): string {
  const rows = back ? [
    ['RANO', 'Sestriere → Oulx', 'Autobus 285 · ok. 45 min. Orientacyjnie wyjazd 08:00–09:00; konkretna godzina do potwierdzenia.'],
    ['PRZESIADKA', 'Oulx → Torino Porta Nuova', 'Pociąg regionalny · ok. 75–90 min. Zaplanuj zapas na opóźnienia.'],
    ['ZMIANA DWORCA', 'Porta Nuova → Porta Susa', 'Pieszo: orientacyjnie 1,5–2 km, z bagażami zarezerwuj 30–40 min. Metro ma limit długości bagażu 80 cm, więc nie zakładamy przewozu pokrowców.'],
    ['CEL 12:00–12:30', 'Porta Susa → lotnisko TRN', 'Pociąg · ok. 30 min, zwykle co 30 min w dni robocze. Najpóźniej 13:00 w terminalu przed lotem o 15:00.'],
  ] : [
    ['14:10 → OK. 15:00', 'Lądowanie i odbiór sprzętu', 'Około 50 min na walizkę i snowboardy. Kieruj się znakami do stacji kolejowej.'],
    ['ZWYKLE CO 30 MIN*', 'Lotnisko → Torino Porta Susa', 'Pociąg SFM · ok. 30 min. Bilet 3,80 € / os. według taryfy od lipca 2026; bagaż bez dopłaty.'],
    ['PRZESIADKA', 'Porta Susa → Porta Nuova', 'Pieszo: orientacyjnie 1,5–2 km i 30–40 min z pokrowcami. Metro ma limit bagażu 80 cm, dlatego nie jest bazową opcją ze snowboardami.'],
    ['ZWYKLE OK. CO GODZINĘ*', 'Torino Porta Nuova → Oulx', 'Pociąg w kierunku Bardonecchia · ok. 75–90 min. Nie wybieraj odgałęzienia kończącego w Susa.'],
    ['SPRAWDŹ KURS 285', 'Oulx → Sestriere', 'Autobus spod dworca · ok. 45 min. Przyjazd wieczorem, konkretną godzinę określi zimowy rozkład.'],
  ];
  return rows.map(([time, title, text], i) => `<div class="journey-step"><span class="step-number">${i + 1}</span><div><span class="step-time">${time}</span><h3>${title}</h3><p>${text}</p></div></div>`).join('') + `<p class="footnote">* Częstotliwość orientacyjna, nie potwierdzony rozkład na Waszą sobotę. ${external(sources.bus, 'Rozkład 285')} · ${external(sources.airport, 'Pociąg z lotniska')}</p>`;
}
function transportCosts(): string {
  return `<div class="transport-note"><b>Z pokrowcami: ważna przesiadka</b><p>Pociąg z lotniska dojeżdża do Porta Susa. Do Porta Nuova plan zakłada spacer 30–40 min z bagażami, a nie metro: jego regulamin ogranicza bagaż do 80 × 50 × 50 cm. Jeśli nie chcecie iść, autobus lotniskowy do Porta Nuova jest wygodniejszą, ale droższą alternatywą. ${external(sources.walk, 'Trasa spaceru')} · ${external(sources.metro, 'Regulamin metra')}</p></div>
  <details class="cost-details" open><summary>Przejazdy i bagaże — rozpiska dla pary w obie strony</summary><div class="transport-price-table"><div><span>Pociąg lotnisko ↔ Turyn</span><b>15,20 €</b><small>2 osoby × 2 kierunki × 3,80 €</small></div><div><span>Pociąg Turyn ↔ Oulx</span><b>31,20–34,40 €</b><small>Szacunek 7,80–8,60 € / os. / kierunek; cena konkretnego biletu do potwierdzenia</small></div><div><span>Autobus Oulx ↔ Sestriere</span><b>15,20 €</b><small>2 osoby × 2 kierunki × 3,80 €; aktualny kalkulator Arriva</small></div><div><span>3 duże bagaże w autobusie 285</span><b>11,40 €</b><small>3 sztuki × 2 kierunki × 50% ceny pojedynczego biletu</small></div><div><span>Spacer między dworcami</span><b>0 €</b><small>Nie doliczamy metra ani taksówki</small></div><div><span>Razem za parę A/R</span><b>ok. 314–328 zł</b><small>73–76,20 € przy 4,30 zł/€; w kosztorysie zaokrąglona rezerwa 380 zł</small></div></div><p><b>Same dopłaty za bagaże: ok. 49 zł za parę w obie strony.</b> W pociągu 0 €, o ile nie blokują przejść. Arriva nalicza 50% zwykłej taryfy za każdą sztukę ponad 50 × 30 × 25 cm; bilety bagażowe u kierowcy, przewóz zależy też od miejsca. Przy 4 osobach liczymy 2 walizki i 4 pokrowce, więc powyższe kwoty podwajamy.</p><p>${external(sources.fares, 'Taryfa regionu od 1.07.2026')} · ${external(sources.railBags, 'Bagaż w pociągu')} · ${external(sources.busBags, 'Bagaż Arriva')}</p></details>`;
}
function skiSection(): string {
  return `<section class="section ski-section" id="trasy">${heading('03 / TEREN DO ODKRYCIA', 'Tu jeździmy. Tu śpimy.', 'Przybliż mapę, aby zobaczyć trasy i wyciągi wokół wybranego noclegu. Oznaczenia są propozycjami, nie rezerwacją.')}<div class="ski-map-layout"><div class="map-wrap"><div id="ski-map" class="ski-map" aria-label="Mapa tras Vialattea i proponowanych noclegów"></div><div class="ski-map-tools"><button id="show-stay">Pokaż wybrany nocleg</button><button id="show-resort">Cały region</button></div></div><aside class="ski-aside"><span class="large-number">6<span>DNI</span></span><h3>Jeden skipass.<br>Wiele kierunków.</h3><p>Sestriere, Sauze d’Oulx, Sansicario, Cesana, Claviere i Pragelato. W 6-dniowym Vialattea jest także jeden dzień rozszerzenia na Montgenèvre.</p><div id="pass-price"></div>${external(sources.skipass, 'Cennik 2026/27', 'text-link')}<div id="official-map-link"></div><p class="footnote">OpenSnowMap / OpenStreetMap. Mapa nie pokazuje bieżącego otwarcia tras. Przed jazdą sprawdź komunikaty operatora.</p></aside></div><p class="footnote">* 400 km to deklarowana sieć całego międzynarodowego regionu. Nie oznacza 400 km otwartych tras ani codziennego, nieograniczonego wstępu do francuskiej części w podstawowym skipassie.</p></section>`;
}
function itinerarySection(): string {
  const days = [['01', 'Niedziela', 'Rozgrzewka w Sestriere', 'Poznajcie wyciągi i powroty do bazy. Pierwszy dzień bez gonienia kilometrów.'], ['02', 'Poniedziałek', 'Borgata i okolice', 'Lokalny dzień. Dobierzcie trasy do umiejętności całej grupy.'], ['03', 'Wtorek', 'W stronę Sauze d’Oulx', 'Dłuższa wycieczka przez połączone sektory, przy otwartych łącznikach.'], ['04', 'Środa', 'Sansicario', 'Nowa część regionu. Sprawdźcie godzinę ostatniego wyciągu powrotnego.'], ['05', 'Czwartek', 'Dzień do wyboru', 'Ulubione trasy albo Montgenèvre. Francuski wariant wymaga sprawdzenia połączeń.'], ['06', 'Piątek', 'Ostatnie skręty', 'Jazda bliżej bazy, potem pakowanie sprzętu przed porannym wyjazdem.']];
  return `<section class="section" id="tydzien">${heading('PLAN BEZ POŚPIECHU', 'Sześć dni. Własne tempo.', 'Sobota: przylot i zakwaterowanie. Kolejna sobota: powrót bez jazdy. Reszta według pogody i otwartych połączeń.')}<div class="days-grid">${days.map(([n, day, title, text]) => `<article><span class="day-number">${n}</span><p class="eyebrow">${day}</p><h3>${title}</h3><p>${text}</p></article>`).join('')}</div><div class="ready-note"><b>Przed zakupem</b><p>Potwierdźcie zimowe połączenia, dojście do wyciągu i możliwość wcześniejszego wymeldowania. Przy locie o 15:00 celem jest lotnisko do 13:00. Wybierzcie ubezpieczenie obejmujące snowboard i OC na stoku.</p></div></section>`;
}
function sourceSection(): string {
  return `<section class="section sources-section" id="zrodla"><p class="eyebrow">SKĄD TE LICZBY</p><h2>Źródła i aktualność.</h2><div class="source-links">${external(sources.guide, 'Poradnik: Turyn jako baza w Alpy')}${external(sources.airport, 'Trenitalia: lotnisko')}${external(sources.link, 'Vialattea Link: pociąg + autobus')}${external(sources.bus, 'Arriva: rozkład 285')}${external(sources.busBags, 'Arriva: bagaż')}${external(sources.skipass, 'Skipassy 2026/27')}${external(sources.sports, 'Wizz: sprzęt sportowy')}${external(sources.resort, 'Vialattea: warunki i otwarte trasy')}</div><p>Plan podróży i zestawienie ofert, nie rezerwacja ani gwarancja ceny. Ceny dynamiczne; przeliczenie orientacyjne 4,30 zł/€. Brak potwierdzonej ceny pokazujemy wprost. Mapy wymagają połączenia z siecią.</p></section>`;
}
function refresh(): void {
  element('budget').innerHTML = budgetMarkup();
  element('comparison').innerHTML = comparisonMarkup();
  element('flights').innerHTML = flightsMarkup();
  element('stays').innerHTML = staysMarkup();
  const pass = weeks[week].pass;
  element('pass-price').innerHTML = pass === null ? '<p>Cena do potwierdzenia.</p>' : `<p class="pass-amount">${eur(pass)} <span>/ osoba online</span></p><p>${weeks[week].ski} · ${eur(pass * party)} za ${party} osoby. Bez ubezpieczenia i ewentualnego nośnika.</p>`;
  document.querySelectorAll<HTMLButtonElement>('[data-party]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.party) === party)));
  document.querySelectorAll<HTMLButtonElement>('[data-week]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.week === week)));
}
function baseMap(id: string, center: L.LatLngExpression, zoom: number): L.Map {
  const map = L.map(id, {scrollWheelZoom: false}).setView(center, zoom);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
  return map;
}
function mapMarker(map: L.Map, point: L.LatLngExpression, label: string, text: string, type = ''): L.Marker {
  return L.marker(point, {icon: L.divIcon({className: `map-marker ${type}`, html: `<span>${label}</span>`, iconSize: [34, 34], iconAnchor: [17, 17]}), title: text.replace(/<[^>]*>/g, '')}).addTo(map).bindPopup(text);
}
function transportMap(): void {
  const map = baseMap('transport-map', [45.02, 7.2], 9);
  const nodes: {point: [number, number]; title: string}[] = [
    {point: [45.191758, 7.642723], title: 'TRN · lotnisko i stacja kolejowa'},
    {point: [45.070415, 7.664744], title: 'Torino Porta Susa · pociąg lotniskowy'},
    {point: [45.062450, 7.678853], title: 'Torino Porta Nuova · pociąg do Oulx'},
    {point: [45.038469, 6.829403], title: 'Oulx · autobus 285'},
    {point: [44.958, 6.878], title: 'Sestriere · miejscowość docelowa'},
  ];
  nodes.forEach((n, i) => mapMarker(map, n.point, String(i + 1), n.title));
  const colors = ['#235d80', '#775b8d', '#235d80', '#e96832'];
  nodes.slice(0, -1).forEach((n, i) => L.polyline([n.point, nodes[i + 1].point], {color: colors[i], weight: 4, dashArray: '7 7'}).addTo(map));
  map.fitBounds(L.latLngBounds(nodes.map(n => n.point)), {padding: [32, 32]});
}
const resortBounds: L.LatLngBoundsExpression = [[44.90, 6.70], [45.06, 6.94]];
const lodgingMarkers = new Map<string, L.Marker>();
function skiMap(): L.Map {
  const map = baseMap('ski-map', [44.965, 6.879], 14);
  L.tileLayer('https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '&copy; <a href="https://www.opensnowmap.org/">OpenSnowMap</a> · CC-BY-SA'}).addTo(map);
  stays.forEach(s => {if (s.coords) lodgingMarkers.set(s.id, mapMarker(map, s.coords, '⌂', `<b>${s.name}</b><br>Propozycja noclegu<br>${s.locationNote}`, 'lodging').bindTooltip(s.name, {permanent: true, direction: 'top', offset: [0, -14], className: 'stay-map-label'}));});
  return map;
}
function showStay(map: L.Map): void {
  const stay = stays.find(s => s.id === selectedStay);
  if (stay?.coords) {map.setView(stay.coords, 16); lodgingMarkers.get(stay.id)?.openPopup();}
}
function bindControls(map: L.Map): void {
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>('button');
    if (!button) return;
    if (button.dataset.party) {party = Number(button.dataset.party) as Party; refresh();}
    if (button.dataset.week) {week = button.dataset.week as Week; refresh();}
    if (button.dataset.stay) {selectedStay = button.dataset.stay; refresh(); showStay(map);}
    if (button.dataset.direction) {
      element('journey-steps').innerHTML = journeyMarkup(button.dataset.direction === 'back');
      document.querySelectorAll('[data-direction]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    }
    if (button.id === 'show-stay') showStay(map);
    if (button.id === 'show-resort') map.fitBounds(resortBounds);
  });
}
element('app').innerHTML = shell();
refresh();
element('journey-steps').innerHTML = journeyMarkup(false);
element('transport-costs').innerHTML = transportCosts();
element('official-map-link').innerHTML = external(sources.skiMap, 'Oficjalna mapa panoramiczna 2025/26 (PDF)', 'text-link');
transportMap();
const map = skiMap();
bindControls(map);
