import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = process.env.FINNHUB_KEY;
  if (!key) return res.status(500).json({ error: "Finnhub key missing" });

  const today = new Date().toISOString().slice(0, 10);  // YYYY-MM-DD
  const url = `https://finnhub.io/api/v1/calendar/earnings?from=${today}&to=${today}&token=${key}`;

  const data = await fetch(url).then(r => r.json());
  res.setHeader("Cache-Control", "s-maxage=3600");
  res.json(data.earningsCalendar || []);
}

