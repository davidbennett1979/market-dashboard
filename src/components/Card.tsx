// src/components/Card.tsx
import ContextMenu from "./ContextMenu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { usePrefs } from "@/store/prefs";

/* client data hooks */
import { useQuote }     from "@/lib/useQuote";
import { useEarnings }  from "@/lib/useEarnings";
import { useNews }      from "@/lib/useNews";
import { useCrypto }    from "@/lib/useCrypto";

interface Props {
  cardId: string;
  title: string;
  className?: string;
}

export default function Card({ cardId, title, className = "" }: Props) {
  const { cards } = usePrefs();
  const { symbols, dataSource, refreshSec } = cards[cardId] ?? {};
  const every   = (refreshSec ?? 30) * 1000;           // ms

  /* ----- special hooks per card ----- */
  const quote    = useQuote   (symbols ?? [], refreshSec ?? 30);
  const earnings = useEarnings(refreshSec ?? 3600);
  const news     = useNews    (symbols?.[0] ?? "", refreshSec ?? 120);
  const crypto   = useCrypto  (refreshSec ?? 30);
  /* ---------------------------------- */

/* ----- helper renderers ----- */
const renderIndexes = () => {
  const list = Array.isArray(quote.data) ? quote.data : [];
  if (list.length === 0) return <div className="text-neutral-500">No data</div>;

  return (
    <div className="space-y-1 text-sm">
      {list.slice(0, 5).map((q: any) => (
        <div key={q.symbol} className="flex justify-between">
          <span>{q.symbol}</span>
          <span className={q.chg >= 0 ? "text-green-400" : "text-red-400"}>
            {q.price.toFixed(2)} ({q.chg.toFixed(2)}%)
          </span>
        </div>
      ))}
    </div>
  );
};

const renderNews = () => {
  const list = Array.isArray(news.data) ? news.data : [];
  if (list.length === 0) return <div className="text-neutral-500">No news</div>;

  return (
    <ul className="space-y-1 text-sm list-disc list-inside">
      {list.slice(0, 5).map((n: any) => (
        <li key={n.url}>
          <a href={n.url} target="_blank" className="hover:underline">
            {n.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

const renderEarnings = () => {
  const list = Array.isArray(earnings.data) ? earnings.data : [];
  if (list.length === 0) return <div className="text-neutral-500">No earnings today</div>;

  return (
    <div className="space-y-1 text-sm">
      {list.slice(0, 6).map((e: any) => (
        <div key={e.symbol} className="flex justify-between">
          <span>{e.symbol}</span>
          <span>{e.est ? `Est ${e.est}` : "–"}</span>
        </div>
      ))}
    </div>
  );
};

const renderCrypto = () => {
  const list = Array.isArray(crypto.data) ? crypto.data : [];
  if (list.length === 0) return <div className="text-neutral-500">No data</div>;

  return (
    <div className="space-y-1 text-sm">
      {list.slice(0, 5).map((c: any) => (
        <div key={c.id} className="flex justify-between">
          <span>{c.symbol.toUpperCase()}</span>
          <span
            className={
              c.price_change_percentage_24h >= 0
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {c.current_price.toFixed(0)} ({c.price_change_percentage_24h.toFixed(1)}%)
          </span>
        </div>
      ))}
    </div>
  );
};
/* ---------------------------------- */

  /* decide which renderer */
  let body: JSX.Element;
  switch (cardId) {
    case "indexes":     body = renderIndexes();  break;
    case "earnings":    body = renderEarnings(); break;
    case "top-news":    body = renderNews();     break;
    case "crypto":      body = renderCrypto();   break;
    default:
      body = (
        <div className="text-neutral-400">
          {symbols && symbols.join(" · ")}
          {dataSource && (
            <div className="text-xs">
              via {dataSource} • every {(refreshSec ?? "?").toString()} s
            </div>
          )}
          {!symbols && !dataSource && "Coming soon…"}
        </div>
      );
  }

  return (
    <section className={`relative rounded-lg bg-neutral-800 p-4 shadow ${className}`}>
      {/* header */}
      <header className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-200">{title}</h2>
        <ContextMenu cardId={cardId}>
          <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer text-neutral-400 hover:text-neutral-200" />
        </ContextMenu>
      </header>

      {body}
    </section>
  );
}

