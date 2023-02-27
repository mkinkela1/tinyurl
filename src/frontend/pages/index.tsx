import { LinkIcon } from "@heroicons/react/20/solid";
import TopMenu from "components/TopMenu";

export default function Home() {
  return (
    <>
      <TopMenu />
      <div className="bg-primary min-h-[400px] w-full"></div>
      <div className="bg-secondary h-25 mx-auto -mt-[50px] flex max-w-7xl items-center justify-between rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
        <div className="relative w-full rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">
              <LinkIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <input
            type="text"
            name="url"
            id="url"
            className="block w-full rounded-md border-gray-300 pl-10 pr-12 focus:outline-none"
            placeholder="https://www.google.com"
          />
          <button className="bg-primary absolute inset-y-0 right-0 flex cursor-pointer items-center rounded-md p-2.5 pl-3">
            <span className="px-2.5 text-white sm:text-sm">Short it!</span>
          </button>
        </div>
      </div>
    </>
  );
}
