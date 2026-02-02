import { createRoot } from 'react-dom/client';

import { TelegramLoginButton, type TelegramLoginWidgetData } from './index';

const componentCode = `<TelegramLoginButton
  botUsername="dice6gamebot"
  onAuthCallback={handleAuth}
  size="large"
  lang="en"
  userPic={true}
  radius={12}
  loadingComponent={<p>Загрузка...</p>}
/>`;

// eslint-disable-next-line react-refresh/only-export-components
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
                radius={12}
                loadingComponent={<p>Загрузка...</p>}
            />
            <div style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1em' }}>Пример использования:</h2>
                <pre style={{
                    backgroundColor: '#f5f5f5',
                    padding: '1rem',
                    borderRadius: '6px',
                    overflowX: 'auto',
                    border: '1px solid #e0e0e0',
                    marginTop: '1rem',
                    fontSize: '14px',
                    lineHeight: 1.4
                }}>
                    <code>{componentCode}</code>
                </pre>
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<App />);