import {useEffect, useState} from "react";
import {userControllerFindMe, userControllerFindMeResponse} from "@/shared/api/services/user";
import {UserResponseDto} from "@/shared/api/dto";
import {convertErrorMessageToString} from "@/shared/utils/error.utils";


export function useUser() {
    const [user, setUser] = useState<UserResponseDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);

                const response = await userControllerFindMe();
                if (response.status === 200) {
                    setUser(response.data)
                } else {
                    setError(convertErrorMessageToString(response.data.message))
                }
            } catch (error) {
                setError("Не вдалось підключитись до сервера. Спробуйте пізніше");
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, []);

    return {user, isLoading, error};
}