"use client"

import Link from "next/link";
import {ThemeToggle} from "@/shared/components/ui/ThemeToggle";
import logo from "@/shared/assets/book-store-logo.png"
import Image from "next/image";
import {House, UserCheck, LayoutList, ShoppingBasket} from "lucide-react"
import {useAuth} from "@/features/auth/hooks/use-auth";
import {useEffect, useState} from "react";


export function Header() {
    const {isAuthenticated} = useAuth();
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        setIsAuthorized(isAuthenticated())
    }, [])

    return (
        <header className="flex items-center justify-between bg-header-background px-2">
            <div>
                <Image src={logo} alt="Logo" height={60} loading="eager"/>
            </div>
            <nav>
                <ul className="flex items-center gap-4">
                    <li>
                        <Link href="/" className="inline-block hover:bg-header-hover-background p-5">
                            <House className="inline-block mr-2"/>
                            <span>Домашня сторінка</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={!isAuthorized ? "/login" : "/account"}
                            className="inline-block hover:bg-header-hover-background p-5"
                        >
                            <UserCheck className="inline-block mr-2"/>
                            {!isAuthorized ? <span>Вхід/Реєстрація</span> : <span>Аккаунт</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="/categories" className="inline-block hover:bg-header-hover-background p-5">
                            <LayoutList className="inline-block mr-2"/>
                            <span>Категорії книг</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cart" className="inline-block hover:bg-header-hover-background p-5">
                            <ShoppingBasket className="inline-block mr-2"/>
                            <span>Кошик</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <ThemeToggle/>
        </header>
    )
}