import React from 'react';
import { odmienWiadomosci, polskaData, type Marka } from '../../branding';

/**
 * Nagłówek marki wyświetlany nad zapisem rozmowy.
 *
 * Renderowany jest do statycznego HTML-a, więc wszystkie style muszą być
 * wpisane wprost — w gotowym pliku nie ma żadnego arkusza stylów.
 */
export default function BrandHeader({
  marka,
  kanal,
  serwer,
  liczbaWiadomosci,
}: {
  marka: Marka;
  kanal: string;
  serwer: string;
  liczbaWiadomosci: number;
}) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1b1c17 0%, #24251d 100%)',
        borderBottom: `3px solid ${marka.kolor}`,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: '#ffffff',
      }}
    >
      {/* górny pasek w kolorach marki */}
      <div
        style={{
          height: '6px',
          background: `linear-gradient(90deg, ${marka.kolor}, ${marka.kolorDrugi}, ${marka.kolor})`,
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          padding: '20px 26px',
          maxWidth: '1100px',
          margin: '0 auto',
          flexWrap: 'wrap',
        }}
      >
        {marka.logo ? (
          <a href={marka.strona} style={{ display: 'block', flexShrink: 0 }}>
            <img
              src={marka.logo}
              alt={marka.nazwa}
              height={56}
              style={{ height: '56px', width: 'auto', display: 'block' }}
            />
          </a>
        ) : null}

        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <a
            href={marka.strona}
            style={{
              color: marka.kolor,
              fontSize: '22px',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              display: 'block',
            }}
          >
            {marka.nazwa}
          </a>
          <div style={{ color: '#b9bdb0', fontSize: '13px', marginTop: '2px' }}>{marka.podtytul}</div>
        </div>

        {/* metryczka zapisu */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            flex: '1 1 auto',
          }}
        >
          <Etykieta tytul="Kanał" wartosc={`#${kanal}`} kolor={marka.kolor} />
          <Etykieta tytul="Serwer" wartosc={serwer} kolor={marka.kolor} />
          <Etykieta
            tytul="Zapisano"
            wartosc={`${liczbaWiadomosci} ${odmienWiadomosci(liczbaWiadomosci)}`}
            kolor={marka.kolor}
          />
          <Etykieta tytul="Wygenerowano" wartosc={polskaData(new Date())} kolor={marka.kolor} />
        </div>
      </div>
    </div>
  );
}

/** Pojedyncza pozycja metryczki w nagłówku. */
function Etykieta({ tytul, wartosc, kolor }: { tytul: string; wartosc: string; kolor: string }) {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        padding: '7px 13px',
        minWidth: '96px',
      }}
    >
      <div
        style={{
          color: kolor,
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {tytul}
      </div>
      <div style={{ color: '#efefe6', fontSize: '13px', marginTop: '2px', whiteSpace: 'nowrap' }}>{wartosc}</div>
    </div>
  );
}
