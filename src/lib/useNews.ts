import useSWR from "swr";
const fetcher = (u: string) => fetch(u).then(r => r.json());

export const useNews = (_ticker: string, refreshSec: number) =>
  useSWR("/api/topNews", fetcher, { refreshInterval: refreshSec * 1000 });

