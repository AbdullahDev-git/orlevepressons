export default function Textarea({
  label,
  placeholder = "",
  value,
  onChange,
  error = "",
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  ...props
}) {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-lg font-sans text-base transition-colors duration-200 bg-white dark:bg-neutral-600 dark:text-neutral-100 text-neutral-800 placeholder-neutral-500 dark:placeholder-neutral-400 resize-none ${
          error
            ? "border-red-500 focus:border-red-600 focus:outline-none"
            : "border-neutral-300 dark:border-neutral-500 focus:border-accent-500 focus:outline-none"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
