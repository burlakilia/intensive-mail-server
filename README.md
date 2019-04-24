## Учебный почтовый сервер

Данный сервер используется курса по JS, досутпен по url `https://intensive-mail-server.herokuapp.com`.

## API

В основном данный сервис, является прокси для сревиса yandex connect. 
Все данные между сервером и клиентом передаются в формает `application/json`.
Все овтеты содержат поле `success` - которое говорит о результате выполнения запроса.

### Обработка ошибок
Если серевер не смог обработать запрос клиента, то он вернет следующий объект ошибки
```
   {
        success: false,
        message: 'сообщение, что пошло не так',
        ... // также может содержать дополнительные данные, которые описывают что именно произошло
   } 
```

### Auth
Авторизация и регистрация пользователя

#### Регистрация

`Запрос`
```
    Path: /auth/sinup
    Method: POST
    Body: {
        name: 'llia', // имя пользователя будт
        pwd: 'password' // пароль
    }
```

`Успешный ответ`
```
   {
        success: true,
        token: 'уникальный идентификатор сессии'
   } 
```

#### Авторизация
`Запрос`
```
    Path: /auth/signin
    Method: POST
    Body: {
        email: 'llia', // почта пользователя
        pwd: 'password' // пароль
    }
```

`Успешный ответ`
```
   {
        success: true,
        token: 'уникальный идентификатор сессии'
   } 
```

### Settings
Получение подробных данных о пользователе и интерфейсы для его редактирования


#### Получение профиля текушего пользователя
Получить профиль текущего пользователя

`Запрос`
```
    Path: /settings/
    Method: GET
```

Формат ответа, 

```json
{
 "about": "<описание сотрудника>",
 "aliases": [<псевдоним1>, <псевдоним2>, ...],
 "birthday": "гггг-мм-дд",
 "contacts": [ {
                "alias": <true|false>,
                "label": "<описание|заголовок контакта>",
                "main": <true|false>,
                "synthetic": <true|false>,
                "type": "<email|phone_extension|phone|site|icq|twitter|facebook|skype>",
                "value": "<значение контакта>"
 	       },
               ...
             ],
 "department_id": "<id отдела>",
 "gender": "<male|female>",
 "is_admin": "<true|false>",
 "is_dismissed": "<true|false>",
 "name": {
          "first": "<имя_сотрудника>",
          "last": "<фамилия_сотрудника>",
          "middle": "<отчество сотрудника>"
         },
 "nickname": "<логин>",
 "password": "<пароль сотрудника>",
 "position": "<должность>"
}
```

#### Изменения профиля
Получить профиль текущего пользователя

`Запрос`
```
    Path: /settings/
    Method: POST,
    Body: {
        "about": "<описание сотрудника>",
         "aliases": [<псевдоним1>, <псевдоним2>, ...],
         "birthday": "гггг-мм-дд",
         "contacts": [ {
                        "alias": <true|false>,
                        "label": "<описание|заголовок контакта>",
                        "main": <true|false>,
                        "synthetic": <true|false>,
                        "type": "<email|phone_extension|phone|site|icq|twitter|facebook|skype>",
                        "value": "<значение контакта>"
         	       },
                       ...
                     ],
         "department_id": "<id отдела>",
         "gender": "<male|female>",
         "is_admin": "<true|false>",
         "is_dismissed": "<true|false>",
         "name": {
                  "first": "<имя_сотрудника>",
                  "last": "<фамилия_сотрудника>",
                  "middle": "<отчество сотрудника>"
                 },
         "nickname": "<логин>",
         "password": "<пароль сотрудника>",
         "position": "<должность>"
    }
```

В ответ придет или ошибка, или просто ответ success = true.


### Спиоск писем
Получения подробной инофрмации по письмам пользователя (пока только в папке INBOX)

`Запрос`
```
    Path: /messages/
    Method: POST
```

