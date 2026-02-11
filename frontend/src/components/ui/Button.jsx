import { twMerge } from "tailwind-merge";

export const Button = ({
  children,
  variant = "yellow",
  className,
  ...props
}) => {
  const variants = {
    yellow: "bg-yellow text-ink hover:bg-[#e6bd00]",
    violet: "bg-violet text-white hover:bg-[#8f47ff]",
    pink: "bg-pink text-white hover:bg-[#e632e6]",
    cyan: "bg-cyan text-ink hover:bg-[#00c9e6]",
    outline: "bg-white text-ink hover:bg-slate-50",
  };

  return (
    <button
      className={twMerge(
        "border-3 border-ink px-6 py-3 font-black rounded-xl transition-all",
        "shadow-brutal active:translate-x-[3px] active:translate-y-[3px] active:shadow-brutal-sm",
        "uppercase tracking-tight flex items-center justify-center gap-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
