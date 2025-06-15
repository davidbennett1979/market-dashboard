import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import { usePrefs } from "@/store/prefs";

export default function ContextMenu({
  cardId,
  children,
}: {
  cardId: string;
  children: React.ReactNode;
}) {
  const { cards, setCard } = usePrefs();
  const current = cards[cardId]?.symbols ?? [];

  const configureSymbols = () => {
    const csv = prompt("Comma-separated tickers", current.join(","));
    if (csv === null) return;                // user cancelled
    const list = csv
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);
    setCard(cardId, { symbols: list });
  };

  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button as={Fragment}>{children}</Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md
                             bg-neutral-700 p-1 shadow-lg ring-1 ring-black/20 focus:outline-none">
        {[
          { label: "Configure Symbols", action: configureSymbols },
          { label: "Change Data Source", action: () => alert("TODO") },
          { label: "Refresh Rate…", action: () => alert("TODO") },
        ].map(({ label, action }) => (
          <Menu.Item key={label}>
            {({ active }) => (
              <button
                onClick={action}
                className={clsx(
                  "block w-full rounded px-3 py-2 text-left text-sm",
                  active ? "bg-neutral-600 text-white" : "text-neutral-200"
                )}
              >
                {label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

