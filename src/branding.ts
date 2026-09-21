/**
 * Ustawienia wyglądu transkrypcji LastHub.pl.
 *
 * Każdą z tych wartości można nadpisać przy wywołaniu `createTranscript`
 * przez opcję `marka`, np.:
 *
 * ```ts
 * createTranscript(kanal, { marka: { nazwa: 'Inny serwer', kolor: '#00ff88' } })
 * ```
 */
export type Marka = {
  /** Nazwa wyświetlana w nagłówku i tytule strony. */
  nazwa: string;

  /** Podtytuł pod nazwą — zwykle rodzaj zapisu. */
  podtytul: string;

  /** Adres logo pokazywanego w nagłówku. Pusty tekst ukrywa logo. */
  logo: string;

  /** Adres strony, do której prowadzi kliknięcie w nagłówek. */
  strona: string;

  /** Kolor wiodący (paski, akcenty, linki). */
  kolor: string;

  /** Kolor pomocniczy — używany w gradiencie paska. */
  kolorDrugi: string;

  /** Tekst stopki pod zapisem rozmowy. */
  stopka: string;
};

/** Domyślne ustawienia — LastHub.pl. */
export const MARKA: Marka = {
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
export function polaczMarke(wlasna?: Partial<Marka>): Marka {
  return { ...MARKA, ...(wlasna ?? {}) };
}

/**
 * Formatuje datę po polsku, np. „21 września 2026, 03:42”.
 */
export function polskaData(data: Date): string {
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
export function odmienWiadomosci(liczba: number): string {
  return liczba === 1 ? 'wiadomość' : 'wiadomości';
}
