"use client";

import { createContext, useState, useEffect, useContext, useRef } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");
    const isInitialMountTheme = useRef(true);

    // Этот useEffect выполняется ОДИН РАЗ на клиенте для ЗАГРУЗКИ темы
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        // Устанавливаем тему из localStorage или по системным настройкам
        if (storedTheme) {
            setTheme(storedTheme);
        } else if (prefersDark) {
            setTheme("dark");
        }
        // Если ничего нет, останется 'light' по умолчанию
    }, []);

    // Этот useEffect срабатывает при КАЖДОМ ИЗМЕНЕНИИ темы
    useEffect(() => {
        const root = document.documentElement; // тег <html>
        const body = document.body;

        // Применяем классы к <html> для Tailwind
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        // Применяем классы к <body> для основного фона
        if (theme === "dark") {
            body.classList.add("bg-black");
            body.classList.remove("bg-white");
        } else {
            body.classList.add("bg-white");
            body.classList.remove("bg-black");
        }

        // Сохраняем в localStorage только если это не первый рендер
        if (isInitialMountTheme.current) {
            isInitialMountTheme.current = false;
        } else {
            localStorage.setItem("theme", theme);
        }
    }, [theme]); // Запускается каждый раз, когда меняется `theme`

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Кастомный хук для использования в других компонентах
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
