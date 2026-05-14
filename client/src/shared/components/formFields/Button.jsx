import {
  InputFieldBaseStyles,
  InputButtonBaseStyle,
} from "@/shared/components/formFields/styles/formFieldsStyle";

import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      name,
      icon: Icon,
      disabled = false,
      onClick,
      type = "button",
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`${InputFieldBaseStyles} ${InputButtonBaseStyle} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {Icon && <Icon className="text-xl" />}
        {children || (name ? <span>{name}</span> : "")}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
