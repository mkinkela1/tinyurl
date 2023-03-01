import { GetUrlByShortUrlDtoResponse } from "services/types";
import { getApiUrlShortUrl } from "services/services";
import { useEffect } from "react";

export default function ({ data: { longUrl } }) {
  useEffect(() => {
    window.location.replace(
      longUrl.startsWith("http") ? longUrl : `https://${longUrl}`
    );
  }, []);

  return <h1>Requested link not found</h1>;
}

export async function getServerSideProps({ query }) {
  const shortUrl: string = query.shortUrl as string;

  console.log(shortUrl);

  const { longUrl }: GetUrlByShortUrlDtoResponse = await getApiUrlShortUrl(
    shortUrl
  );

  console.log(longUrl);

  return {
    props: {
      data: {
        longUrl
      }
    }
  };
}
