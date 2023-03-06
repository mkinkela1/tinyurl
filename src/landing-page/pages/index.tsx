import {
  ChartBarIcon,
  DocumentDuplicateIcon,
  QrCodeIcon
} from "@heroicons/react/24/outline";
import { LinkIcon } from "@heroicons/react/20/solid";
import TopMenu from "components/TopMenu";
import { useContext, useRef, useState } from "react";
import { postApiUrl } from "services/services";
import { CreateUrlDtoResponse } from "services/types";
import Link from "next/link";
import { NotificationContext } from "context/ToastContext";

export default function Home() {
  const urlRef = useRef(null);
  const [data, setData] = useState<CreateUrlDtoResponse>(null);
  const { onInfo, onSuccess, onError } = useContext(NotificationContext);

  const generateShortUrl = async () => {
    try {
      const res = await postApiUrl({ longUrl: urlRef.current.value });

      urlRef.current.value = null;
      setData(res);

      onSuccess("Short url successfully created");
    } catch (e) {
      onError("Error creating short url");
    }
  };

  const getShortUrl = () => `http://localhost:3000/${data?.shortUrl}`;

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(getShortUrl());

      onInfo("Short url copied");
    } catch (e) {
      onError("Error copying url");
    }
  };

  return (
    <>
      <TopMenu />
      <div className="bg-primary min-h-[400px] w-full">
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-32 lg:py-48">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                More than just shorter links
              </h1>
              <p className="mt-6 text-lg leading-8 text-white">
                Build your brand&apos;s recognition and get detailed insights on
                how your links are performing.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="#"
                  className="rounded-md border border-white bg-transparent px-3.5 py-2.5 text-lg font-semibold text-white "
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary h-25 flex-column mx-auto -mt-[50px] max-w-7xl items-center justify-between rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
        <div className="relative w-full rounded-md shadow-sm outline-none focus:ring-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">
              <LinkIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <input
            ref={urlRef}
            type="text"
            name="url"
            id="url"
            className="block w-full rounded-md pl-10 pr-12 outline-none focus:border-gray-500 focus:outline-none focus:ring-[0px]"
            placeholder="https://www.google.com"
          />
          <button
            className="bg-primary absolute inset-y-0 right-0 flex cursor-pointer items-center rounded-md p-2.5 pl-3"
            onClick={generateShortUrl}
          >
            <span className="px-2.5 text-white sm:text-sm">Short it!</span>
          </button>
        </div>
        {data?.id && (
          <div className="mt-10 flex w-full flex-row justify-between sm:flex-col">
            <div className="flex flex-col gap-2.5">
              <p className="mt-1 text-base text-gray-600">{data?.longUrl}</p>
              <Link
                className="text-decoration-underline text-primary text-base"
                href={getShortUrl()}
              >
                {data?.shortUrl}
              </Link>
            </div>
            <div className="flex justify-end sm:justify-center">
              <button
                type="button"
                className="text-primary p-2.5"
                onClick={copyToClipboard}
              >
                <div className="flex">
                  <DocumentDuplicateIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                  copy
                </div>
              </button>
              <button type="button" className="text-primary p-2.5">
                <div className="flex">
                  <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
                  stats
                </div>
              </button>
              <button type="button" className="text-primary p-2.5">
                <div className="flex">
                  <QrCodeIcon className="h-6 w-6" aria-hidden="true" />
                  QR code
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
