export const changeLogs = [
  {
    version: "v0.0.2",
    date: "19 Oct 2026",
    features: [
      "interactive contact modal with category-based mailto subject generator",
      "interactive support modal with links to GitHub Sponsors, repository starring, and Buy Me a Coffee",
      "change logs viewer accessible directly from the footer version badge",
      "comprehensive legal documentation suite: Privacy Policy, Terms of Service, and Security Policy",
      "custom SVG brand logo component with scalable icon and persistent typography",
      "theme provider with multiple built-in color schemes (Serika Dark, Dracula, Nord, Monokai, Catppuccin)",
    ],
    improvements: [
      "navbar controls and footer seamlessly fade out during active typing for distraction-free practice",
      "navbar buttons now highlight only on hover rather than staying active on default routes",
      "brand icon aligns cleanly to the bottom baseline of the logo typography",
      "consistent high-contrast hover styling across modal cards (tertiary background with secondary text)",
      "centralized app configuration for repository, hosted URL, developer profile, and donation links",
      "smooth scroll navigation with responsive table of contents on legal pages",
    ],
    fixes: [
      "replaced all legacy placeholder branding and domains with official FizzType metadata and fizztype.vercel.app",
      "fixed malformed GDPR rights string array in privacy policy",
      "resolved duplicate React key warning in Terms of Service limitation lists",
      "fixed outer-click backdrop handling and added Escape key shortcuts across all modals",
    ],
    nerdStuff: [
      "Vite 8 build pipeline with Tailwind CSS v4 and full TypeScript typing verification",
      "live CSS variables binding (--bg-color, --accent-color, etc.) for zero-flicker theme switching",
      "aspect-ratio preserving SVG scaling (300:180) for brand icon",
    ],
  },
  {
    version: "v0.0.1",
    date: "12 Oct 2026",
    features: [
      "core typing test engine with real-time WPM, accuracy, raw speed, and consistency metrics",
      "timed typing modes (15s, 30s, 60s, 120s) and word count modes (10, 25, 50, 100)",
      "custom smooth caret animation with configurable blinking and trailing styles",
      "sound effects engine supporting mechanical switch clicks and errors",
    ],
    improvements: [
      "instant restart shortcut with Tab + Enter or quick restart hotkey",
      "live character state tracking (correct, incorrect, extra, missed)",
      "responsive test container layout optimized for desktop and mobile viewports",
    ],
    fixes: [
      "resolved input focus loss when clicking outside the active test container",
      "fixed word wrapping glitches on narrow screens",
    ],
    nerdStuff: [
      "React 19 SPA architecture with high-performance keystroke event dispatching",
      "zero external UI component dependencies for maximum typing responsiveness",
    ],
  },
];
