
interface ErrorMessageProps {
    title?: string;
    message: string;
}

export function ErrorMessage({title = "Упс. Сталась помилка", message}: ErrorMessageProps) {
    return (
        <article className="p-4 border-2 border-red-700 bg-card-background text-card-foreground rounded-custom">
            <h3>{title}</h3>
            <p>{message}</p>
        </article>
    )
}