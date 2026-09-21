"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MARKA = void 0;
exports.polaczMarke = polaczMarke;
exports.polskaData = polskaData;
exports.odmienWiadomosci = odmienWiadomosci;
/** Domyślne ustawienia — LastHub.pl. */
exports.MARKA = {
    nazwa: 'LastHub.pl',
    podtytul: 'Zapis rozmowy ze zgłoszenia',
    logo: 'https://lasthub.pl/assets/logo.png',
    strona: 'https://lasthub.pl',
    kolor: '#ffd900',
    kolorDrugi: '#ffbe0b',
    stopka: 'LastHub.pl — dziękujemy, że z nami jesteś!',
};
/**
 * Łączy ustawienia domyślne z tym, co podał użytkownik.
 */
function polaczMarke(wlasna) {
    return Object.assign(Object.assign({}, exports.MARKA), (wlasna !== null && wlasna !== void 0 ? wlasna : {}));
}
/**
 * Formatuje datę po polsku, np. „21 września 2026, 03:42”.
 */
function polskaData(data) {
    return new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(data);
}
/**
 * Poprawna polska odmiana słowa „wiadomość”.
 * W polskim wszystkie formy mnogie są identyczne, różni się tylko liczba pojedyncza.
 */
function odmienWiadomosci(liczba) {
    return liczba === 1 ? 'wiadomość' : 'wiadomości';
}
//# sourceMappingURL=branding.js.map