import "../globals.css";
import NotificationContextProvider from "context/ToastContext";
import NotificationsList from "components/NotificationsList";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NotificationContextProvider>
        <Component {...pageProps} />
        <NotificationsList />
      </NotificationContextProvider>
    </>
  );
}
