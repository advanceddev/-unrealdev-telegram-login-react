# Contributing to Telegram Login React

Спасибо, что хотите внести вклад в `@advanceddev/telegram-login-react`! ❤️  
Этот документ поможет вам начать работу.


## Code of Conduct

Этот проект следует [Кодексу поведения Contributor Covenant](CODE_OF_CONDUCT.md).  
Пожалуйста, ознакомьтесь с ним перед участием.

## How Can I Contribute?

### Reporting Bugs

**Если вы нашли баг:**

1. Убедитесь, что баг не дублируется (проверьте [issues](https://github.com/advanceddev/-unrealdev-telegram-login-react/issues))
2. Откройте новый issue с:
   - Чётким описанием проблемы
   - Шагами для воспроизведения
   - Версией пакета
   - Ожидаемым и фактическим поведением

### Suggesting Enhancements

**Для предложений по улучшению:**

1. Проверьте существующие [discussions](https://github.com/advanceddev/-unrealdev-telegram-login-react/discussions)
2. Создайте новое обсуждение или issue с:
   - Описанием проблемы
   - Предлагаемым решением
   - Примерами использования

### Pull Requests

**Перед отправкой PR:**

1. Обсудите изменения в issue (для крупных фич)
2. Следуйте [стандартам кодирования](#coding-standards)
3. Напишите тесты
4. Обновите документацию при необходимости

## Development Setup

1. **Форкните репозиторий** и клонируйте его:
   ```bash
   git clone git@github.com:advanceddev/-unrealdev-telegram-login-react.git
   cd telegram-login-react
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите демо-приложение:
   ```bash
   npm run dev
   ```
   → Откройте http://127.0.0.1:80

4. Запустите тесты:
   ```bash
   npm test
   ```

## Coding Standards

- TypeScript: строгая типизация, noImplicitAny
- React: функциональные компоненты, хуки
- Стиль кода: следуем настройкам ESLint в проекте
- Именование:
  - Компоненты: `PascalCase`
  - Переменные: `camelCase`
  - Константы: `UPPER_SNAKE_CASE`

## Testing

Все новые функции должны быть покрыты тестами:

- Используйте `vitest` + `@testing-library/react`
- Тестируйте оба режима: `callback` и `redirect`
- Проверяйте корректность атрибутов script-тега

Запуск тестов:

```bash
npm test          # запуск в watch-режиме
npm test -- --run # однократный запуск
```

## Documentation

- Обновляйте `README.md` при добавлении новых пропсов
- Добавляйте примеры использования

## License

Любой вклад в этот проект автоматически лицензируется под MIT License.

