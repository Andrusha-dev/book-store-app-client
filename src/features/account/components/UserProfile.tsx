"use client"

import {PageLoader} from "@/shared/components/ui/PageLoader";
import {useEffect, useState} from "react";
import {userControllerFindMeResponse} from "@/shared/api/services/user";
import {useUser} from "@/features/account/hooks/use-user";
import {ErrorMessage} from "@/shared/components/ui/ErrorMessage";
import {toLocaleString} from "eslint-config-next";
import {useAuth} from "@/features/auth/hooks/use-auth";

export function UserProfile() {
    const {user, isLoading, error} = useUser();
    const {logout} = useAuth();

    if(isLoading) {
        return <PageLoader/>
    }

    if(error) {
        return <ErrorMessage message={error} />
    }

    return (
        <section className="p-4 rounded-custom bg-card-background text-card-foreground">
            <h1>Ваша персональна інформація</h1>
            <p>
                <span><b>ID:</b> {user?.id}</span><br/>
                <span><b>Email:</b> {user?.email}</span><br/>
                <span><b>Username:</b> {user?.username}</span><br/>
                <span><b>Ім&apos;я:</b> {user?.firstname}</span><br/>
                <span><b>Прізвище:</b> {user?.lastname}</span><br/>
                <span><b>Телефон:</b> {user?.phone}</span><br/>
                <span><b>Рік народження:</b> {user?.birthYear}</span><br/>
                <span><b>Одружений(на):</b> {user?.isMarried ? "Так" : "Ні"}</span><br/>
                <span><b>Дата створення облікового запису:</b> {user?.createdAt}</span><br/>
                <span><b>Дата оновлення облікового запису:</b> {user?.updatedAt}</span><br/>
            </p>
            <button
                className="bg-button-background hover:bg-button-hover-background text-button-foreground p-2 rounded-custom"
                onClick={logout}
            >
                Вийти
            </button>
        </section>
    )
}