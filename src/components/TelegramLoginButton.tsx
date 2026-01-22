'use client';

import { useEffect, useRef, type FC } from 'react';
import { type TelegramLoginButtonProps } from '../types';

const TelegramLoginButton: FC<TelegramLoginButtonProps> = (props) => {
    const {
        botUsername,
        requestAccess = 'write',
        size = 'large',
        userPic = true,
        lang = 'en',
        className = '',
        radius,
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!containerRef.current) return;

        let callbackName: string | undefined;

        if ('onAuthCallback' in props && props.onAuthCallback) {
            callbackName = `__tg_auth_cb_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
            (window as any)[callbackName] = (user: any) => {
                props.onAuthCallback(user);
            };
        }

        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?24';
        script.async = true;
        script.setAttribute('data-telegram-login', botUsername);
        script.setAttribute('data-request-access', requestAccess);
        script.setAttribute('data-size', size);
        script.setAttribute('data-userpic', String(userPic));
        script.setAttribute('data-lang', lang);

        if (radius !== undefined) {
            script.setAttribute('data-radius', String(radius));
        }

        if ('authUrl' in props && props.authUrl) {
            script.setAttribute('data-auth-url', props.authUrl);
        } else if (callbackName) {
            script.setAttribute('data-onauth', `${callbackName}(user)`);
        }

        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            if (callbackName) {
                delete (window as any)[callbackName];
            }
        };
    }, [botUsername, props, requestAccess, size, userPic, lang, radius]);

    return (
        <div
            style={{ width: 'fit-content', height: 'auto' }}
            aria-label="Telegram login button"
            className={className}
            ref={containerRef}
            role="presentation"
        />
    );
};

export default TelegramLoginButton;