
//Приведення поля message обєкта відповіді помилки до рядка
export const convertErrorMessageToString = (message: string[] | string): string =>
    //Якщо поле message - це масив то приводим його до рядка, а якщо - рядок, до повертаєм як є
    Array.isArray(message) ? message.join(', ') : message;