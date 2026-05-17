import { useEffect, useRef, useState, useCallback, useReducer, memo } from "react";
import ToolBar from "@/features/typing/components/ToolBar";
import LanguageBar from "@/features/typing/components/LanguageBar";
import { FaRedoAlt } from "react-icons/fa";

// ─── Constants ───────────────────────────────────────────────────────────────
const SENTENCE =
  "lead have part most you fact during all as while these not between get long " +
  "without any in only run tell this again too by what look old another fact " +
  "lead have part most you fact during all as while these not between get long " +
  "without any in only run tell this again too by what look old another fact";

const LINE_HEIGHT_REM = 3.25; // must match leading-13 (13 × 0.25rem)
const VISIBLE_LINES = 3;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const buildWords = (sentence) =>
  sentence
    .trim()
    .split(/\s+/)
    .map((word) => ({
      chars: word.split("").map((ch) => ({ char: ch, status: "pending" })),
    }));

// ─── Reducer ─────────────────────────────────────────────────────────────────
const INITIAL = { words: buildWords(SENTENCE), activeWord: 0, activeChar: 0 };

function reducer(state, action) {
  const { words, activeWord, activeChar } = state;

  switch (action.type) {
    case "TYPE": {
      const word = words[activeWord];
      if (!word || activeChar >= word.chars.length) return state;
      const status = action.key === word.chars[activeChar].char ? "correct" : "incorrect";
      return {
        ...state,
        activeChar: activeChar + 1,
        words: words.map((w, wi) =>
          wi !== activeWord
            ? w
            : { ...w, chars: w.chars.map((c, ci) => (ci === activeChar ? { ...c, status } : c)) }
        ),
      };
    }
    case "BACKSPACE": {
      if (activeChar === 0) return state; // word-locked — cannot cross boundary
      const newChar = activeChar - 1;
      return {
        ...state,
        activeChar: newChar,
        words: words.map((w, wi) =>
          wi !== activeWord
            ? w
            : { ...w, chars: w.chars.map((c, ci) => (ci === newChar ? { ...c, status: "pending" } : c)) }
        ),
      };
    }
    case "SPACE": {
      if (activeWord >= words.length - 1) return state;
      return { ...state, activeWord: activeWord + 1, activeChar: 0 };
    }
    case "RESET": {
      return { words: buildWords(SENTENCE), activeWord: 0, activeChar: 0 };
    }
    default:
      return state;
  }
}

// ─── Memoized Word ────────────────────────────────────────────────────────────
// Only the active word re-renders per keystroke; all others are skipped by memo.
const Word = memo(({ wordObj, wordIdx, isLast, setCharRef }) => (
  <span>
    {wordObj.chars.map((c, ci) => (
      <span
        key={ci}
        ref={(el) => setCharRef(wordIdx, ci, el)}
        className={
          c.status === "correct"
            ? "text-secondary"
            : c.status === "incorrect"
              ? "text-red-400"
              : ""
        }
      >
        {c.char}
      </span>
    ))}
    {/* Space separator — gives the cursor a position between words */}
    {!isLast && (
      <span ref={(el) => setCharRef(wordIdx, wordObj.chars.length, el)}>{" "}</span>
    )}
  </span>
));
Word.displayName = "Word";

