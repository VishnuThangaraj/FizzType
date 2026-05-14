import { FaSignInAlt } from "react-icons/fa";
import { useState } from "react";

import { AuthHeaderStyle } from "@/features/auth/styles/authStyles";
import InputField from "@/shared/components/formFields/InputField";

import {
  AuthLoginFields,
  ExternalLoginFields,
} from "@/features/auth/constants/loginFields";
import LoginRules from "@/features/auth/validation/loginRules";
import InitialLoginState from "@/features/auth/state/initialLoginState";

import Button from "@/shared/components/formFields/Button";
import Checkbox from "@/shared/components/formFields/Checkbox";

import { handleChangeValidation } from "@/shared/utils/FormFieldValidation";

const LoginForm = () => {
  const [login, setLogin] = useState(InitialLoginState);

  const handleChange = (name, value) => {
    const rules = LoginRules[name];
    if (!handleChangeValidation(value, rules)) return;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[320px]">
      <div className={AuthHeaderStyle}>
        <FaSignInAlt /> login
      </div>
      {/* External Login */}
      <div className="flex gap-3">
        {ExternalLoginFields.map((field) => {
          return (
            <Button
              key={field.name}
              icon={field.icon}
              className="py-2 text-quaternary"
            />
          );
        })}
      </div>
      {/* Divider */}
      <div className="text-center text-quaternary relative text-sm">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[42%] h-[2px] bg-tertiary"></span>
        or
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[42%] h-[2px] bg-tertiary"></span>
      </div>

      {/* Login Fields */}
      {AuthLoginFields.map((field) => {
        return (
          <InputField
            key={field.name}
            field={field}
            value={login[field.name]}
            onChange={handleChange}
            disabled={field.disabled}
            style="w-full"
          />
        );
      })}
      {/* Remember Me Check Box*/}
      <div className="font-bold">
        <Checkbox
          label="remember me"
          checked={login.rememberMe}
          onChange={(val) => handleChange("rememberMe", val)}
        />
      </div>
      <Button type="submit" icon={FaSignInAlt} className="text-primary">
        sign in
      </Button>
      <div className="text-right w-full">
        <a
          href="#"
          className="text-primary text-xs hover:text-primary transition-colors cursor-pointer"
        >
          forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
