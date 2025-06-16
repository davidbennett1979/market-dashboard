// src/components/GlobalDrawer.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePrefs } from "@/store/prefs";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function GlobalDrawer({ open, setOpen }: Props) {
  const { globals, setGlobals } = usePrefs();

  /* local draft inputs for each provider */
  const [draft, setDraft] = useState<Record<string, string>>({});

  const providers = ["finnhub", "newsapi", "polygon"] as const;

  const handleChange = (id: string, v: string) =>
    setDraft((d) => ({ ...d, [id]: v }));

  const saveKey = async (id: string) => {
    const key = draft[id];
    if (!key) return;

    await fetch("/api/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: id, key }),
    });

    /* store only boolean flag */
    setGlobals({ apiKeys: { ...globals.apiKeys, [id]: true } });
    setDraft((d) => ({ ...d, [id]: "" })); // clear visible value
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        {/* overlay */}
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

        {/* sliding panel */}
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
            <Dialog.Panel className="h-full w-full overflow-y-auto bg-neutral-900 p-6 shadow-xl">
              <Dialog.Title className="text-lg font-medium text-white">
                Global Settings
              </Dialog.Title>

              {/* --- Theme toggle --- */}
              <div className="mt-6">
                <label className="mb-1 block text-sm text-neutral-300">
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

              {/* --- Default fiat --- */}
              <div className="mt-6">
                <label className="mb-1 block text-sm text-neutral-300">
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

              {/* --- API keys section --- */}
              <div className="mt-6 space-y-4">
                {providers.map((id) => (
                  <div key={id}>
                    <label className="block text-sm text-neutral-300">
                      {id.toUpperCase()} API key
                    </label>

                    {globals.apiKeys[id] ? (
                      /* already saved */
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-green-400">✔ saved</span>
                        <button
                          onClick={() =>
                            setGlobals({
                              apiKeys: { ...globals.apiKeys, [id]: false },
                            })
                          }
                          className="text-xs text-neutral-400 underline"
                        >
                          reset
                        </button>
                      </div>
                    ) : (
                      /* input + save button */
                      <div className="mt-1 flex gap-2">
                        <input
                          className="flex-1 rounded bg-neutral-800 p-2 text-sm text-neutral-100"
                          type="text"
                          value={draft[id] ?? ""}
                          onChange={(e) => handleChange(id, e.target.value)}
                        />
                        <button
                          onClick={() => saveKey(id)}
                          className="rounded bg-blue-600 px-3 text-sm hover:bg-blue-500"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

