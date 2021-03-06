# dev-template

Шаблон разработки на все случаи жизни... Наверное

## Начало работы

Сначала скопируйте репозиторий к себе, командой `git clone`, или скачав его через браузер.

После того, как вы скачаете репозиторий к себе на компьютер зайдите в папку репозитория у себя на компьютере и откройте консоль.
Например, в Windows, запустите консоль и введите:

```cmd
cd /d Путь_к_папке
```

### Зависимости

Теперь вам нужно установить все зависимости проекта.

1. Предварительно установите `npm` или `yarn` с официального сайта.
2. Напишите в консоле `npm install` или `yarn install` для установки зависимостей.

### Структура проекта

- `build` - Собранный проект. Сборка осуществляется по средствам `gulp`
- `src` - Исходные файлы.

#### src

В каталоге `src` находятся:

- `js` - Файлы для отдельного подключения (Например на конкретной странице)
  - `modules` - Здесь разбитый по файлам код для удобной поддержки
- `style` - Файлы для отдельного подключения (Например на конкретной странице)
  - `common` - Основные стили
  - `mixins` - Миксины scss
  - `utils` - Какие-либо служебные части
- `img` - Папка с картинками. Будет скопиравана в сборку с сохранением иерархии каталогов, но картинки будут минимизированны
- `fonts` - Шрифты будут просто перемещенны в сборку
- `pages` - Страницы в pug
  - `common` - Основные части
  - `includes` - Подключаемые части. Папки для конкретной страницы (Секции, если у нее есть необходимые для разбивки части)

### Изменение зависимых файлов

После выполнения всех предыдущих действий вы почти готовы к работе с моим dev-kit.
Но осталось еще чуть-чуть.

Следует изменить файлы:

- `package.json` - Поля **name**, **version**, **description**, **author**

Для запуска процесса сборки следует написать в консоль, предварительно открыв ее в каталоге проекта, следующюю команду:

#### Для запуска режима разработки

```cmd
npm run start
```

#### Для запуска режима сборки

```cmd
npm run build
```

#### Для запуска только сервера

```cmd
npm run server
```

#### Для очистки и новой оптимизации картинок (Можно использовать с одновременно запущенным режимом разработки)

```cmd
npm run imageMinify
```

Все, теперь остается только работа с исходными файлами - каталог `src`

## Версия

`1.0.0`

## Автор

Alexandr Shamanin (@slpAkkie)

## Лицензия

MIT
