"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BrandHeader;
const react_1 = __importDefault(require("react"));
const branding_1 = require("../../branding");
/**
 * Nagłówek marki wyświetlany nad zapisem rozmowy.
 *
 * Renderowany jest do statycznego HTML-a, więc wszystkie style muszą być
 * wpisane wprost — w gotowym pliku nie ma żadnego arkusza stylów.
 */
function BrandHeader({ marka, kanal, serwer, liczbaWiadomosci, }) {
    return (react_1.default.createElement("div", { style: {
            background: 'linear-gradient(135deg, #1b1c17 0%, #24251d 100%)',
            borderBottom: `3px solid ${marka.kolor}`,
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            color: '#ffffff',
        } },
        react_1.default.createElement("div", { style: {
                height: '6px',
                background: `linear-gradient(90deg, ${marka.kolor}, ${marka.kolorDrugi}, ${marka.kolor})`,
            } }),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                padding: '20px 26px',
                maxWidth: '1100px',
                margin: '0 auto',
                flexWrap: 'wrap',
            } },
            marka.logo ? (react_1.default.createElement("a", { href: marka.strona, style: { display: 'block', flexShrink: 0 } },
                react_1.default.createElement("img", { src: marka.logo, alt: marka.nazwa, height: 56, style: { height: '56px', width: 'auto', display: 'block' } }))) : null,
            react_1.default.createElement("div", { style: { flex: '1 1 260px', minWidth: 0 } },
                react_1.default.createElement("a", { href: marka.strona, style: {
                        color: marka.kolor,
                        fontSize: '22px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        letterSpacing: '-0.02em',
                        display: 'block',
                    } }, marka.nazwa),
                react_1.default.createElement("div", { style: { color: '#b9bdb0', fontSize: '13px', marginTop: '2px' } }, marka.podtytul)),
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                    flex: '1 1 auto',
                } },
                react_1.default.createElement(Etykieta, { tytul: "Kana\u0142", wartosc: `#${kanal}`, kolor: marka.kolor }),
                react_1.default.createElement(Etykieta, { tytul: "Serwer", wartosc: serwer, kolor: marka.kolor }),
                react_1.default.createElement(Etykieta, { tytul: "Zapisano", wartosc: `${liczbaWiadomosci} ${(0, branding_1.odmienWiadomosci)(liczbaWiadomosci)}`, kolor: marka.kolor }),
                react_1.default.createElement(Etykieta, { tytul: "Wygenerowano", wartosc: (0, branding_1.polskaData)(new Date()), kolor: marka.kolor })))));
}
/** Pojedyncza pozycja metryczki w nagłówku. */
function Etykieta({ tytul, wartosc, kolor }) {
    return (react_1.default.createElement("div", { style: {
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '7px 13px',
            minWidth: '96px',
        } },
        react_1.default.createElement("div", { style: {
                color: kolor,
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
            } }, tytul),
        react_1.default.createElement("div", { style: { color: '#efefe6', fontSize: '13px', marginTop: '2px', whiteSpace: 'nowrap' } }, wartosc)));
}
//# sourceMappingURL=brandHeader.js.map