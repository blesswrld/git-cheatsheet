"use client";

import { createContext, useState, useEffect, useContext, useRef } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");
    const isInitialMountTheme = useRef(true);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        if (storedTheme) {
            setTheme(storedTheme);
        } else if (prefersDark) {
            setTheme("dark");
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        if (theme === "dark") {
            body.classList.add("bg-black");
            body.classList.remove("bg-white");
        } else {
            body.classList.add("bg-white");
            body.classList.remove("bg-black");
        }

        if (isInitialMountTheme.current) {
            isInitialMountTheme.current = false;
        } else {
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
