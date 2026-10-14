import {
  faAt,
  faHashtag,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import type { FilterGroup } from "../types/typing.types";

interface TypingFilter {
  name: FilterGroup;
  icon: IconDefinition;
}

export const typingFilterList: TypingFilter[] = [
  {
    name: "punctuation",
    icon: faAt,
  },
  {
    name: "numbers",
    icon: faHashtag,
  },
];
