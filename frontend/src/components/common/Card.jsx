export default function Card({
  children,
  className = "",
  hover = false,
  shadow = "md",
}) {
  const shadowStyles = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg ${shadowStyles[shadow]} ${hover ? "hover:shadow-lg transition-shadow duration-300" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
