import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface IProps {
  generateButtonLabel: string;
  onClick: () => void;
}

export default function ({ generateButtonLabel, onClick }: IProps) {
  return (
    <header className="bg-secondary drop-shadow-1 top-0 flex w-full shadow-sm drop-shadow-sm">
      <div className="flex w-full justify-between sm:block">
        <div className="relative px-6 py-4">
          <button className="absolute top-1/2 left-6 -translate-y-1/2">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          <input
            type="text"
            placeholder="Type to search..."
            className="border-transparent bg-transparent pr-4 pl-9 outline-none focus:border-transparent focus:outline-none focus:ring-[0px]"
            data-ddg-inputtype="unknown"
          />
        </div>
        <div className="mr-6 self-center">
          <button
            className="z-999 bg-primary text-secondary relative rounded-md py-2.5 px-3.5 text-sm font-semibold"
            onClick={onClick}
          >
            {generateButtonLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
