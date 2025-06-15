// src/components/Card.tsx
import ContextMenu from "./ContextMenu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { usePrefs } from "@/store/prefs";

interface Props {
  cardId: string;
  title: string;
  className?: string;
}

export default function Card({ cardId, title, className = "" }: Props) {
  const { cards } = usePrefs();
  const { symbols, dataSource, refreshSec } = cards[cardId] ?? {};

  return (
    <section
      className={`relative rounded-lg bg-neutral-800 p-4 shadow ${className}`}
    >
      {/* header */}
      <header className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-200">{title}</h2>
        <ContextMenu cardId={cardId}>
          <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer text-neutral-400 hover:text-neutral-200" />
        </ContextMenu>
      </header>

      {/* body */}
      <div className="text-neutral-400 space-y-1">
        {/* show symbols, if any */}
        {symbols && <div>{symbols.join(" · ")}</div>}

        {/* show data-source & refresh, if set */}
        {dataSource && (
          <div className="text-xs">
            via {dataSource} • every {(refreshSec ?? "?").toString()}&nbsp;s
          </div>
        )}

        {/* fallback */}
        {!symbols && !dataSource && "Coming soon…"}
      </div>
    </section>
  );
}

