export interface TelegramLoginWidgetData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

export interface TelegramLoginButtonBaseProps {
    botUsername: string;
    onAuthCallback?: (data: TelegramLoginWidgetData) => void;
    authUrl?: string;
    requestAccess?: 'write' | 'read';
    cornerRadius?: number;
    size?: 'large' | 'medium' | 'small';
    radius?: string | number;
    userPic?: boolean;
    lang?: 'en' | 'ru' | 'uk' | 'de' | 'it' | 'es' | 'pt' | 'tr' | 'fa' | 'ar';
    className?: string;
    children?: React.ReactNode;
}

interface TelegramLoginButtonCallbackProps extends TelegramLoginButtonBaseProps {
    onAuthCallback: (data: TelegramLoginWidgetData) => void;
    authUrl?: never;
}

interface TelegramLoginButtonRedirectProps extends TelegramLoginButtonBaseProps {
    authUrl: string;
    onAuthCallback?: never;
}

export type TelegramLoginButtonProps =
    | TelegramLoginButtonCallbackProps
    | TelegramLoginButtonRedirectProps;