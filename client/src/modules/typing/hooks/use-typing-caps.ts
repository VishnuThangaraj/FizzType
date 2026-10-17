import { useEffect, useState, type Dispatch, type SetStateAction } from "react";


export const useTypingCaps = () => {
  const [capsLock, setCapsLock]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);

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

  return { capsLock };
};
