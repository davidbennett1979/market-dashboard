// src/types/prefs.ts
export interface GlobalPrefs {
  theme: 'dark' | 'light';
  fiat: 'USD' | 'EUR' | 'JPY';
  timezone: string;             // IANA tz string
apiKeys: { [provider: string]: boolean };  // just true/false (“saved”)
}

// --- added alias ------------------------------------------------------
export interface CardPref {
  symbols?: string[];
  dataSource?: 'yahoo' | 'polygon' | 'iex';
  refreshSec?: number;
  layout?: { w: number; h: number; x: number; y: number };
}
// ----------------------------------------------------------------------

export interface CardPrefs {
  [cardId: string]: CardPref;    // <— now uses the alias
}

export interface PrefState {
  globals: GlobalPrefs;
  cards: CardPrefs;
}

