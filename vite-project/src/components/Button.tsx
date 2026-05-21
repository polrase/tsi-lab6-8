import type { ReactNode } from "react";

type ButtonSize = "small" | "middle" | "large";
type ButtonColor = "primary" | "secondary";
type NativeButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  size: ButtonSize;
  color: ButtonColor;
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: NativeButtonType;
  children?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  small: "px-4 py-2 text-sm",
  middle: "px-5 py-2.5 text-base",
  large: "px-6 py-3 text-lg",
};

const colorClasses: Record<ButtonColor, string> = {
  primary:
    "bg-violet-500 text-white hover:bg-violet-600 focus-visible:ring-violet-300",
  secondary:
    "bg-violet-200 text-violet-900 hover:bg-violet-300 focus-visible:ring-violet-200",
};

export const Button = ({
  size,
  color,
  title,
  onClick,
  disabled = false,
  type = "button",
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-4",
        sizeClasses[size],
        disabled
          ? "cursor-not-allowed bg-slate-300 text-slate-500"
          : colorClasses[color],
      ].join(" ")}
    >
      {children ?? title}
    </button>
  );
};
