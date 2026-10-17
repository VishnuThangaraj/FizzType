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
    FilterGroup[],
    Dispatch<SetStateAction<FilterGroup[]>>,
  ] = useState(initialFilterGroupState);

  // toggle filter group
  const toggleFilterGroup = (value: FilterGroup) => {
    if (filterGroup.indexOf(value) === -1) {
      setFilterGroup((prev) => [...prev, value]);
    } else {
      setFilterGroup((prev) => prev.filter((item) => item !== value));
    }
  };

  return {
    // state
    duration,
    setDuration,
    typingMode,
    setTypingMode,
    filterGroup,
    setFilterGroup,

    toggleFilterGroup,
  };
};

export default useTyping;
