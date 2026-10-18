import type { Dispatch, SetStateAction } from "react";
import type { FilterGroup, TypingModes } from "../types/typing.types";

export interface TypingContextType {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  typingMode: TypingModes;
  setTypingMode: Dispatch<SetStateAction<TypingModes>>;
  filterGroup: FilterGroup[];
  setFilterGroup: Dispatch<SetStateAction<FilterGroup[]>>;
  toggleFilterGroup: (value: FilterGroup) => void;
  isTypingStarted: boolean;
  setIsTypingStarted: Dispatch<SetStateAction<boolean>>;
  resetTypingStarted: () => void;
}
