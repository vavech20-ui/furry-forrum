# API для фронтенда (полное описание)

Документ описывает **текущие** HTTP-маршруты бэкенда Django/DRF в `forum/` и то, как с ними работает фронт (`src/api/`).

**Базовый URL API (dev):** `http://127.0.0.1:8000`  
(или задай `VITE_API_URL` в `.env` — см. `.env.example`.)

**Фронт (dev):** `http://localhost:5173`

**CORS:** разрешён origin `http://localhost:5173` (`settings.CORS_ALLOWED_ORIGINS`).

---

## Заголовки

| Заголовок | Когда |
| --------- | ----- |
| `Content-Type: application/json` | JSON-тело (без файлов). |
| `Content-Type: multipart/form-data` | Загрузка `img` / `video` (FormData). |
| `Authorization: Bearer <access>` | Эндпоинты с JWT (см. таблицы). |

Access — **60 минут**, refresh — **7 дней** (`SIMPLE_JWT` в `settings`).

Клиент (`src/api/client.js`) подставляет `Authorization` из `localStorage.access` и при 401 пробует `POST /auth/jwt/refresh/`.

---

## Пользователи и JWT (Djoser)

Префикс: `/auth/` (`djoser.urls` + `djoser.urls.jwt`).

| Назначение | Путь | Auth |
| ---------- | ---- | ---- |
| Регистрация | `POST /auth/users/` | Нет. Тело: `username`, `email`, `password`, `re_password`. |
| Активация | `POST /auth/users/activation/` | Нет. **Сейчас не используется** (`SEND_ACTIVATION_EMAIL = False`). |
| Логин (JWT) | `POST /auth/jwt/create/` | Нет. Тело: `username`, `password`. |
| Refresh | `POST /auth/jwt/refresh/` | Тело: `{ "refresh": "..." }`. |
| Verify | `POST /auth/jwt/verify/` | Тело: `{ "token": "..." }`. |
| Текущий пользователь | `GET` / `PATCH` / `PUT` `/auth/users/me/` | JWT |

**Ответ `/auth/users/me/`** (через `CustomUserSerializer`): в т.ч. `id`, `username`, `email`, **`is_staff`**, **`is_superuser`** — фронт показывает админ-функции при `is_staff || is_superuser`.

Регистрация **без письма активации**: пользователь сразу `is_active=True`.

### Приложение `users`

`path('users/', include('users.urls'))` — `urlpatterns` **пустой**, отдельных URL под `/users/` нет.

---

## Доски, посты, треды (`boards`)

Префикс: `/boards/`.

Порядок в `boards/urls.py`: `posts/`, `threads/`, затем router досок.

### Доски `Board`

| Метод | Путь | Auth | Действие |
| ----- | ---- | ---- | -------- |
| GET | `/boards/` | Нет | Список |
| GET | `/boards/<id>/` | Нет | Одна доска |
| POST | `/boards/` | **Админ** | Создать |
| PUT/PATCH | `/boards/<id>/` | **Админ** | Обновить |
| DELETE | `/boards/<id>/` | **Админ** | Удалить (если нет тредов — `PROTECT`) |

**Поля JSON:** `id`, `slug`, `name`, `description`

**Фронт:** `GET` на главной (фильтр), `POST` — страница `/create-board` (только админ).

---

### Треды `Thread`

| Метод | Путь | Auth | Действие |
| ----- | ---- | ---- | -------- |
| GET | `/boards/threads/` | Нет | Список |
| GET | `/boards/threads/<id>/` | Нет | Один тред |
| POST | `/boards/threads/` | **JWT** | Создать; `author` — сервер |
| PUT/PATCH | `/boards/threads/<id>/` | **JWT** | Обновить |
| DELETE | `/boards/threads/<id>/` | **Админ** | Удалить (+ посты каскадом) |

**Поля**

| Поле | Запись | Примечание |
| ---- | ------ | ---------- |
| `id` | только ответ | |
| `board` | да | id доски (обязательно) |
| `name` | да | |
| `title` | да | |
| `img` | да | обязательно в модели; **multipart** |
| `description` | да | можно пустым |
| `created_at` | только ответ | |
| `is_pinned` | только ответ | |
| `author` | только ответ | id пользователя |

**Фронт:** список на `/`, создание `/create-thread`, просмотр `/threads/:id`, удаление треда на детальной (админ).

---

### Посты `Post`

Глобально `IsAuthenticated` для всех действий `PostViewSet`.

| Метод | Путь | Auth | Действие |
| ----- | ---- | ---- | -------- |
| GET | `/boards/posts/` | **JWT** | Список всех постов |
| GET | `/boards/posts/<id>/` | **JWT** | Один пост |
| POST | `/boards/posts/` | **JWT** | Создать |
| PUT/PATCH | `/boards/posts/<id>/` | **JWT** | Обновить |
| DELETE | `/boards/posts/<id>/` | **JWT** | Удалить |

**Поля:** `id`, `thread`, `content`, `img` (опц.), `video` (опц.: mp4, webm, mov).

**Фронт:** `CommentSection` на странице треда; фильтрация по `thread` на клиенте.

---

## Медиа

В `settings.py`:

- `MEDIA_URL = '/media/'`
- `MEDIA_ROOT = BASE_DIR / 'media'`

В `DEBUG` файлы отдаёт Django (`forum/urls.py`).

URL в JSON часто относительные (`/media/...`). Фронт склеивает с базой API: `src/utils/mediaUrl.js`.

---

## Маршруты фронта (React Router)

| Путь | Страница | API |
| ---- | -------- | --- |
| `/` | Список тредов, фильтр досок | `GET /boards/`, `GET /boards/threads/` |
| `/login` | Вход | `POST /auth/jwt/create/` |
| `/register` | Регистрация | `POST /auth/users/` |
| `/activate/:uid/:token` | Заглушка | активация отключена |
| `/create-board` | Создать доску (админ) | `POST /boards/` |
| `/create-thread` | Создать тред | `POST /boards/threads/` |
| `/threads/:id` | Тред + посты | `GET` тред; посты с JWT |

---

## Коды ответа (DRF)

| Код | Когда |
| --- | ----- |
| 200/201/204 | Успех |
| 400 | Ошибка валидации |
| 401 | Нет/невалидный JWT |
| 403 | Нет прав (например, не админ) |
| 404 | Объект не найден |

---

## Минимальный сценарий (dev)

1. `cd forum` → `python manage.py runserver`
2. `npm run dev` в корне репозитория
3. Создать суперпользователя: `python manage.py createsuperuser`
4. Войти на фронте → при необходимости создать доску (`/create-board`)
5. Создать тред → открыть → войти → добавить посты

---

## Синхронизация

При изменении `urls.py`, `views.py`, сериализаторов или `src/api/` — обнови этот файл и `docs/PROJECT_STATUS.md`.
