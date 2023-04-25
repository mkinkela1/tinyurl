import React from "react";

type BtnStyle = "primary" | "secondary" | "tertiary";

interface IProps {
  onClick: () => void;
  disabled?: boolean;
  buttonStyle?: BtnStyle;
  label: string | React.ReactNode;
}

const Button: React.FC<IProps> = ({
  onClick,
  disabled,
  buttonStyle = "primary",
  label
}) => {
  const style: Record<BtnStyle, string> = {
    primary: `z-999 ${
      disabled ? "bg-gray-500" : "bg-primary"
    } text-secondary relative rounded-md py-2.5 px-3.5 text-sm font-semibold m-2`,
    secondary: `z-999 bg-secondary text-primary border-solid border border-primary relative rounded-md py-2.5 px-3.5 text-sm font-semibold m-2`,
    tertiary: `z-999 bg-transparent text-primary underline relative rounded-md py-2.5 px-3.5 text-sm font-semibold m-2`
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={style[buttonStyle]}
    >
      {label}
    </button>
  );
};

export default Button;
