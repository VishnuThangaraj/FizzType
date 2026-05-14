import { FaCheck } from "react-icons/fa";

const Checkbox = ({ label, checked, onChange, disabled = false }) => {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`w-5 h-5 rounded bg-tertiary flex items-center justify-center transition-all duration-200 border-2 ${
            checked ? "border-accent" : "border-transparent"
          }`}
        >
          {checked && <FaCheck className="text-accent text-xs" />}
        </div>
      </div>
      {label && <span className="text-quaternary text-sm">{label}</span>}
    </label>
  );
};

export default Checkbox;
