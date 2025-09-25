// src/components/button.tsx

import * as React from "react";
import { cn } from "@/utils/helpers";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          "bg-[#0A2A45] text-white hover:opacity-90",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

