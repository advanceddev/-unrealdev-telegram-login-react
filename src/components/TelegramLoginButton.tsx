'use client';

import { useEffect, useRef, type FC } from 'react';
import { type TelegramLoginButtonProps } from '../types';

const TelegramLoginButton: FC<TelegramLoginButtonProps> = ({
    botUsername,
    onAuthCallback,
    requestAccess = 'write',
    size = 'large',
    userPic = true,
    lang = 'en',
    className = '',
    radius,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!containerRef.current) return;

        const callbackName = `__tg_auth_cb_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

        (window as any)[callbackName] = (user: any) => {
            onAuthCallback(user);
        };

        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?24';
        script.async = true;
        script.setAttribute('data-telegram-login', botUsername);
        script.setAttribute('data-onauth', `${callbackName}(user)`);
        script.setAttribute('data-request-access', requestAccess);
        script.setAttribute('data-size', size);
        script.setAttribute('data-userpic', String(userPic));
        script.setAttribute('data-lang', lang);
        if (radius !== undefined) script.setAttribute('data-radius', String(radius));
        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            delete (window as any)[callbackName];
        };
    }, [botUsername, onAuthCallback, requestAccess, size, userPic, lang, radius]);

    return <div
        style={{ width: 'fit-content', height: 'auto' }}
        aria-label="Telegram login button"
        className={className}
        ref={containerRef}
        role="presentation"
    />;
};

export default TelegramLoginButton;