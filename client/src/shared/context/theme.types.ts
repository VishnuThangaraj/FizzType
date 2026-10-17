export interface ThemeColors {
  background: string;
  primary: string;
  secondary: string;
  seconday?: string; // alias to prevent errors from typos
  accent: string;
}

export interface Theme {
  id: string;
  name: string;
  background: string;
  primary: string;
  secondary: string;
  seconday?: string; // alias to prevent errors from typos
  accent: string;
}

export interface ThemeContextType {
  theme: Theme;
  themeId: string;
  themeName: string;
  background: string;
  primary: string;
  secondary: string;
  seconday: string;
  accent: string;
  availableThemes: Theme[];
  themes: Record<string, Theme>;
  setTheme: (themeOrId: string | Theme) => void;
  setThemeId: (id: string) => void;
}
