import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function GlobalDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
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
            <Dialog.Panel className="h-full bg-neutral-900 p-6 shadow-xl">
              <Dialog.Title className="text-lg font-medium text-white">
                Settings
              </Dialog.Title>
              <p className="mt-4 text-sm text-neutral-400">
                Global options will live here later – for now, just chrome.
              </p>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

