"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type FontSize = "small" | "default" | "large";

type AccessibilityState = {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
};

const AccessibilityContext = createContext<AccessibilityState>({
  fontSize: "default",
  setFontSize: () => {},
  darkMode: false,
  setDarkMode: () => {},
});

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

const FONT_SCALE: Record<FontSize, string> = {
  small: "14px",
  default: "16px",
  large: "18px",
};

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>("default");
  const [darkMode, setDarkModeState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedSize = localStorage.getItem("prism-font-size") as FontSize | null;
    const savedDark = localStorage.getItem("prism-dark-mode");
    if (savedSize && FONT_SCALE[savedSize]) setFontSizeState(savedSize);
    if (savedDark === "true") setDarkModeState(true);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.fontSize = FONT_SCALE[fontSize];
    localStorage.setItem("prism-font-size", fontSize);
  }, [fontSize, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("prism-dark-mode", String(darkMode));
  }, [darkMode, mounted]);

  function setFontSize(size: FontSize) {
    setFontSizeState(size);
  }

  function setDarkMode(dark: boolean) {
    setDarkModeState(dark);
  }

  return (
    <AccessibilityContext.Provider value={{ fontSize, setFontSize, darkMode, setDarkMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
}
