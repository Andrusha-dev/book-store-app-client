import { defineConfig } from 'orval';
import "dotenv/config";

//Конфіг для скрипта кодогенерації orval
export default defineConfig({
    bookStoreApi: {
        input: 'http://localhost:3000/api/v1/docs-json', // URL твого Swagger
        output: {
            mode: 'tags', // розділяє сервіси за тегами
            target: './src/shared/api/services', // згенеровані сервіси
            client: 'fetch', //тип клієнта (next рекомендує саме fetch)
            //baseUrl: process.env["NEXT_PUBLIC_BACKEND_URL"], //базовий url бекенда (бо по змовчуванню orval бере url клієнта)
            clean: true,//Очищує існуючі папки перед новою генерацією

            //мутатор для згенерованих сервісів
            override: {
                mutator: {
                    path: './src/shared/api/api-client.ts',
                    name: 'customFetch',
                },
            },

            //Генерація zod схем
            schemas: {
                path: './src/shared/api/dto', //згенеровані схеми та типи
                type: 'zod',
                mode: 'split',
            },
        },
    },
});