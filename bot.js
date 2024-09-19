const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = '8052531741:AAEgtrQtk8X_sNmpBItC9aOGyUR06k6Hq68';
const bot = new TelegramBot(TOKEN, { polling: true });

// Настройка статической папки
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Давай сыграем в игру. Я подброшу монетку, а ты угадаешь сторону. Напиши "орел" или "решка".');
});

// Обработчик текстовых сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userGuess = msg.text.toLowerCase();
    const coinSides = ['орел', 'решка'];
    const coinResult = coinSides[Math.floor(Math.random() * coinSides.length)];

    if (coinSides.includes(userGuess)) {
        if (userGuess === coinResult) {
            bot.sendMessage(chatId, `Ты угадал! Выпало: ${coinResult}.`);
        } else {
            bot.sendMessage(chatId, `Не угадал. Выпало: ${coinResult}. Попробуй еще раз!`);
        }
    } else {
        bot.sendMessage(chatId, 'Пожалуйста, напиши "орел" или "решка".');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});