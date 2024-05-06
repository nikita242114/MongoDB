// Создание композитного индекса
db.users.createIndex({ first_name: 1, last_name: 1 });

// Проверка использования индекса
db.users.find({ first_name: "Имя", last_name: "Фамилия" }).explain("executionStats");