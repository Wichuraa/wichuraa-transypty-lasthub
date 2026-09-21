import React from 'react';
import { type Marka } from '../../branding';
/**
 * Nagłówek marki wyświetlany nad zapisem rozmowy.
 *
 * Renderowany jest do statycznego HTML-a, więc wszystkie style muszą być
 * wpisane wprost — w gotowym pliku nie ma żadnego arkusza stylów.
 */
export default function BrandHeader({ marka, kanal, serwer, liczbaWiadomosci, }: {
    marka: Marka;
    kanal: string;
    serwer: string;
    liczbaWiadomosci: number;
}): React.JSX.Element;
