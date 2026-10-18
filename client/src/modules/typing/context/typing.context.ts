import { createContext, useContext } from "react";
import type { TypingContextType } from "./typing.types";
import {
  initialFilterGroupState,
  initialModeState,
  initialTypingState,
} from "../state/initial-typing-state";

export const TypingContext = createContext<TypingContextType>({
  duration: initialTypingState,
  setDuration: () => {},
  typingMode: initialModeState,
  setTypingMode: () => {},
  filterGroup: initialFilterGroupState,
  setFilterGroup: () => {},
  toggleFilterGroup: () => {},
  isTypingStarted: false,
  setIsTypingStarted: () => {},
  resetTypingStarted: () => {},
});

export const useTypingContext = (): TypingContextType => {
  return useContext(TypingContext);
};
