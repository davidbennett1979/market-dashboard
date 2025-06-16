import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";
  const data = await fetch(url).then((r) => r.json());

  // 🛠️  ensure we always send an array
  const safe = Array.isArray(data) ? data : [];

  res.setHeader("Cache-Control", "s-maxage=30");
  res.json(safe);
}

