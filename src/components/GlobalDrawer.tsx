// src/components/GlobalDrawer.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { usePrefs } from "@/store/prefs";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function GlobalDrawer({ open, setOpen }: Props) {
  const { globals, setGlobals } = usePrefs();

  const saveApiKey = (provider: string, val: string) =>
    setGlobals({ apiKeys: { ...globals.apiKeys, [provider]: val } });

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <Transition.Child
            enter="transform transition ease-in-out duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
            className="w-screen max-w-md"
          >
            <Dialog.Panel className="h-full w-full bg-neutral-900 p-6 shadow-xl">
              <Dialog.Title className="text-lg font-medium text-white">
                Global Settings
              </Dialog.Title>

              {/* ---- Theme toggle ---- */}
              <div className="mt-6">
                <label className="block text-sm text-neutral-300 mb-1">
                  Theme
                </label>
                <select
                  className="w-full rounded bg-neutral-800 p-2 text-sm text-neutral-100"
                  value={globals.theme}
                  onChange={(e) => setGlobals({ theme: e.target.value as any })}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>

              {/* ---- Default fiat ---- */}
              <div className="mt-6">
                <label className="block text-sm text-neutral-300 mb-1">
                  Default currency
                </label>
                <select
                  className="w-full rounded bg-neutral-800 p-2 text-sm text-neutral-100"
                  value={globals.fiat}
                  onChange={(e) => setGlobals({ fiat: e.target.value as any })}
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>JPY</option>
                </select>
              </div>

              {/* ---- API keys section ---- */}
              <div className="mt-6 space-y-4">
                {(
                  [
                    { id: "finnhub", label: "Finnhub API key" },
                    { id: "newsapi", label: "NewsAPI key" },
                  ] as const
                ).map(({ id, label }) => (
                  <label key={id} className="block text-sm text-neutral-300">
                    {label}
                    <input
                      type="text"
                      className="mt-1 w-full rounded bg-neutral-800 p-2 text-sm text-neutral-100"
                      value={globals.apiKeys[id] ?? ""}
                      onChange={(e) => saveApiKey(id, e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

