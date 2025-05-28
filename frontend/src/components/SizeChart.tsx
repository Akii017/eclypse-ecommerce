import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface SizeChartProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeChartData = [
  {
    size: "XS",
    uk: "6",
    us: "2",
    chest: { inches: "32-34", cm: "81-86" },
    waist: { inches: "24-26", cm: "61-66" },
    hips: { inches: "34-36", cm: "86-91" },
  },
  {
    size: "S",
    uk: "8",
    us: "4",
    chest: { inches: "34-36", cm: "86-91" },
    waist: { inches: "26-28", cm: "66-71" },
    hips: { inches: "36-38", cm: "91-96" },
  },
  {
    size: "M",
    uk: "10",
    us: "6",
    chest: { inches: "36-38", cm: "91-96" },
    waist: { inches: "28-30", cm: "71-76" },
    hips: { inches: "38-40", cm: "96-101" },
  },
  {
    size: "L",
    uk: "12",
    us: "8",
    chest: { inches: "38-40", cm: "96-101" },
    waist: { inches: "30-32", cm: "76-81" },
    hips: { inches: "40-42", cm: "101-106" },
  },
  {
    size: "XL",
    uk: "14",
    us: "10",
    chest: { inches: "40-42", cm: "101-106" },
    waist: { inches: "32-34", cm: "81-86" },
    hips: { inches: "42-44", cm: "106-111" },
  },
];

export default function SizeChart({ isOpen, onClose }: SizeChartProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900 mb-6"
                    >
                      Size Guide
                    </Dialog.Title>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                            >
                              Size
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              UK
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              US
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Chest
                              <br />
                              <span className="font-normal text-gray-500">
                                inches (cm)
                              </span>
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Waist
                              <br />
                              <span className="font-normal text-gray-500">
                                inches (cm)
                              </span>
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Hips
                              <br />
                              <span className="font-normal text-gray-500">
                                inches (cm)
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {sizeChartData.map((size) => (
                            <tr key={size.size}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                {size.size}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {size.uk}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {size.us}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {size.chest.inches}
                                <br />
                                <span className="text-xs">
                                  ({size.chest.cm})
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {size.waist.inches}
                                <br />
                                <span className="text-xs">
                                  ({size.waist.cm})
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {size.hips.inches}
                                <br />
                                <span className="text-xs">
                                  ({size.hips.cm})
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 text-sm text-gray-500">
                      <p>How to measure:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          Chest: Measure around the fullest part of your chest,
                          keeping the tape horizontal.
                        </li>
                        <li>
                          Waist: Measure around your natural waistline, keeping
                          the tape comfortably loose.
                        </li>
                        <li>
                          Hips: Measure around the fullest part of your hips,
                          keeping the tape horizontal.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
