import { FaGoogle, FaGithub } from "react-icons/fa";

export const AuthLoginFields = [
  {
    name: "email",
    placeholder: "email",
  },
  {
    name: "password",
    placeholder: "password",
    type: "password",
  },
];

export const ExternalLoginFields = [
  {
    name: "google",
    icon: FaGoogle,
  },
  {
    name: "github",
    icon: FaGithub,
  },
];
