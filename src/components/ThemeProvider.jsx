
    import React, { createContext, useContext, useState, useEffect } from "react";

    const ThemeProviderContext = createContext({
      theme: "system",
      setTheme: () => null,
    });

    import { useData } from '@/contexts/DataContext';

    export function ThemeProvider({
      children,
      defaultTheme = "system",
      storageKey = "vite-ui-theme",
    }) {
      const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
      const { settings } = useData();
      const customTheme = settings.theme || {
        primaryColor: '#6D28D9',
        secondaryColor: '#D946EF',
      };

      useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }

        root.style.setProperty('--color-primary', customTheme.primaryColor);
        root.style.setProperty('--color-secondary', customTheme.secondaryColor);

      }, [theme, customTheme]);

      const value = {
        theme,
        setTheme: (newTheme) => {
          localStorage.setItem(storageKey, newTheme);
          setTheme(newTheme);
        },
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
  