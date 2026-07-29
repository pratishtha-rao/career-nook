"use client";

type Props = {
  title?: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export default function FilterBar({
  title,
  options,
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          {title}
        </h3>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange("All")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            value === "All"
              ? "bg-blue-600 text-white"
              : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          All
        </button>

        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              value === option
                ? "bg-blue-600 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}