import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTypingKeyPress } from "../hooks/use-typing-keypress";
import TestReset from "./TestReset";
import FocusOverlay from "./FocusOverlay";
import { useTheme } from "../../../shared/context";

const INACTIVITY_TIMEOUT_MS = 15000; // 15 seconds

const TypingScreen = () => {
  const { accent } = useTheme();

  const [isFocused, setIsFocused] = useState(true);

  const {
    wordCount,
    letterRefs,
    sampleWords,
    handleTestReset,
    currentIndex,
    typedWords,
    valid,
    invalid,
  } = useTypingKeyPress(isFocused);

  const [scrollOffset, setScrollOffset] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  const typingAreaRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [caretStyle, setCaretStyle] = useState<{
    left: number;
    top: number;
    height: number;
    opacity: number;
    initialized: boolean;
  }>({
    left: 0,
    top: 0,
    height: 0,
    opacity: 0,
    initialized: false,
  });

  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasTypedRef = useRef(false);

  // Inactivity timer handler
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setIsFocused(false);
    }, INACTIVITY_TIMEOUT_MS);
  }, []);

  // Track keypress activity and intercept keydown when overlay is in effect
  useEffect(() => {
    const handleKeyDownCapture = (e: KeyboardEvent) => {
      if (!isFocused) {
        // Overlay is visible: dismiss it without registering the key as typing
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setIsFocused(true);
        resetInactivityTimer();
        return;
      }
      resetInactivityTimer();
    };

    window.addEventListener("keydown", handleKeyDownCapture, true);

    resetInactivityTimer();

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      window.removeEventListener("keydown", handleKeyDownCapture, true);
    };
  }, [isFocused, resetInactivityTimer]);

  const updateCaretPosition = useCallback(() => {
    if (!wordsContainerRef.current) return;
    const container = wordsContainerRef.current;
    const containerRect = container.getBoundingClientRect();

    const currentWord = sampleWords[wordCount.total] || "";
    const isEnd = currentIndex >= currentWord.length;
    const targetIndex = isEnd ? Math.max(0, currentWord.length - 1) : currentIndex;
    const targetKey = `${wordCount.total}-${targetIndex}`;
    const targetEl = letterRefs.current.get(targetKey);

    if (!targetEl) return;

    const letterRect = targetEl.getBoundingClientRect();
    const left = isEnd
      ? letterRect.right - containerRect.left + 1
      : letterRect.left - containerRect.left - 1.5;
    const top = letterRect.top - containerRect.top;
    const height = letterRect.height;

    setCaretStyle({
      left,
      top,
      height,
      opacity: 1,
      initialized: true,
    });
  }, [wordCount.total, currentIndex, sampleWords, letterRefs]);

  const updateDimensionsAndScroll = useCallback(() => {
    const word0 = wordRefs.current.get(0);
    if (!word0) return;

    const y0 = word0.offsetTop;

    let y1: number | null = null;
    let y2: number | null = null;
    let y3: number | null = null;

    for (let i = 1; i < sampleWords.length; i++) {
      const el = wordRefs.current.get(i);
      if (!el) continue;
      const y = el.offsetTop;
      if (y1 === null && y > y0) {
        y1 = y;
      } else if (y1 !== null && y2 === null && y > y1) {
        y2 = y;
      } else if (y2 !== null && y3 === null && y > y2) {
        y3 = y;
        break;
      }
    }

    const lineHeight = y1 !== null ? y1 - y0 : word0.offsetHeight + 16;
    const height3Lines = y3 !== null ? y3 - y0 : lineHeight * 3;

    setContainerHeight(height3Lines);

    const currentWordEl = wordRefs.current.get(wordCount.total);
    if (currentWordEl && y1 !== null) {
      const currentY = currentWordEl.offsetTop;
      if (currentY <= y1) {
        setScrollOffset(0);
      } else {
        setScrollOffset(currentY - y1);
      }
    } else {
      setScrollOffset(0);
    }
  }, [wordCount.total, sampleWords.length]);

  useLayoutEffect(() => {
    updateDimensionsAndScroll();
    updateCaretPosition();
  }, [updateDimensionsAndScroll, updateCaretPosition]);

  useEffect(() => {
    if (currentIndex === 0 && wordCount.total === 0 && !hasTypedRef.current) {
      return;
    }
    hasTypedRef.current = true;
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [currentIndex, wordCount.total]);

  useEffect(() => {
    const handleResize = () => {
      updateDimensionsAndScroll();
      updateCaretPosition();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateDimensionsAndScroll, updateCaretPosition]);

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateDimensionsAndScroll();
        updateCaretPosition();
      });
    }
  }, [updateDimensionsAndScroll, updateCaretPosition]);

  const onReset = useCallback(() => {
    hasTypedRef.current = false;
    setIsTyping(false);
    setIsFocused(true);
    resetInactivityTimer();
    handleTestReset();
  }, [handleTestReset, resetInactivityTimer]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div
        ref={typingAreaRef}
        onClick={() => {
          if (!isFocused) {
            setIsFocused(true);
            resetInactivityTimer();
          }
        }}
        className="relative w-full overflow-hidden select-none"
        style={{
          height: containerHeight ? `${containerHeight}px` : "9.5rem",
        }}
      >
        {/* Focus Overlay */}
        <FocusOverlay
          isFocused={isFocused}
          onFocus={() => {
            setIsFocused(true);
            resetInactivityTimer();
          }}
        />

        <div
          ref={wordsContainerRef}
          className={`relative flex flex-wrap text-3xl tracking-wider gap-x-4 gap-y-4 transition-all duration-300 ease-out ${
            !isFocused ? "blur-[3.5px] opacity-35" : "filter-none opacity-100"
          }`}
          style={{
            transform: `translateY(-${scrollOffset}px)`,
          }}
        >
          {/* Smooth Slim Caret */}
          {isFocused && (
            <div
              className="absolute pointer-events-none z-10"
              style={{
                left: `${caretStyle.left}px`,
                top: `${caretStyle.top + caretStyle.height * 0.08}px`,
                height: `${caretStyle.height * 0.84}px`,
                opacity: caretStyle.opacity,
                transition: caretStyle.initialized
                  ? "left 100ms ease-out, top 100ms ease-out, height 100ms ease-out"
                  : "none",
              }}
            >
              <div
                className={`w-[3px] h-full rounded-full ${
                  !isTyping ? "animate-caret-blink" : ""
                }`}
                style={{
                  backgroundColor: accent,
                }}
              />
            </div>
          )}

          {sampleWords.map((word, index) => {
            const typedWord = typedWords[index] || "";

            return (
              <div
                key={`typing-word-${index}`}
                ref={(el) => {
                  if (el) wordRefs.current.set(index, el);
                  else wordRefs.current.delete(index);
                }}
                className="flex items-center"
              >
                {[...word].map((letter, letterIndex) => {
                  const key = `${index}-${letterIndex}`;
                  const typedChar = typedWord[letterIndex];

                  let letterColor: string | undefined;
                  if (typedChar !== undefined) {
                    letterColor = typedChar === letter ? valid : invalid;
                  }

                  const isClassName =
                    letterColor && letterColor.startsWith("text-");

                  return (
                    <span
                      key={`typing-letter-${key}`}
                      ref={(el) => {
                        if (el) letterRefs.current.set(key, el);
                        else letterRefs.current.delete(key);
                      }}
                      style={
                        letterColor && !isClassName
                          ? { color: letterColor }
                          : undefined
                      }
                      className={isClassName ? letterColor : undefined}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <TestReset handleTestReset={onReset} />
    </div>
  );
};

export default TypingScreen;
