export interface ThemeColors {
  background: string;
  primary: string;
  secondary: string;
  seconday?: string; // alias to prevent errors from typos
  tertiary: string;
  accent: string;
  invalid: string;
}

export interface Theme {
  id: string;
  name: string;
  background: string;
  primary: string;
  secondary: string;
  seconday?: string; // alias to prevent errors from typos
  tertiary: string;
  accent: string;
  invalid: string;
}

export interface ThemeContextType {
  theme: Theme;
  themeId: string;
  themeName: string;
  background: string;
  primary: string;
  secondary: string;
  seconday: string;
  tertiary: string;
  accent: string;
  invalid: string;
  availableThemes: Theme[];
  themes: Record<string, Theme>;
  setTheme: (themeOrId: string | Theme) => void;
  setThemeId: (id: string) => void;
  previewTheme: (themeOrId: string | Theme | null) => void;
}
