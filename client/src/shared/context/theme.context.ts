import { createContext, useContext } from "react";
import type { ThemeContextType } from "./theme.types";
import { defaultTheme, themes } from "./theme.constant";

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  themeId: defaultTheme.id,
  themeName: defaultTheme.name,
  background: defaultTheme.background,
  primary: defaultTheme.primary,
  secondary: defaultTheme.secondary,
  seconday: defaultTheme.secondary,
  tertiary: defaultTheme.tertiary,
  accent: defaultTheme.accent,
  invalid: defaultTheme.invalid,
  availableThemes: Object.values(themes),
  themes,
  setTheme: () => {},
  setThemeId: () => {},
  previewTheme: () => {},
});

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};
