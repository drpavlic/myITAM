#!/bin/bash

# Переходим в директорию frontend
cd frontend

# Удаляем существующий node_modules и package-lock.json (если есть)
rm -rf node_modules package-lock.json

# Устанавливаем зависимости и генерируем package-lock.json
npm install

# Проверяем, что файл создался
if [ -f "package-lock.json" ]; then
    echo "✅ package-lock.json успешно создан"
    echo "📦 Размер файла: $(du -h package-lock.json | cut -f1)"
else
    echo "❌ Ошибка: package-lock.json не создан"
    exit 1
fi

# Возвращаемся в корневую директорию
cd ..