import { create } from "zustand";

interface PrefState {
  globals: Record<string, unknown>;
  cardPrefs: Record<string, unknown>;
  setGlobals: (g: Record<string, unknown>) => void;
  setCardPrefs: (k: string, v: unknown) => void;
}

export const usePrefs = create<PrefState>()((set) => ({
  globals: {},
  cardPrefs: {},
  setGlobals: (g) => set(() => ({ globals: g })),
  setCardPrefs: (key, val) =>
    set((s) => ({ cardPrefs: { ...s.cardPrefs, [key]: val } })),
}));

