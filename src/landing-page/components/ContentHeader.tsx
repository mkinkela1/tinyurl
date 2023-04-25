import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDebounce } from "hooks/useDebounce";
import { useRouter } from "next/router";
import Button from "components/Button";
import { SHORT_URLS, SHORT_URLS_NEW } from "constants/Routes";

interface IProps {
  generateButtonLabel: string;
}

export default function ({ generateButtonLabel }: IProps) {
  const [search, setSearch] = useState<string>(null);
  const debouncedSearch = useDebounce({ value: search, delay: 500 });
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;

    router.push({
      pathname,
      query: { search: debouncedSearch }
    });
  }, [debouncedSearch]);

  const generateButtonUrls = useMemo<Record<string, string>>(
    () => ({ [SHORT_URLS]: SHORT_URLS_NEW }),
    []
  );
  const location = router.pathname.slice("/dashboard".length);
  const generateButtonUrl = generateButtonUrls[location] ?? "";

  console.log(generateButtonUrls);

  return (
    <header className="bg-secondary drop-shadow-1 sticky top-0 z-50 flex w-full shadow-sm drop-shadow-sm">
      <div className="flex w-full justify-between sm:block">
        <div className="relative px-6 py-4">
          <button className="absolute top-1/2 left-6 -translate-y-1/2">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          <input
            value={search}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
              setSearch(value)
            }
            type="text"
            placeholder="Type to search..."
            className="border-transparent bg-transparent pr-4 pl-9 outline-none focus:border-transparent focus:outline-none focus:ring-[0px]"
            data-ddg-inputtype="unknown"
          />
        </div>
        <div className="mr-6 self-center">
          <Button
            onClick={() => router.push(`/dashboard/${location}/new`)}
            label={generateButtonLabel}
          />
        </div>
      </div>
    </header>
  );
}
