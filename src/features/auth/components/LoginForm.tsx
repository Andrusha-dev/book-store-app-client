"use client"


import {useState} from "react";
import {useForm} from "react-hook-form";
import {LoginDto} from "@/shared/api/dto";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/features/auth/hooks/use-auth";



//Компонент форми логіну
export function LoginForm() {
    const {login} = useAuth();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<LoginDto>({
        resolver: zodResolver(LoginDto),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: LoginDto) => {
        setServerError(null);

        try {
            await login(data); //Здійснюєм логін
        } catch(error) {
            setServerError((error as Error).message)
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold text-center">Форма автентифікації</h2>

            {serverError && <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">{serverError}</div>}

            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    {...register("email")}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="user@example.com"
                />
                {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Пароль</label>
                <input
                    type="password"
                    {...register('password')} // Те ж саме для пароля
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                />
                {errors.password && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
                {isSubmitting ? 'Вхід...' : 'Увійти'}
            </button>
        </form>
    );
}