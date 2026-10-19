import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../context";
import type { Theme } from "../../../context/theme.types";

interface ThemeSwitchModalProps {
  open: boolean;
  onClose: () => void;
}

const ThemeSwitchModal = ({ open, onClose }: ThemeSwitchModalProps) => {
  const {
    themeId,
    accent,
    primary,
    tertiary,
    secondary,
    background,
    availableThemes,
    themes,
    setTheme,
    previewTheme,
  } = useTheme();

  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track the theme that was active when modal was opened
  const originalThemeIdRef = useRef<string>(themeId);
  const isAppliedRef = useRef(false);

  // Filter themes based on search input
  const filteredThemes = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return availableThemes;
    return availableThemes.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
    );
  }, [availableThemes, search]);

  // When modal opens, save the active theme and auto-focus input
  useEffect(() => {
    if (open) {
      originalThemeIdRef.current = themeId;
      isAppliedRef.current = false;
      setSearch("");

      // Select currently active theme if found in filtered list
      const idx = availableThemes.findIndex((t) => t.id === themeId);
      setSelectedIndex(idx >= 0 ? idx : 0);

      // Focus search input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      // Revert if modal closed without applying
      if (!isAppliedRef.current) {
        previewTheme(null);
      }
    }
  }, [open, themeId, availableThemes, previewTheme]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (!isAppliedRef.current) {
        previewTheme(null);
      }
    };
  }, [previewTheme]);

  // Keep selectedIndex within bounds when search changes
  useEffect(() => {
    setSelectedIndex((prev) => {
      if (filteredThemes.length === 0) return 0;
      if (prev >= filteredThemes.length) return 0;
      return prev;
    });
  }, [filteredThemes]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredThemes.length === 0) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (selectedIndex + 1) % filteredThemes.length;
      setSelectedIndex(nextIndex);
      previewTheme(filteredThemes[nextIndex].id);
      itemRefs.current[nextIndex]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        (selectedIndex - 1 + filteredThemes.length) % filteredThemes.length;
      setSelectedIndex(prevIndex);
      previewTheme(filteredThemes[prevIndex].id);
      itemRefs.current[prevIndex]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredThemes[selectedIndex];
      if (selected) {
        handleApply(selected);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };

  const handleApply = (theme: Theme) => {
    isAppliedRef.current = true;
    setTheme(theme.id);
    onClose();
  };

  const handleClose = () => {
    isAppliedRef.current = false;
    previewTheme(null);
    onClose();
  };

  const handleHoverTheme = (theme: Theme, index: number) => {
    setSelectedIndex(index);
    previewTheme(theme.id);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl p-5 shadow-2xl flex flex-col gap-3 border-4 select-none font-mono"
        style={{
          backgroundColor: background,
          borderColor: secondary,
          borderWidth: "4px",
          borderStyle: "solid",
          color: tertiary,
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-base"
            style={{ color: primary }}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Theme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              handleKeyDown(e);
            }}
            className="w-full bg-transparent outline-none font-mono text-base placeholder:text-base tracking-wide"
            style={{
              color: tertiary,
            }}
          />
        </div>

        {/* Theme List */}
        <div
          ref={listRef}
          className="flex flex-col max-h-[60vh] overflow-y-auto no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden pr-1"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filteredThemes.length === 0 ? (
            <div
              className="py-8 text-center text-sm font-mono"
              style={{ color: primary }}
            >
              no themes found
            </div>
          ) : (
            filteredThemes.map((theme, index) => {
              const isHighlighted = index === selectedIndex;
              const activeSelectedTheme =
                themes[themeId] || themes[originalThemeIdRef.current];
              const isSelected =
                theme.id === themeId ||
                theme.id === originalThemeIdRef.current ||
                (activeSelectedTheme &&
                  theme.name.toLowerCase() ===
                    activeSelectedTheme.name.toLowerCase());

              return (
                <div
                  key={theme.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  role="button"
                  tabIndex={0}
                  className="flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-all duration-75 text-sm"
                  style={{
                    backgroundColor: isHighlighted ? accent : "transparent",
                    color: isHighlighted ? background : primary,
                  }}
                  onMouseEnter={() => handleHoverTheme(theme, index)}
                  onClick={() => handleApply(theme)}
                >
                  {/* Left: Checkmark & Name */}
                  <div className="flex items-center gap-2">
                    <span className="w-4 inline-flex items-center justify-center">
                      {isSelected ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-xs"
                          style={{
                            color: isHighlighted ? background : primary,
                          }}
                        />
                      ) : null}
                    </span>
                    <span
                      className="font-mono tracking-wider lowercase"
                      style={{
                        color: isHighlighted
                          ? background
                          : isSelected
                          ? tertiary
                          : primary,
                        fontWeight: isHighlighted ? 600 : 400,
                      }}
                    >
                      {theme.name}
                    </span>
                  </div>

                  {/* Right: Color Preview Capsule */}
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0 border transition-transform"
                    style={{
                      backgroundColor: theme.background,
                      borderColor: `${theme.primary}40`,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: theme.accent }}
                      title="accent"
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: theme.primary }}
                      title="primary"
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: theme.tertiary }}
                      title="tertiary"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div
          className="flex items-center justify-center gap-2 pt-2 text-xs font-mono select-none"
          style={{ color: primary }}
        >
          <span
            className="px-1.5 py-0.5 rounded text-[11px]"
            style={{ backgroundColor: secondary, color: tertiary }}
          >
            escape
          </span>
          <span>or</span>
          <span
            className="px-1.5 py-0.5 rounded text-[11px]"
            style={{ backgroundColor: secondary, color: tertiary }}
          >
            ctrl + shift + p
          </span>
          <span>- command line</span>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitchModal;
