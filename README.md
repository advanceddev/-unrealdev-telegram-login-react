# Telegram Login React

React компонент для интеграции [Telegram Login Widget](https://core.telegram.org/widgets/login) в ваши приложения. Поддерживает **React**, **Next.js (App Router)**, **TypeScript** и полностью типизирован.

> ⚠️ **Важно**: Валидацию данных авторизации (`hash`) необходимо выполнять **на сервере** с использованием секретного токена вашего бота. Никогда не проверяйте `hash` на клиенте!

---

## 📦 Установка

```bash
npm install @advanceddev/telegram-login-react
```
или
```bash
yarn add @advanceddev/telegram-login-react
```

## 🚀 Быстрый старт

#### 1. Настройте бота в Telegram
- Создайте бота через @BotFather
- Выполните команду /setdomain и укажите домен вашего сайта (например, 127.0.0.1 для разработки или myapp.com для production)

#### 2. Используйте компонент

```tsx
import { TelegramLoginButton } from '@advanceddev/telegram-login-react';

const App = () => {
  const handleAuth = (user) => {
    console.log('User authenticated:', user);
    // Отправьте данные на ваш бэкенд для валидации!
  };

  return (
    <TelegramLoginButton
      botUsername="your_bot_username"
      onAuthCallback={handleAuth}
      size="large"
      lang="en"
    />
  );
};
```

Prop | Type | Required | Default | Description 
--- | --- | --- | --- | --- |
botUsername | string | ✅ | - | Имя вашего Telegram-бота (например, my_test_bot)
onAuthCallback | (user: TelegramLoginWidgetData) => void | ✅ | - | Колбэк, вызываемый после успешной авторизации
requestAccess | 'read' \| 'write' | ❌ | 'write' | Уровень доступа к данным пользователя
size | 'small' \| 'medium' \| 'large' | ❌ | 'large' | Размер кнопки
userPic | boolean | ❌ | true | Показывать аватар пользователя
lang | 'en' \| 'ru' \| 'uk' \| 'de' \| 'it' \| 'es' \| 'pt' \| 'tr' \| 'fa' \| 'ar' | ❌ | 'en' | Язык виджета
className | string | ❌ | '' | CSS-класс для контейнера


#### Тип TelegramLoginWidgetData

```typescript
interface TelegramLoginWidgetData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number; // Unix timestamp
  hash: string; // Подпись для валидации на сервере
}
```
## 🧪 Примеры использования
#### Базовый пример
```tsx
<TelegramLoginButton
  botUsername="my_bot"
  onAuthCallback={(user) => alert(`Hello, ${user.first_name}!`)}
/>
```
#### Кастомизация

```tsx
<TelegramLoginButton
  botUsername="my_bot"
  onAuthCallback={handleAuth}
  requestAccess="read"
  size="small"
  userPic={false}
  lang="ru"
  className="my-custom-class"
/>
```

#### В Next.js (App Router)

Компонент автоматически помечен как клиентский ('use client'), поэтому его можно использовать напрямую:

```tsx
// app/page.tsx
import { TelegramLoginButton } from '@advanceddev/telegram-login-react';

export default function LoginPage() {
  return (
    <div>
      <h1>Login with Telegram</h1>
      <TelegramLoginButton
        botUsername="my_bot"
        onAuthCallback={(user) => console.log(user)}
      />
    </div>
  );
}
```

## ⚠️ Безопасность

- Никогда не проверяйте hash на клиенте — это позволяет подделать авторизацию.
- Все данные, полученные в onAuthCallback, должны быть отправлены на ваш сервер.
- На сервере проверьте hash по алгоритму из [официальной документации](https://core.telegram.org/widgets/login?spm=a2ty_o01.29997173.0.0.44255171L0PWcI#checking-authorization).

## 📄 Лицензия

MIT © Ivan Lomovtcev (https://t.me/frntbck)
