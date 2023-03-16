import { useEffect } from "react";
import Api from "api-calls/Api";

export default function ({ data: { longUrl } }) {
  useEffect(() => {
    if (longUrl)
      window.location.replace(
        longUrl.startsWith("http") ? longUrl : `https://${longUrl}`
      );
  }, []);

  return longUrl ? <></> : <h1>Requested link not found</h1>;
}

export async function getServerSideProps({ query }) {
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

  await Api.urlHitControllerCreate({ urlId: id });

  return {
    props: {
      data: {
        longUrl
      }
    }
  };
}
