import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  initialFilterGroupState,
  initialModeState,
  initialTypingState,
} from "../state/initial-typing-state";
import type { FilterGroup, TypingModes } from "../types/typing.types";

const useTyping = () => {
  const [capsLock, setCapsLock]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);

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
      if (e.key === "CapsLock") {
        if (!e.repeat) {
          setCapsLock((prev) => !prev);
        }
      } else {
        setCapsLock(e.getModifierState("CapsLock"));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key !== "CapsLock") {
        setCapsLock(e.getModifierState("CapsLock"));
      }
    };

    const handleMouseEvent = (e: MouseEvent) => {
      setCapsLock(e.getModifierState("CapsLock"));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseEvent);
    window.addEventListener("mousemove", handleMouseEvent, { once: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseEvent);
      window.removeEventListener("mousemove", handleMouseEvent);
    };
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
