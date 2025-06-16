// src/pages/api/quote.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    /* ---------- 1. validate query ---------- */
    const { symbols } = req.query; // e.g. "^GSPC,^IXIC,^DJI"
    if (!symbols || typeof symbols !== "string") {
      return res.status(400).json({ error: "symbols query required" });
    }

    /* ---------- 2. try Yahoo Finance first ---------- */
    let list: any[] = [];
    try {
      const yUrl =
        "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" +
        encodeURIComponent(symbols);
      const yData = await fetch(yUrl).then((r) => r.json());

      if (Array.isArray(yData?.quoteResponse?.result)) {
        list = yData.quoteResponse.result;
      }
    } catch {
      /* ignore Yahoo fetch/parse errors */
    }

    /* ---------- 3. fallback to Polygon if Yahoo empty ---------- */
    if (list.length === 0 && process.env.POLYGON_KEY) {
      try {
        const pUrl = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${encodeURIComponent(
          symbols
        )}&apiKey=${process.env.POLYGON_KEY}`;

        const pData = await fetch(pUrl).then((r) => r.json());
        if (Array.isArray(pData?.tickers)) {
          list = pData.tickers.map((t: any) => ({
            symbol: t.ticker,
            price: t.day.c,
            chg:
              t.day && t.day.o
                ? ((t.day.c - t.day.o) / t.day.o) * 100
                : 0,
          }));
        }
      } catch {
        /* ignore Polygon errors */
      }
    }

    /* ---------- 4. defensive fallback ---------- */
    const cleaned = list.map((q: any) => ({
      symbol: q.symbol,
      price: q.price ?? q.regularMarketPrice ?? 0,
      chg: q.chg ?? q.regularMarketChangePercent ?? 0,
    }));

    /* ---------- 5. return ---------- */
    res.setHeader("Cache-Control", "s-maxage=5");
    res.status(200).json(cleaned);
  } catch (err: any) {
    console.error("quote route error", err);
    res.status(502).json({ error: "upstream failure" });
  }
}

