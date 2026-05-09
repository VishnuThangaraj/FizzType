import { BsDiscord } from "react-icons/bs";
import { IoLogoGithub, IoLogoTwitter } from "react-icons/io5";
import { FaFileContract, FaLock, FaShieldAlt } from "react-icons/fa";

export const footerSectionStyle = "px-2 hover:cursor-pointer hover:text-white";

export const footerSocials = [
  {
    title: "github",
    icon: IoLogoGithub,
    location: "https://github.com/VishnuThangaraj",
  },
  {
    title: "discord",
    icon: BsDiscord,
    location: "https://github.com/VishnuThangaraj",
  },
  {
    title: "twitter",
    icon: IoLogoTwitter,
    location: "https://github.com/VishnuThangaraj",
  },
];

export const footerLegals = [
  {
    title: "terms",
    icon: FaFileContract,
    location: "/terms-of-service",
  },
  {
    title: "security",
    icon: FaShieldAlt,
    location: "/security-policy",
  },
  {
    title: "privacy",
    icon: FaLock,
    location: "/privacy-policy",
  },
];
