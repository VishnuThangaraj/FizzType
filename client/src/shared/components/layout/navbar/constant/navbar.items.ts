import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { faCrown, faInfo, faGear } from "@fortawesome/free-solid-svg-icons";

export const NavbarItems = [
  {
    name: "home",
    icon: faKeyboard,
    navigation: "/",
  },
  {
    name: "leaderboard",
    icon: faCrown,
    navigation: "/leaderboards",
  },
  {
    name: "about",
    icon: faInfo,
    navigation: "/about",
  },
  {
    name: "settings",
    icon: faGear,
    navigation: "/settings",
  },
];
