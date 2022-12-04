import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");

  return <input value={url} onChange={(e) => setUrl(e.target.value)} />;
}
