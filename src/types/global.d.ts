export { };

declare global {
    interface Window {
        onTelegramLogin?: (data: import('./index').TelegramLoginWidgetData) => void;
        [key: `__tg_auth_cb_${string}`]: ((user: TelegramLoginWidgetData) => void) | undefined;
    }
}