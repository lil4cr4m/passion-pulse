import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

const Button = ({ children, className, variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline:
      "border-2 border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600",
    danger: "bg-rose-500 text-white hover:bg-rose-600",
  };

  return (
    <button
      className={twMerge(
        clsx(
          "px-4 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 active:scale-95",
          variants[variant],
          className,
        ),
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
