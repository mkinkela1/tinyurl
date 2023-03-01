import { Head, Html, Main, NextScript } from "next/document";
import NotificationContextProvider from "context/ToastContext";

export default function Document() {
  return (
    <NotificationContextProvider>
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </NotificationContextProvider>
  );
}
