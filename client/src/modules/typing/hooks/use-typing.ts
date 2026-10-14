import { useState, type Dispatch, type SetStateAction } from "react";
import {
  initialFilterGroupState,
  initialModeState,
  initialTypingState,
} from "../state/initial-typing-state";
import type { FilterGroup, TypingModes } from "../types/typing.types";

const useTyping = () => {
  const [duration, setDuration]: [number, Dispatch<SetStateAction<number>>] =
    useState(initialTypingState);

  const [typingMode, setTypingMode]: [
    TypingModes,
    Dispatch<SetStateAction<TypingModes>>,
  ] = useState(initialModeState);

  const [filterGroup, setFilterGroup]: [
    FilterGroup,
    Dispatch<SetStateAction<FilterGroup>>,
  ] = useState(initialFilterGroupState);

  return {
    // state
    duration,
    setDuration,
    typingMode,
    setTypingMode,
    filterGroup,
    setFilterGroup,
  };
};

export default useTyping;
