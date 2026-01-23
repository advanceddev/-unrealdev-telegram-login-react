'use client';

import { type FC, useEffect, useRef } from 'react';

import { type TelegramLoginButtonProps, type TelegramLoginWidgetData } from '../types';

const TelegramLoginButton: FC<TelegramLoginButtonProps> = (props) => {
  const {
    botUsername,
    widgetVersion = 24,
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
  
    let callbackName: `__tg_auth_cb_${string}` | undefined;
    const currentContainer = containerRef.current;
  
    if ('onAuthCallback' in props) {
      callbackName = `__tg_auth_cb_${String(Date.now())}_${String((Math.random() * 1e9) | 0)}`;
      window[callbackName] = (user: TelegramLoginWidgetData) => {
        if (props.onAuthCallback) {
            props.onAuthCallback(user);
        }
      };
    }
  
    currentContainer.innerHTML = '';
  
    const script = document.createElement('script');
    script.src = `https://telegram.org/js/telegram-widget.js?${String(widgetVersion)}`;
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
  
    currentContainer.appendChild(script);
  
    return () => {
      currentContainer.innerHTML = '';
      if (callbackName) {
        window[callbackName] = undefined;
      }
    };
  }, [botUsername, props, requestAccess, size, userPic, lang, radius, widgetVersion]);

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

TelegramLoginButton.displayName = 'TelegramLoginButton';
export default TelegramLoginButton;