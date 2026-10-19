import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { TypingCount } from "../types/typing.types";
import { initialTypingCountState } from "../state/initial-typing-state";

import { sampleWords } from "../../../shared/data/sample-words.data";
import { useTheme } from "../../../shared/context";

export const useTypingKeyPress = (isFocused: boolean = true) => {
  const { tertiary, invalid } = useTheme();
  const valid = tertiary;

  const letterRefs = useRef(new Map<string, HTMLSpanElement>());

  const [wordCount, setWordCount]: [
    TypingCount,
    Dispatch<SetStateAction<TypingCount>>,
  ] = useState(initialTypingCountState);

  const [letterCount, setLetterCount]: [
    TypingCount,
    Dispatch<SetStateAction<TypingCount>>,
  ] = useState(initialTypingCountState);

  const [currentKey, setCurrentKey] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<Record<number, string>>({});

  const handleUpdateKeyPress = useCallback(
    (letter: string) => {
      const currentWord = sampleWords[wordCount?.total] || "";
      if (currentIndex >= currentWord.length) return;

      const isCorrect = currentWord[currentIndex] === letter;

      setLetterCount((prev) => ({
        total: prev.total + 1,
        correct: isCorrect ? prev.correct + 1 : prev.correct,
      }));

      setTypedWords((prev) => ({
        ...prev,
        [wordCount.total]: (prev[wordCount.total] || "") + letter,
      }));

      setCurrentIndex((prev) => prev + 1);
    },
    [wordCount, currentIndex],
  );

  const handleBackspacePress = useCallback(() => {
    if (currentIndex > 0) {
      setTypedWords((prev) => {
        const currentTyped = prev[wordCount.total] || "";
        return {
          ...prev,
          [wordCount.total]: currentTyped.slice(0, -1),
        };
      });
      setCurrentIndex((prev) => prev - 1);
    }
  }, [wordCount, currentIndex]);

  const handleSpacePress = useCallback(() => {
    if (currentIndex > 0 && wordCount.total < sampleWords.length - 1) {
      setWordCount((prev) => ({
        total: prev.total + 1,
        correct: prev.correct + 1,
      }));
      setCurrentIndex(0);
    }
  }, [currentIndex, wordCount]);

  // Detect keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (!isFocused) return;

      if (/^[a-z]$/.test(e.key)) {
        setCurrentKey(e.key);
        handleUpdateKeyPress(e.key);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspacePress();
      } else if (e.key === " ") {
        e.preventDefault();
        handleSpacePress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, handleUpdateKeyPress, handleBackspacePress, handleSpacePress]);

  // reset the current test
  const handleTestReset = useCallback(() => {
    setWordCount(initialTypingCountState);
    setLetterCount(initialTypingCountState);
    setCurrentIndex(0);
    setCurrentKey("");
    setTypedWords({});
  }, []);

  return {
    // refs
    letterRefs,

    //state
    wordCount,
    currentKey,
    letterCount,
    currentIndex,
    typedWords,

    // data
    sampleWords,

    // styling classes
    valid,
    invalid,

    handleTestReset,
  };
};
