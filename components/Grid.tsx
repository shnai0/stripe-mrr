import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

const statuses = {
  Active: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};
const clients = [
  {
    id: 1,
    name: "Y Combinator",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/256px-Y_Combinator_logo.svg.png",
    lastInvoice: {
      date: "150k",
      dateTime: "2022-12-13",
      amount: "$150,000.00",
      status: "Active",
    },
  },
  {
    id: 2,
    name: "500 Startups",
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:916/0*vUGBITJf3bUoAw2F.png",
    lastInvoice: {
      date: "150k",
      dateTime: "2023-01-22",
      amount: "$150,000.00",
      status: "Active",
    },
  },
  {
    id: 3,
    name: "Antler",
    imageUrl:
      "https://assets-global.website-files.com/62d6de70dd9e54fe5d03255a/637e5a0a602973f61644f12d_6345cb0762418868962fca92_gita-lalloo-antler-vc-profile-image.png",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "150k",
      amount: "$150,600.00",
      status: "Active",
    },
  },
  {
    id: 3,
    name: "Techstars",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1238215994918699009/20iXbanG_400x400.png",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "150k",
      amount: "$7,600.00",
      status: "Active",
    },
  },
  {
    id: 3,
    name: "Seedcamp",
    imageUrl:
      "https://seedcamp.com/wp-content/themes/seedcamp/seedcamp_share_image.png",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "150k",
      amount: "$7,600.00",
      status: "Active",
    },
  },
  {
    id: 3,
    name: "Accel Partners",
    imageUrl:
      "https://assets-global.website-files.com/5f217a8e6bc2c8058e803083/5f21e89363ca09add20ffd1b_accel-open_graph2.png",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "150k",
      amount: "$7,600.00",
      status: "Active",
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Grid() {
  return (
    <div className="bg-gray-900  sm:py-32 lg:px-8 ">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-lg leading-8 text-gray-100">
          More VC investing worldwide
        </p>
      </div>

      <ul
        role="list"
        className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 mt-4"
      >
        {clients.map((client) => (
          <li
            key={client.id}
            className="overflow-hidden rounded-xl border border-gray-600"
          >
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-800 p-6">
              <img
                src={client.imageUrl}
                alt={client.name}
                className="h-12 w-12 flex-none rounded-lg  object-cover ring-1 ring-gray-900/10"
              />
              <div className="text-sm font-medium leading-6 text-gray-200">
                {client.name}
              </div>
              <Menu as="div" className="relative ml-auto">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Open options</span>
                  <EllipsisHorizontalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          View<span className="sr-only">, {client.name}</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Send Deck
                          <span className="sr-only">, {client.name}</span>
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Amount</dt>
                <dd className="text-gray-700">
                  <time dateTime={client.lastInvoice.dateTime}>
                    {client.lastInvoice.date}
                  </time>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Status</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="font-medium text-gray-900">
                    {client.lastInvoice.amount}
                  </div>
                  <div
                    className={classNames(
                      statuses[client.lastInvoice.status],
                      "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {client.lastInvoice.status}
                  </div>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
