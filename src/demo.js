import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { TelegramLoginButton } from './index';
const App = () => {
    const handleAuth = (data) => {
        console.log('✅ Авторизация успешна:', data);
        alert(`Привет, ${data.first_name}!`);
    };
    return (_jsxs("div", { style: { padding: '2rem', fontFamily: 'sans-serif' }, children: [_jsx("h1", { children: "Telegram Login Widget" }), _jsx("p", { children: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0438\u0436\u0435 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430 \u0447\u0435\u0440\u0435\u0437 Telegram:" }), _jsx(TelegramLoginButton, { botUsername: "dice6gamebot", onAuthCallback: handleAuth, size: "large", lang: "en", userPic: true })] }));
};
createRoot(document.getElementById('root')).render(_jsx(App, {}));