// ─── TypingWorkspace ──────────────────────────────────────────────────────────
const TypingWorkspace = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const { words, activeWord, activeChar } = state;

  // Line-scroll state
  const [lineOffset, setLineOffset] = useState(0);
  const lineOffsetRef = useRef(0); // mirror of lineOffset — avoids stale closures

  // Cursor position (natural coords inside the inner div)
  const [cursorPos, setCursorPos] = useState({ top: 0, left: 0, height: 52 });

  const innerRef = useRef(null);

  // 2-D ref store: charRefs.current[wordIdx][charIdx] = DOM element
  // Using a plain object avoids mutations during render.
  const charRefs = useRef({});

  // Stable setter — safe to pass to memoized children without breaking memo.
  const setCharRef = useCallback((wordIdx, charIdx, el) => {
    if (!charRefs.current[wordIdx]) charRefs.current[wordIdx] = {};
    charRefs.current[wordIdx][charIdx] = el;
  }, []);

  // ── Cursor + scroll measurement ──────────────────────────────────────────
  const updateCursorAndScroll = useCallback(
    (wIdx, cIdx) => {
      const word = words[wIdx];
      if (!word || !innerRef.current) return;

      const targetIdx = Math.min(cIdx, word.chars.length - 1);
      const el = charRefs.current[wIdx]?.[targetIdx];
      if (!el) return;

      const innerRect = innerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      // getComputedStyle gives the actual px line-height after CSS resolves it
      const lineHeightPx =
        parseFloat(getComputedStyle(innerRef.current).lineHeight) ||
        LINE_HEIGHT_REM * 16;

      // elRect.top - innerRect.top is always the NATURAL position inside
      // the inner div because both share the same transform offset (it cancels).
      const naturalTop = elRect.top - innerRect.top;
      const naturalLeft =
        cIdx >= word.chars.length
          ? elRect.right - innerRect.left   // cursor goes after last char
          : elRect.left - innerRect.left;

      // Which logical row is this word on?
      const lineIndex = Math.round(naturalTop / lineHeightPx);

      // Keep active line at visual row ≤ 1 (rows 0/1 always visible).
      // Once it reaches row 2, shift offset up by 1.
      const cur = lineOffsetRef.current;
      const next = Math.max(cur, lineIndex > 1 ? lineIndex - 1 : cur);
      if (next !== cur) {
        lineOffsetRef.current = next;
        setLineOffset(next);
      }

      setCursorPos({ top: naturalTop, left: naturalLeft, height: elRect.height || lineHeightPx });
    },
    [words]
  );

  useEffect(() => {
    updateCursorAndScroll(activeWord, activeChar);
  }, [activeWord, activeChar, words, updateCursorAndScroll]);

  // ── Keyboard handler ─────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === "Backspace") { e.preventDefault(); dispatch({ type: "BACKSPACE" }); }
      else if (e.key === " ")   { e.preventDefault(); dispatch({ type: "SPACE" }); }
      else if (e.key.length === 1)                    dispatch({ type: "TYPE", key: e.key });
    },
    [] // dispatch is stable; no other deps needed
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ── Reset ────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
    charRefs.current = {};
    lineOffsetRef.current = 0;
    setLineOffset(0);
    setCursorPos({ top: 0, left: 0, height: 52 });
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div>
      <ToolBar />
      <LanguageBar />

      {/* Fixed 3-line clipping viewport */}
      <div
        style={{ height: `${VISIBLE_LINES * LINE_HEIGHT_REM}rem` }}
        className="relative mt-5 mb-10 overflow-hidden select-none cursor-default"
      >
        {/* Scrolling text container — shifts up via translateY */}
        <div
          ref={innerRef}
          style={{
            fontWeight: "400",
            transform: `translateY(-${lineOffset * LINE_HEIGHT_REM}rem)`,
            transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          className="relative text-3xl leading-13 font-normal"
        >
          {/* Cursor — lives inside scrolling div so it shifts with text */}
          <span
            style={{
              position: "absolute",
              top: cursorPos.top,
              left: cursorPos.left,
              height: cursorPos.height,
              width: "2px",
              backgroundColor: "#e2b714",
              borderRadius: "1px",
              transition: "top 60ms ease, left 60ms ease",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />

          {words.map((wordObj, wi) => (
            <Word
              key={wi}
              wordObj={wordObj}
              wordIdx={wi}
              isLast={wi === words.length - 1}
              setCharRef={setCharRef}
            />
          ))}
        </div>
      </div>

      {/* Reset button */}
      <div className="flex justify-center">
        <button onClick={handleReset}>
          <FaRedoAlt />
        </button>
      </div>
    </div>
  );
};

export default TypingWorkspace;
