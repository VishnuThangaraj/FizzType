import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Theme, ThemeContextType } from "./theme.types";
import { defaultTheme, themes } from "./theme.constant";
import { ThemeContext } from "./theme.context";

const THEME_STORAGE_KEY = "fizztype_theme";

export interface ThemeProviderProps {
  children: ReactNode;
  initialThemeId?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialThemeId,
}) => {
  const [themeId, setCurrentThemeId] = useState<string>(() => {
    if (initialThemeId && themes[initialThemeId]) {
      return initialThemeId;
    }
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && themes[saved]) {
      return saved;
    }
    return "default";
  });

  const currentTheme = useMemo(() => {
    return themes[themeId] || defaultTheme;
  }, [themeId]);

  const setTheme = useCallback((themeOrId: string | Theme) => {
    if (typeof themeOrId === "string") {
      if (themes[themeOrId]) {
        setCurrentThemeId(themeOrId);
        localStorage.setItem(THEME_STORAGE_KEY, themeOrId);
      }
    } else if (themeOrId && typeof themeOrId === "object" && themeOrId.id) {
      if (themes[themeOrId.id]) {
        setCurrentThemeId(themeOrId.id);
        localStorage.setItem(THEME_STORAGE_KEY, themeOrId.id);
      }
    }
  }, []);

  const setThemeId = useCallback(
    (id: string) => {
      setTheme(id);
    },
    [setTheme],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg-color", currentTheme.background);
    root.style.setProperty("--primary-color", currentTheme.primary);
    root.style.setProperty("--secondary-color", currentTheme.secondary);
    root.style.setProperty("--tertiary-color", currentTheme.tertiary);
    root.style.setProperty("--accent-color", currentTheme.accent);
    root.style.setProperty("--invalid-color", currentTheme.invalid);
  }, [currentTheme]);

  const contextValue: ThemeContextType = useMemo(
    () => ({
      theme: currentTheme,
      themeId: currentTheme.id,
      themeName: currentTheme.name,
      background: currentTheme.background,
      primary: currentTheme.primary,
      secondary: currentTheme.secondary,
      seconday: currentTheme.secondary,
      tertiary: currentTheme.tertiary,
      accent: currentTheme.accent,
      invalid: currentTheme.invalid,
      availableThemes: Object.values(themes),
      themes,
      setTheme,
      setThemeId,
    }),
    [currentTheme, setTheme, setThemeId],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
