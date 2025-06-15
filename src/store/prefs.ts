// src/store/prefs.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PrefState, GlobalPrefs, CardPrefs } from '@/types/prefs';

const defaultState: PrefState = {
  globals: {
    theme: 'dark',
    fiat: 'USD',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    apiKeys: {finnhub: '', newsapi: '' },
  },
  cards: {
    indexes:   { symbols: ['^GSPC', '^IXIC', '^DJI'], dataSource: 'yahoo',  refreshSec: 5   },
    earnings:  {                                           dataSource: 'finnhub', refreshSec: 3600 },
    'top-news':{                                           dataSource: 'newsapi', refreshSec: 120  },
  },
};

export const usePrefs = create<PrefState & {
  setGlobals: (g: Partial<GlobalPrefs>) => void;
  setCard: (id: string, data: Partial<CardPrefs[string]>) => void;
}>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setGlobals: (g) => set({ globals: { ...get().globals, ...g } }),
      setCard: (id, data) =>
        set({
          cards: { ...get().cards, [id]: { ...get().cards[id], ...data } },
        }),
    }),
    {
      name: 'market-dashboard-prefs',               // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

