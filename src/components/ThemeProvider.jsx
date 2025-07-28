
    import React, { createContext, useContext, useState, useEffect } from "react";

    const ThemeProviderContext = createContext({
      theme: "system",
      setTheme: () => null,
    });

    export function ThemeProvider({
      children,
  defaultTheme = "system",
      storageKey = "vite-ui-theme",
    }) {
      const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    fetch("/themes.json")
      .then((res) => res.json())
      .then(setThemes);
  }, []);

      useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

    // Remove any existing theme stylesheets
    const existingLink = document.getElementById("dynamic-theme");
    if (existingLink) {
      existingLink.remove();
    }

        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          root.classList.add(systemTheme);
    } else if (theme.toLowerCase() !== "default") {
      const selectedTheme = themes.find((t) => t.name === theme);
      if (selectedTheme) {
        const link = document.createElement("link");
        link.id = "dynamic-theme";
        link.rel = "stylesheet";
        link.href = selectedTheme.url;
        document.head.appendChild(link);
      }
        }
  }, [theme, themes]);

      const value = {
        theme,
        setTheme: (newTheme) => {
          localStorage.setItem(storageKey, newTheme);
          setTheme(newTheme);
        },
    themes
      };

      return (
        <ThemeProviderContext.Provider value={value}>
          {children}
        </ThemeProviderContext.Provider>
      );
    }

    export const useTheme = () => {
      const context = useContext(ThemeProviderContext);
      if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
      }
      return context;
    };
  