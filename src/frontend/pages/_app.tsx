import "/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "@next/font/google";
import Header from "components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="URL shortener app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </>
  );
}
