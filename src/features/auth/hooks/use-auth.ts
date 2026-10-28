"use client";

import { useRouter } from "next/navigation";
import {
    authControllerLoginWithCredentials,
    authControllerLoginWithCredentialsResponse
} from "@/shared/api/services/auth";
import {convertErrorMessageToString} from "@/shared/utils/error.utils";
import {LoginDto} from "@/shared/api/dto";

export function useAuth() {
    const router = useRouter();

    const login = async (dto: LoginDto) => {
        let response: authControllerLoginWithCredentialsResponse;

        try {
            response = await authControllerLoginWithCredentials(dto);
        } catch(error) {
            throw new Error("Не вдалось підключитись до сервера. Спробуйте пізніше")
        }

        if(response.status === 201) {
            localStorage.setItem("accessToken", response.data.accessToken);
            router.replace("/account");
        } else {
            throw new Error(convertErrorMessageToString(response.data.message));
        }
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        router.replace("/login");
    }

    const isAuthenticated = () => {
        if (typeof window === "undefined") return false;
        return Boolean(localStorage.getItem("accessToken"));
    };

    return {
        login,
        logout,
        isAuthenticated,
    };
}