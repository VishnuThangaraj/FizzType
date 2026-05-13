const RegistrationRules = {
  username: {
    type: "string",
    minLength: 3,
    maxLength: 25,
    pattern: /^[A-Za-z0-9\s-]+$/,
  },
  email: {
    type: "email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  verifyEmail: {
    type: "email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: "string",
    minLength: 6,
  },
  verifyPassword: {
    type: "string",
    minLength: 6,
  },
};

export default RegistrationRules;
