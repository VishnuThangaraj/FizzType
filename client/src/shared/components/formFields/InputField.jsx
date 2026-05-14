import { InputFieldBaseStyles } from "@/shared/components/formFields/styles/formFieldsStyle";

const InputField = ({
  field,
  value,
  onChange,
  disabled = false,
  style = "w-full",
}) => {
  return (
    <div className={style}>
      <input
        type={field?.type || "text"}
        value={value ?? ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        disabled={disabled}
        placeholder={field?.placeholder}
        className={`${InputFieldBaseStyles} text-quaternary w-full`}
      />
    </div>
  );
};

export default InputField;
