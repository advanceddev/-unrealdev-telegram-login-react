'use client';

import { type FC, useEffect, useRef, useState } from 'react';

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
    loadingComponent,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(Boolean(loadingComponent));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;
  
    let callbackName: `__tg_auth_cb_${string}` | undefined;
    let observer: MutationObserver | null = null; 
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
    
    if (loadingComponent) {
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const telegramElement = currentContainer.querySelector(
            'iframe[src*="oauth.telegram.org"], .tgme_widget_login_button'
          );
          if (telegramElement) {
            setIsLoading(false);
            observer?.disconnect();
            break;
          }
        }
      }
    });
    observer.observe(currentContainer, {
      childList: true,
      subtree: true
    });
  }

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
      observer?.disconnect();
      currentContainer.innerHTML = '';
      if (callbackName) {
        window[callbackName] = undefined;
      }
    };
  }, [botUsername, props, loadingComponent, requestAccess, size, userPic, lang, radius, widgetVersion]);


  return (
    <>
    <div
      style={{ width: 'fit-content', height: 'auto', display: isLoading ? 'none' : 'block' }}
      aria-label="Telegram login button"
      className={className}
      ref={containerRef}
      role="presentation"
    />
      {isLoading && loadingComponent && 
        <div style={{ width: 'fit-content', height: 'auto'}}>
          {loadingComponent}
        </div>
      }
    </>

  );
};

TelegramLoginButton.displayName = 'TelegramLoginButton';
export default TelegramLoginButton;