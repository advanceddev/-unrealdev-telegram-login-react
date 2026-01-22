'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import {} from '../types';
const TelegramLoginButton = ({ botUsername, onAuthCallback, requestAccess = 'write', size = 'large', userPic = true, lang = 'en', className = '', }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        if (!containerRef.current)
            return;
        const callbackName = `__tg_auth_cb_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
        window[callbackName] = (user) => {
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
        containerRef.current.appendChild(script);
        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            delete window[callbackName];
        };
    }, [botUsername, onAuthCallback, requestAccess, size, userPic, lang]);
    return _jsx("div", { style: { width: 'fit-content', height: 'auto' }, "aria-label": "Telegram login button", className: className, ref: containerRef, role: "presentation" });
};
export default TelegramLoginButton;
