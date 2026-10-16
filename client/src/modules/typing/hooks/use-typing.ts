import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  initialFilterGroupState,
  initialModeState,
  initialTypingState,
} from "../state/initial-typing-state";
import type { FilterGroup, TypingModes } from "../types/typing.types";

const useTyping = () => {
  const [capsLock, setCapsLock]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(true);

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

  // Detect Caps lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setCapsLock(e.getModifierState("CapsLock"));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // toggle filter group
  const toggleFilterGroup = (value: FilterGroup) => {
    if (filterGroup.indexOf(value) === -1) {
      setFilterGroup((prev) => [...prev, value]);
    } else {
      setFilterGroup((prev) => prev.filter((item) => item !== value));
    }
  };

  // reset the current test
  const handleTestReset = () => {
    return "";
  };

  return {
    // state
    capsLock,
    duration,
    setDuration,
    typingMode,
    setTypingMode,
    filterGroup,
    setFilterGroup,

    // function
    toggleFilterGroup,
    handleTestReset,
  };
};

export default useTyping;
