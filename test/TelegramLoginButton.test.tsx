import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TelegramLoginButton, type TelegramLoginWidgetData } from '../src';

const mockOnAuthCallback = vi.fn<(user: TelegramLoginWidgetData) => void>();

afterEach(() => {
  vi.clearAllMocks();
  document.querySelectorAll('script[src*="telegram-widget.js"]').forEach(el => { el.remove(); });
  
  Object.keys(window).forEach(key => {
    if (key.startsWith('__tg_auth_cb_')) {
      (window as unknown as Record<string, unknown>)[key] = undefined;
    }
  });
});

describe('TelegramLoginButton', () => {
  it('renders without crashing', () => {
    render(
      <TelegramLoginButton
        botUsername="test_bot"
        onAuthCallback={mockOnAuthCallback}
      />
    );
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('injects telegram script tag with correct attributes (callback mode)', async () => {
    render(
      <TelegramLoginButton
        botUsername="my_bot"
        onAuthCallback={mockOnAuthCallback}
        size="medium"
        lang="ru"
        requestAccess="read"
        userPic={false}
      />
    );

    const script = await waitFor(() =>
      document.querySelector('script[src*="telegram-widget.js"]')
    );

    expect(script).toBeInTheDocument();
    expect(script?.getAttribute('data-telegram-login')).toBe('my_bot');
    expect(script?.getAttribute('data-onauth')).toMatch(/^__tg_auth_cb_\d+_[a-z0-9]+\(user\)$/);
    expect(script?.getAttribute('data-request-access')).toBe('read');
    expect(script?.getAttribute('data-size')).toBe('medium');
    expect(script?.getAttribute('data-userpic')).toBe('false');
    expect(script?.getAttribute('data-lang')).toBe('ru');
    expect(script?.getAttribute('data-auth-url')).toBeNull();
  });

  it('calls onAuthCallback when global auth function is invoked', async () => {
    const mockUser: TelegramLoginWidgetData = {
      id: 123,
      first_name: 'John',
      auth_date: Date.now(),
      hash: 'abc123',
    };

    render(
      <TelegramLoginButton
        botUsername="test_bot"
        onAuthCallback={mockOnAuthCallback}
      />
    );

    await waitFor(() => {
      const script = document.querySelector('script[src*="telegram-widget.js"]');
      expect(script).toBeInTheDocument();
    });

    const script = document.querySelector('script[src*="telegram-widget.js"]');
    const onAuthAttr = script?.getAttribute('data-onauth');
    
    expect(onAuthAttr).toBeTruthy();
    expect(onAuthAttr).toMatch(/^__tg_auth_cb_\d+_[a-z0-9]+\(user\)$/);

    const callbackName = onAuthAttr?.replace('(user)', '');
    const callback = window[callbackName as `__tg_auth_cb_${string}`];
    expect(callback).toBeDefined();
    
    callback?.(mockUser);
    expect(mockOnAuthCallback).toHaveBeenCalledWith(mockUser);
  });

  it('injects telegram script tag with auth-url attribute (redirect mode)', async () => {
    const testAuthUrl = 'https://myapp.com/api/auth/telegram';
    
    render(
      <TelegramLoginButton
        botUsername="redirect_bot"
        authUrl={testAuthUrl}
        size="large"
        lang="en"
        requestAccess="write"
        userPic={true}
      />
    );

    const script = await waitFor(() =>
      document.querySelector('script[src*="telegram-widget.js"]')
    );

    expect(script).toBeInTheDocument();
    expect(script?.getAttribute('data-telegram-login')).toBe('redirect_bot');
    expect(script?.getAttribute('data-auth-url')).toBe(testAuthUrl);
    expect(script?.getAttribute('data-onauth')).toBeNull();
    expect(script?.getAttribute('data-request-access')).toBe('write');
    expect(script?.getAttribute('data-size')).toBe('large');
    expect(script?.getAttribute('data-userpic')).toBe('true');
    expect(script?.getAttribute('data-lang')).toBe('en');
  });
});