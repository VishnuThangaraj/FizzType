import {
  faClock,
  faFont,
  faQuoteLeft,
  faMountain,
  faWrench,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import type { TypingModes } from "../types/typing.types";

export interface TypingMode {
  name: TypingModes;
  icon: IconDefinition;
}

export const typingModeList: TypingMode[] = [
  {
    name: "time",
    icon: faClock,
  },
  {
    name: "words",
    icon: faFont,
  },
  {
    name: "quote",
    icon: faQuoteLeft,
  },
  {
    name: "zen",
    icon: faMountain,
  },
  {
    name: "custom",
    icon: faWrench,
  },
];
