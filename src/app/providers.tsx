"use client"

import React from "react";
import {ThemeProvider} from "next-themes";

//Провайдери для підключення в кореневому шаблоні
export function Providers({children}: {children: React.ReactNode}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
        </ThemeProvider>
    );
}