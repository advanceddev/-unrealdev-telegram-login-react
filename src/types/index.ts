export interface TelegramLoginWidgetData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

export interface TelegramLoginButtonProps {
    botUsername: string;
    onAuthCallback: (data: TelegramLoginWidgetData) => void;
    requestAccess?: 'write' | 'read';
    cornerRadius?: number;
    size?: 'large' | 'medium' | 'small';
    userPic?: boolean;
    lang?: 'en' | 'ru' | 'uk' | 'de' | 'it' | 'es' | 'pt' | 'tr' | 'fa' | 'ar';
    className?: string;
    children?: React.ReactNode;
}