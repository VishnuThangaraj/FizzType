import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTypingKeyPress } from "../hooks/use-typing-keypress";
import TestReset from "./TestReset";

const TypingScreen = () => {
  const {
    wordCount,
    letterRefs,
    sampleWords,
    handleTestReset,
    currentIndex,
    typedWords,
    valid,
    invalid,
  } = useTypingKeyPress();

  const [scrollOffset, setScrollOffset] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  const wordRefs = useRef<Map<number, HTMLDivElement>>(new Map());

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
  }, [updateDimensionsAndScroll]);

  useEffect(() => {
    const handleResize = () => {
      updateDimensionsAndScroll();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateDimensionsAndScroll]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div
        className="relative w-full overflow-hidden select-none"
        style={{
          height: containerHeight ? `${containerHeight}px` : "9.5rem",
        }}
      >
        <div
          className="flex flex-wrap text-3xl tracking-wider gap-x-4 gap-y-4 transition-transform duration-200 ease-out"
          style={{
            transform: `translateY(-${scrollOffset}px)`,
          }}
        >
          {sampleWords.map((word, index) => {
            const isCurrentWord = wordCount.total === index;
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

                  const isCurrentLetter =
                    isCurrentWord && currentIndex === letterIndex;
                  const isWordEnd =
                    isCurrentWord &&
                    currentIndex >= word.length &&
                    letterIndex === word.length - 1;

                  let colorClass = "";
                  if (typedChar !== undefined) {
                    colorClass = typedChar === letter ? valid : invalid;
                  }

                  let cursorClass = "";
                  if (isCurrentLetter) {
                    cursorClass = "border-l-4 border-l-amber-400";
                  } else if (isWordEnd) {
                    cursorClass = "border-r-4 border-r-amber-400";
                  }

                  return (
                    <span
                      key={`typing-letter-${key}`}
                      ref={(el) => {
                        if (el) letterRefs.current.set(key, el);
                        else letterRefs.current.delete(key);
                      }}
                      className={`${colorClass} ${cursorClass}`.trim()}
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
      <TestReset handleTestReset={handleTestReset} />
    </div>
  );
};

export default TypingScreen;
