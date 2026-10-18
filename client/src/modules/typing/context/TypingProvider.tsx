import React, { useState, useCallback, useMemo, type ReactNode } from "react";
import {
  initialFilterGroupState,
  initialModeState,
  initialTypingState,
} from "../state/initial-typing-state";
import type { FilterGroup, TypingModes } from "../types/typing.types";
import { TypingContext } from "./typing.context";
import type { TypingContextType } from "./typing.types";

export interface TypingProviderProps {
  children: ReactNode;
}

export const TypingProvider: React.FC<TypingProviderProps> = ({ children }) => {
  const [duration, setDuration] = useState<number>(initialTypingState);
  const [typingMode, setTypingMode] = useState<TypingModes>(initialModeState);
  const [filterGroup, setFilterGroup] =
    useState<FilterGroup[]>(initialFilterGroupState);
  const [isTypingStarted, setIsTypingStarted] = useState<boolean>(false);

  const toggleFilterGroup = useCallback((value: FilterGroup) => {
    setFilterGroup((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  }, []);

  const resetTypingStarted = useCallback(() => {
    setIsTypingStarted(false);
  }, []);

  const value: TypingContextType = useMemo(
    () => ({
      duration,
      setDuration,
      typingMode,
      setTypingMode,
      filterGroup,
      setFilterGroup,
      toggleFilterGroup,
      isTypingStarted,
      setIsTypingStarted,
      resetTypingStarted,
    }),
    [
      duration,
      typingMode,
      filterGroup,
      toggleFilterGroup,
      isTypingStarted,
      resetTypingStarted,
    ],
  );

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};
