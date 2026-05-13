import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

import { AuthHeaderStyle } from "@/features/auth/styles/authStyles";
import InputField from "@/shared/components/formFields/InputField";

import AuthRegisterFields from "@/features/auth/constants/registerFields";
import InitialRegistrationState from "@/features/auth/state/initialRegistrationState";
import RegistrationRules from "@/features/auth/validation/registrationRules";

import { handleChangeValidation } from "@/shared/utils/FormFieldValidation";

const RegistrationForm = () => {
  const [registration, setRegistration] = useState(InitialRegistrationState);

  const handleChange = (name, value) => {
    const rules = RegistrationRules[name];
    if (!handleChangeValidation(value, rules)) return;

    setRegistration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[320px]">
      <div className={AuthHeaderStyle}>
        <FaUserPlus /> register
      </div>
      {AuthRegisterFields.map((field) => {
        return (
          <InputField
            key={field.name}
            field={field}
            value={registration[field.name]}
            onChange={handleChange}
            disabled={field.disabled}
            style="w-full"
          />
        );
      })}
    </div>
  );
};

export default RegistrationForm;
