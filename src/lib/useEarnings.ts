import useSWR from "swr";
const fetcher = (u: string) => fetch(u).then(r => r.json());

export const useEarnings = (refreshSec: number) =>
  useSWR("/api/earnings", fetcher, { refreshInterval: refreshSec * 1000 });

