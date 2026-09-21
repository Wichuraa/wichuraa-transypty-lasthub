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
export declare const MARKA: Marka;
/**
 * Łączy ustawienia domyślne z tym, co podał użytkownik.
 */
export declare function polaczMarke(wlasna?: Partial<Marka>): Marka;
/**
 * Formatuje datę po polsku, np. „21 września 2026, 03:42”.
 */
export declare function polskaData(data: Date): string;
/**
 * Poprawna polska odmiana słowa „wiadomość”.
 * W polskim wszystkie formy mnogie są identyczne, różni się tylko liczba pojedyncza.
 */
export declare function odmienWiadomosci(liczba: number): string;
