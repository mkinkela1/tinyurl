import "../globals.css";
import NotificationContextProvider from "context/ToastContext";
import NotificationsList from "components/NotificationsList";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <NotificationContextProvider>
        <Component {...pageProps} />
        <NotificationsList />
      </NotificationContextProvider>
    </>
  );
}
