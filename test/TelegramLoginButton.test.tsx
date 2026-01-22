import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TelegramLoginButton, type TelegramLoginWidgetData } from '../src';

const mockOnAuthCallback = vi.fn<(user: TelegramLoginWidgetData) => void>();

afterEach(() => {
    vi.clearAllMocks();

    document.querySelectorAll('script[src*="telegram-widget.js"]').forEach(el => el.remove());

    Object.keys(window).forEach(key => {
        if (key.startsWith('__tg_auth_cb_')) {
            delete (window as any)[key];
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

    it('injects telegram script tag with correct attributes', async () => {
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
    });

    it('calls onAuthCallback when global auth function is invoked', async () => {
        render(
            <TelegramLoginButton
                botUsername="test_bot"
                onAuthCallback={mockOnAuthCallback}
            />
        );

        let callbackKey: string | undefined;
        await waitFor(() => {
            callbackKey = Object.keys(window).find(k => k.startsWith('__tg_auth_cb_'));
            expect(callbackKey).toBeTruthy();
        });

        const mockUser: TelegramLoginWidgetData = {
            id: 123,
            first_name: 'John',
            auth_date: Date.now(),
            hash: 'abc123',
        };

        (window as any)[callbackKey!](mockUser);

        expect(mockOnAuthCallback).toHaveBeenCalledWith(mockUser);
    });
});