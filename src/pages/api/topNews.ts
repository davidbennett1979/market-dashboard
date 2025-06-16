import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = process.env.FINNHUB_KEY;
  if (!key) return res.status(500).json({ error: "Finnhub key missing" });

  const url = `https://newsapi.org/v2/top-headlines?category=business&pageSize=10&apiKey=${key}`;
  const data = await fetch(url).then(r => r.json());
  res.setHeader("Cache-Control", "s-maxage=120");
  res.json(data.articles || []);
}

