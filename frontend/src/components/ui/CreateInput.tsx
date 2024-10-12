interface CreateInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export default function CreateInput({
  label,
  type,
  value,
  onChange,
  name,
  placeholder,
  disabled,
  error,
}: CreateInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-theme-text mb-1 transition-colors duration-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-theme-bg text-theme-text transition-colors duration-300 ${
          error ? "border-red-500" : "border-theme-text/30"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
