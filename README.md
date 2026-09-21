# lasthub-transkrypty

Generator transkrypcji rozmów Discord w formacie HTML — wersja przygotowana pod **LastHub.pl**.

Fork [discord-html-transcripts](https://github.com/ItzDerock/discord-html-transcripts) autorstwa Derocka,
rozszerzony o branding LastHub, polskie tłumaczenie i zgodność z discord.js v15.

---

## Co zmieniono względem oryginału

| Zmiana | Opis |
|---|---|
| **Nagłówek marki** | Logo, nazwa serwera i metryczka zapisu (kanał, serwer, liczba wiadomości, data) nad rozmową |
| **Kolorystyka** | Żółty akcent `#ffd900` zamiast domyślnego fioletu — paski, ramki, linki |
| **Polskie tłumaczenie** | Nagłówki, stopka, komunikaty systemowe, powitania, tytuł strony i nazwa pliku |
| **Polskie daty** | Format `21 września 2026, 03:34` zamiast angielskiego |
| **Zgodność z v15** | `peerDependencies` dopuszcza wersje deweloperskie discord.js 15 |
| **Instalacja z GitHuba** | Skrypt `prepare` buduje paczkę automatycznie przy `npm install` |

---

## Instalacja

```bash
npm install github:Wichuraa/wichuraa-transypty-lasthub
```

Paczka zbuduje się sama — `prepare` uruchamia kompilator TypeScriptu.

---

## Użycie

```js
import { createTranscript, ExportReturnType } from 'lasthub-transkrypty'

const plik = await createTranscript(kanal, {
  limit: -1,                          // cała historia kanału
  returnType: ExportReturnType.Buffer,
  filename: 'zgloszenie-0058.html',
  saveImages: false,
})
```

### Zmiana wyglądu

Wszystkie elementy marki można nadpisać opcją `marka`:

```js
await createTranscript(kanal, {
  marka: {
    nazwa: 'LastHub.pl',
    podtytul: 'Zapis rozmowy ze zgłoszenia',
    logo: 'https://lasthub.pl/assets/logo.png',
    strona: 'https://lasthub.pl',
    kolor: '#ffd900',
    kolorDrugi: '#ffbe0b',
    stopka: 'LastHub.pl — dziękujemy, że z nami jesteś!',
  },
})
```

Wartości domyślne znajdują się w [`src/branding.ts`](src/branding.ts).

### Stopka

Opcja `footerText` obsługuje znaczniki:

- `{number}` — liczba zapisanych wiadomości
- `{wiadomosci}` — odmieniony rzeczownik (`wiadomość` / `wiadomości`)

Domyślnie: `Zapisano {number} {wiadomosci}.`

---

## Rozwój

```bash
npm install --legacy-peer-deps
npm run build
```

> `--legacy-peer-deps` jest potrzebne tylko przy pracy nad samą paczką, bo
> `devDependencies` przypinają discord.js v14. Instalacja paczki w projekcie
> korzystającym z v15 działa bez tej flagi.

---

## Licencja

Apache-2.0 — tak jak oryginał. Autor pierwotnej wersji: Derock <derock@derock.dev>.
