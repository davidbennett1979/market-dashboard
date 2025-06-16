import type { NextApiRequest, NextApiResponse } from "next";

/**
 * POST /api/keys   { provider:"finnhub", key:"•••" }
 *
 * NOTE:  In this stub we simply log. Replace the console.log
 *        with a Supabase RPC or KV write tied to `req.cookies.userId`.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { provider, key } = req.body;

  if (!provider || !key) return res.status(400).json({ error: "provider & key required" });

  // TODO: real persistence (Supabase, Redis, etc.)
  console.log(`🔐 saveKey → user=demo provider=${provider} key=${key.slice(0, 4)}…`);

  return res.status(204).end(); // no-content
}

