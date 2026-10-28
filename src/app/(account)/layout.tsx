import React from "react";
import {AuthGuard} from "@/features/auth/components/AuthGuard";

export default function AccountLayout({children}: {children: React.ReactNode}) {
    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <AuthGuard>
                {children}
            </AuthGuard>
        </main>
    )
}