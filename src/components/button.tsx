import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  full?: boolean;
};

export default function Button({
  variant = "primary",
  full,
  className = "",
  ...props
}: Props) {
  const base = "btn";
  const map = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "text-wash-primary px-3 py-2",
  } as const;

  return (
    <button
      className={`${base} ${map[variant]} ${full ? "w-full" : ""} ${className}`}
      {...props}
    />
  );
}
