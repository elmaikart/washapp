import React from "react";
import { cn } from "@/lib/utils"; // si no tenés utils, podés borrar el uso de cn()

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-wash-primary text-white py-2 px-4 rounded hover:bg-wash-primary/90",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
