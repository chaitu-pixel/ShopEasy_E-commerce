export default function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  variant = "light",
  icon: Icon,
}) {
  const isDark = variant === "dark";

  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-2 block text-sm font-semibold ${
          isDark ? "text-slate-200" : "text-slate-700"
        }`}
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          />
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border py-3.5 text-sm outline-none transition ${
            Icon ? "pl-11" : "px-4"
          } ${
            isDark
              ? `bg-white/5 text-white placeholder:text-slate-600 ${
                  error
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                }`
              : `bg-white text-slate-900 placeholder:text-slate-400 ${
                  error
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                }`
          }`}
        />
      </div>

      {error && (
        <p
          className={`mt-2 text-xs font-medium ${
            isDark ? "text-red-400" : "text-red-500"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
}