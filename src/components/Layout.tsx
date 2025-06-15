import { useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import GlobalDrawer from "./GlobalDrawer";

export default function Layout({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 flex h-12 items-center justify-between
                          bg-neutral-900 px-4 text-neutral-100 shadow-md">
        <h1 className="font-semibold tracking-wide">Market&nbsp;Dashboard</h1>
        <button
          onClick={() => setOpen(true)}
          className="rounded p-1 transition hover:bg-neutral-800"
        >
          <Cog6ToothIcon className="h-6 w-6" />
        </button>
      </header>

      <main className="grid grid-cols-12 gap-4 p-4">{children}</main>

      <GlobalDrawer open={open} setOpen={setOpen} />
    </>
  );
}

