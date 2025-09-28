import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 rounded-full outline-none ${props.className}`}
    />
  );
}
