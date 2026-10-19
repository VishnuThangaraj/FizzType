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

  const [previewThemeId, setPreviewThemeId] = useState<string | null>(null);

  const activeThemeId = previewThemeId || themeId;

  const currentTheme = useMemo(() => {
    return themes[activeThemeId] || defaultTheme;
  }, [activeThemeId]);

  const previewTheme = useCallback((themeOrId: string | Theme | null) => {
    if (!themeOrId) {
      setPreviewThemeId(null);
      return;
    }
    const id = typeof themeOrId === "string" ? themeOrId : themeOrId.id;
    if (themes[id]) {
      setPreviewThemeId(id);
    }
  }, []);

  const setTheme = useCallback((themeOrId: string | Theme) => {
    const id = typeof themeOrId === "string" ? themeOrId : themeOrId?.id;
    if (id && themes[id]) {
      setPreviewThemeId(null);
      setCurrentThemeId(id);
      localStorage.setItem(THEME_STORAGE_KEY, id);
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

  const uniqueAvailableThemes = useMemo(() => {
    const list = Object.values(themes).filter((t) => t.id !== "default");
    const seen = new Set<string>();
    return list
      .filter((t) => {
        const name = t.name.toLowerCase();
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const contextValue: ThemeContextType = useMemo(
    () => ({
      theme: currentTheme,
      themeId: themeId,
      themeName: currentTheme.name,
      background: currentTheme.background,
      primary: currentTheme.primary,
      secondary: currentTheme.secondary,
      seconday: currentTheme.secondary,
      tertiary: currentTheme.tertiary,
      accent: currentTheme.accent,
      invalid: currentTheme.invalid,
      availableThemes: uniqueAvailableThemes,
      themes,
      setTheme,
      setThemeId,
      previewTheme,
    }),
    [currentTheme, themeId, setTheme, setThemeId, previewTheme, uniqueAvailableThemes],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
