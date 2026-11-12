import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  showPassword,
  setShowPassword,
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
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border py-3.5 pr-12 text-sm outline-none transition ${
            Icon ? "pl-11" : "px-4"
          } ${
            isDark
              ? `bg-white/5 text-white placeholder:text-slate-600 ${
                  error
                    ? "border-red-500"
                    : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                }`
              : `bg-white text-slate-900 placeholder:text-slate-400 ${
                  error
                    ? "border-red-500"
                    : "border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                }`
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${
            isDark
              ? "text-slate-500 hover:text-white"
              : "text-slate-400 hover:text-slate-900"
          }`}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
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