"use client"

import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {PageLoader} from "@/shared/components/ui/PageLoader";
import {useAuth} from "@/features/auth/hooks/use-auth";

//Компонент обгортка для захищених сторінок. Викликається у шаблонах захищених маршрутів
export function AuthGuard({children}: { children: React.ReactNode}) {
    const {isAuthenticated} = useAuth();
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if(!isAuthenticated()) {
            router.push("/login");
        } else {
            setIsAuthorized(true);
        }

    }, [isAuthenticated, router]);

    if(!isAuthorized) {
        return <PageLoader/>
    }

    return <>{children}</>
}