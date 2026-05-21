import type { ReactNode } from "react";

type TextVariant = "h1" | "h2" | "p";

interface TextProps {
  type: TextVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<TextVariant, string> = {
  h1: "text-4xl font-bold tracking-tight text-slate-900",
  h2: "text-2xl font-semibold text-slate-900",
  p: "text-base leading-7 text-slate-600",
};

export const Text = ({ type, children, className = "" }: TextProps) => {
  const classes = `${variantClasses[type]} ${className}`.trim();

  if (type === "h1") {
    return <h1 className={classes}>{children}</h1>;
  }

  if (type === "h2") {
    return <h2 className={classes}>{children}</h2>;
  }

  return <p className={classes}>{children}</p>;
};
