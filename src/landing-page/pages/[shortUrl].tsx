import { useEffect } from "react";
import Api from "api-calls/Api";
import geoip from "geoip-lite";

export default function ({ data: { longUrl } }) {
  useEffect(() => {
    if (longUrl)
      window.location.replace(
        longUrl.startsWith("http") ? longUrl : `https://${longUrl}`
      );
  }, []);

  return longUrl ? <></> : <h1>Requested link not found</h1>;
}

export async function getServerSideProps({ query, req }) {
  const shortUrl: string = query.shortUrl as string;

  const {
    data: { id, longUrl }
  } = await Api.urlControllerGetUrlByShortUrl(shortUrl);

  if (!id)
    return {
      props: {
        data: {}
      }
    };

  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;

  const geo = geoip.lookup(ip);
  const country: string = geo?.country || "Unknown";

  console.log(geo);

  await Api.urlHitControllerCreate({ urlId: id, country });

  return {
    props: {
      data: {
        longUrl
      }
    }
  };
}
