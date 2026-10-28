"use client"

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);


    useEffect(() => setMounted(true), []); //Лише коли компонент відрендериться, змінюємо mounted на true
    //Інакше нічого не рендеримо, бо значення теми ще не підвантажилось і кнопка не спрацює
    if(!mounted) {
        return null;
    }


    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative flex items-center h-8 w-14 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 transition-colors cursor-pointer"
        >
            {/*Бігунок: у світлому стані зліва, у темному пересувається праворуч*/}
            <div
                className="flex items-center justify-center h-6 w-6 transform rounded-full bg-white dark:bg-gray-800 shadow-sm transition-transform duration-200 ease-in-out translate-x-0.5 dark:translate-x-7"
            >
                {/* Іконки змінюються через CSS без JS-змінних */}
                <div className="inline dark:hidden text-xs">☀️</div>
                <div className="hidden dark:inline text-xs">🌙</div>
            </div>
        </button>
    )
}