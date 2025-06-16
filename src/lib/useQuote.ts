import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useQuote = (symbols: string[], refresh: number) =>
  useSWR(
    symbols.length ? `/api/quote?symbols=${symbols.join(",")}` : null,
    fetcher,
    { refreshInterval: refresh * 1000 }
  );

