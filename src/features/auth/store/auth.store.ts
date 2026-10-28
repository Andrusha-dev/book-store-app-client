import {userControllerFindMe, userControllerFindMeResponse} from "@/shared/api/services/user";
import {create} from "zustand/react";
import {LoginDto, UserResponseDto} from "@/shared/api/dto";
import {
    authControllerLoginWithCredentials,
    authControllerLoginWithCredentialsResponse
} from "@/shared/api/services/auth";
import {convertErrorMessageToString} from "@/shared/utils/error.utils";
import { persist } from 'zustand/middleware'



interface AuthState {
    user: UserResponseDto | null;
    setUser: (user: UserResponseDto | null) => void;
    login: (dto: LoginDto) => Promise<void>;
    fetchAuthUser: () => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(persist(
    (set, get) => ({
        user: null,
        setUser: (user: UserResponseDto | null) => set({user}),
        login: async (dto: LoginDto) => {
            let response: authControllerLoginWithCredentialsResponse;

            try {
                response = await authControllerLoginWithCredentials(dto);
            } catch(error) {
                throw new Error("Не вдалось підключитись до сервера. Спробуйте пізніше")
            }

            if(response.status === 201) {
                localStorage.setItem("accessToken", response.data.accessToken);
                await get().fetchAuthUser();
            } else {
                throw new Error(convertErrorMessageToString(response.data.message));
            }
        },
        fetchAuthUser: async () => {
            try {
                const response = await userControllerFindMe();

                //Якщо поточного користувача отримано, вказуємо його в стейті
                if(response.status === 200) {
                    set({user: response.data});
                } else {
                    //Якщо - ні, очищуєм стейт користувача і видаляємо токен, для синхронізації
                    set({user: null});
                    localStorage.removeItem("accessToken");
                }
            } catch (error) {
                //При помилці мережі, також очищуєм стейт користувача і видаляємо токен, для синхронізаці
                set({user: null});
                localStorage.removeItem("accessToken");
            }
        },
        logout: () => {
            localStorage.removeItem("accessToken");
            set({user: null});
        }
    }),
    {
        name: "auth-storage"
    }
));