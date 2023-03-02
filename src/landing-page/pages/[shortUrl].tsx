import { GetUrlByShortUrlDtoResponse } from "services/types";
import { getApiUrlShortUrl, postApiUrlHit } from "services/services";
import { useEffect } from "react";

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

  const { id, longUrl }: GetUrlByShortUrlDtoResponse = await getApiUrlShortUrl(
    shortUrl
  );

  if (!id)
    return {
      props: {
        data: {}
      }
    };

  await postApiUrlHit({ urlId: id });

  return {
    props: {
      data: {
        longUrl
      }
    }
  };
}
