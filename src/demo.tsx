import { createRoot } from 'react-dom/client';
import { TelegramLoginButton, type TelegramLoginWidgetData } from './index';

const App = () => {
    const handleAuth = (data: TelegramLoginWidgetData) => {
        console.log('✅ Авторизация успешна:', data);
        alert(`Привет, ${data.first_name}!`);
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Telegram Login Widget</h1>
            <p>Нажмите кнопку ниже для входа через Telegram:</p>

            <TelegramLoginButton
                botUsername="dice6gamebot"
                onAuthCallback={handleAuth}
                size="large"
                lang="en"
                userPic={true}
            />
        </div>
    );
};

createRoot(document.getElementById('root')!).render(<App />);