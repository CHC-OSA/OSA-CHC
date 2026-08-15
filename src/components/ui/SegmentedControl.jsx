export default function SegmentedControl({ name, options, value, onChange, labelId }) {
  return (
    <div className="seg" role="radiogroup" aria-labelledby={labelId}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`seg-opt${value === option.value ? " is-checked" : ""}`}
        >
          <input
            type="radio"
            name={name}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
