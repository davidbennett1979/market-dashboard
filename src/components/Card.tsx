import ContextMenu from "./ContextMenu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function Card({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`relative rounded-lg bg-neutral-800 p-4 shadow ${className}`}
    >
      <header className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-200">{title}</h2>
        <ContextMenu>
          <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer text-neutral-400 hover:text-neutral-200" />
        </ContextMenu>
      </header>

      <div className="text-neutral-400">{children ?? "Coming soon…"}</div>
    </section>
  );
}

