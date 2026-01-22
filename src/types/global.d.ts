export { };

declare global {
    interface Window {
        Telegram?: {
            Login: {
                renderAuthButton: (
                    container: HTMLElement,
                    options: {
                        bot_username: string;
                        request_access?: 'read' | 'write';
                        corner_radius?: number;
                        size?: 'large' | 'medium' | 'small';
                        userpic?: boolean;
                        lang?: string;
                    }
                ) => void;
            };
        };
        onTelegramLogin?: (data: import('./index').TelegramLoginWidgetData) => void;
    }
}