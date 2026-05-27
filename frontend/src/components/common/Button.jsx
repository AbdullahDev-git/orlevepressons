export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "font-serif font-bold transition-all duration-200 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

  const variants = {
    primary:
      "bg-accent-500 text-white hover:bg-accent-600 active:scale-95 disabled:bg-gray-400",
    secondary:
      "border-2 border-accent-500 text-accent-500 bg-transparent hover:bg-accent-50 dark:hover:bg-neutral-700 disabled:border-gray-400 disabled:text-gray-400",
    ghost:
      "text-accent-500 bg-transparent hover:bg-accent-50 dark:hover:bg-neutral-700 disabled:text-gray-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-6 py-2.5 text-base rounded-lg",
    lg: "px-8 py-3 text-lg rounded-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
