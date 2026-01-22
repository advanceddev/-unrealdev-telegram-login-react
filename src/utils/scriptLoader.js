let telegramScriptLoading = null;
export const loadTelegramScript = () => {
    if (typeof window === 'undefined') {
        return Promise.resolve();
    }
    if (telegramScriptLoading) {
        return telegramScriptLoading;
    }
    if (window.Telegram?.Login) {
        return Promise.resolve();
    }
    telegramScriptLoading = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?24';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Telegram widget script'));
        document.head.appendChild(script);
    });
    return telegramScriptLoading;
};
