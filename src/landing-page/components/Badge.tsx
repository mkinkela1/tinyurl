import React from "react";

interface IProps {
  label: string;
}

export const Badge: React.FC<IProps> = ({ label }) => (
  <span className="bg-primary text-quaternary ml-2.5 inline-block whitespace-nowrap rounded-[0.27rem] p-1 text-center align-baseline text-[0.75em] font-bold leading-none">
    {label}
  </span>
);
