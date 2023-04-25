import React from "react";
import Link from "next/link";

interface IProps {
  value?: string;
}

const UrlCell: React.FC<IProps> = ({ value }) => {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const url = `${origin}/${value}`;
  return <Link href={url}>{value}</Link>;
};

export default UrlCell;
