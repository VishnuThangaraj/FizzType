import { FaSignInAlt } from "react-icons/fa";

import { AuthHeaderStyle } from "@/features/auth/styles/authStyles";
import InputField from "@/shared/components/formFields/InputField";

const LoginForm = () => {
  return (
    <div className={AuthHeaderStyle}>
      <FaSignInAlt /> login
      <InputField />
    </div>
  );
};

export default LoginForm;
