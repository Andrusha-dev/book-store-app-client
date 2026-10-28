import {env} from "@/shared/config/env";


export const refreshAccessToken = async (): Promise<string | null> => {
    if (typeof window === 'undefined') return null;

    try {
        const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const {accessToken} = await response.json();
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    } catch (error) {
        localStorage.removeItem('accessToken');

        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }

        return null;
    }
};

//Кастомний клієнт fetch для orval (генерує лише помилки підключення)
export const customFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const isClient = typeof window !== 'undefined'; //Первіряєм чи ми на клієнті
    const token = isClient ? localStorage.getItem('accessToken') : null;//Якщо ми на клієнті, то витягуєм accessToken

    const headers = new Headers(options?.headers);
    //Якщо токен є і маршрут захищений, то вказуєм токен у заголовку
    if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    //Для файлів FormData залишаємо Content-Type без змін, а для решти запитів вказуємо 'Content-Type': 'application/json'
    if (!headers.has('Content-Type') && !(options?.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }


    let response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        ...options,
        headers
    });

    // Рефреш та перевірка токена виконуються лише на клієнті
    if (response.status === 401 && isClient) {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
            headers.set('Authorization', `Bearer ${newAccessToken}`);
            response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
                ...options,
                headers,
            });
        }
    }

    //Пробуєм розпарсити тіло відповіді
    const responseData = await response.json();

    return {
        data: responseData,
        status: response.status,
        headers: response.headers
    } as T
};