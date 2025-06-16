import useSWR from "swr";
const fetcher = (u: string) => fetch(u).then(r => r.json());

export const useCrypto = (refreshSec: number) =>
  useSWR("/api/crypto", fetcher, { refreshInterval: refreshSec * 1000 });

