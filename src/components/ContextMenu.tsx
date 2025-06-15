import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";

export default function ContextMenu({ children }: React.PropsWithChildren) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button as={Fragment}>{children}</Menu.Button>
      <Menu.Items
        className="absolute right-0 mt-2 w-48 origin-top-right rounded-md
                   bg-neutral-700 p-1 shadow-lg ring-1 ring-black/20 focus:outline-none"
      >
        {["Configure Symbols", "Change Data Source", "Refresh Rate…"].map(
          (item) => (
            <Menu.Item key={item}>
              {({ active }) => (
                <button
                  className={clsx(
                    "block w-full rounded px-3 py-2 text-left text-sm",
                    active ? "bg-neutral-600 text-white" : "text-neutral-200"
                  )}
                  onClick={() => alert(`TODO: ${item}`)}
                >
                  {item}
                </button>
              )}
            </Menu.Item>
          )
        )}
      </Menu.Items>
    </Menu>
  );
}

