import * as React from "react";
import { cn } from "@/lib/utils"; // Si no tenés utils, podés reemplazar cn(...) por template literals normales

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-blue-100 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm",
                    "focus-visible:outline-none focus:ring-2 focus:ring-wash-primary/40 focus:border-wash-primary",
                    "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
