import type { ChangeEventHandler, InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  error?: string;
}

export const Input = ({
  value,
  onChange,
  label,
  error,
  disabled = false,
  className = "",
  id,
  ...props
}: InputProps) => {
  const inputId = id ?? props.name;

  return (
    <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
      {label && <span>{label}</span>}
      <input
        id={inputId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={[
          "w-full rounded-xl border px-4 py-3 outline-none transition-colors",
          "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
          disabled && "cursor-not-allowed bg-slate-100 text-slate-400",
          error && "border-red-400 focus:border-red-500 focus:ring-red-200",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  );
};
