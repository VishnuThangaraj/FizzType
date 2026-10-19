import {
  faFileContract,
  faShieldAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const FooterSocials = [
  {
    name: "github",
    icon: faGithub,
    url: "https://github.com/VishnuThangaraj",
  },
  {
    name: "linkedin",
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/vishnuthangaraj",
  },
  {
    name: "twitter",
    icon: faTwitter,
    url: "https://x.com/im_vishnu_t",
  },
];

export const FooterLinks = [
  {
    name: "terms",
    icon: faFileContract,
    navigation: "/terms-of-service",
  },
  {
    name: "security",
    icon: faShieldAlt,
    navigation: "/security-policy",
  },
  {
    name: "privacy",
    icon: faLock,
    navigation: "/privacy-policy",
  },
];
