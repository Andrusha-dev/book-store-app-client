export function PageLoader() {
    return (
        <div className='flex flex-col items-center justify-center gap-3 fixed inset-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-950/70'>
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-500 animate-pulse">
                Завантаження
            </p>
        </div>
    );
}