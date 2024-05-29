import { createBot, respondToMessage } from './bot.js';

const bots = [
    createBot('Crypto', 'Je suis le bot Crypto.', ['btc', 'eth', 'ltc', 'xrp', 'bnb'], 'https://robohash.org/crypto', 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,ripple,binancecoin&vs_currencies=usd'),
    createBot('Bourse', 'Je suis le bot Bourse.', ['apple', 'google', 'amazon', 'microsoft'], 'https://robohash.org/bourse', 'https://api.twelvedata.com/price?symbol=AAPL,GOOGL,AMZN,MSFT&apikey=74c1f4a6a72d485598395edf288464f5'),
    createBot('Rigolo', 'Je suis le bot Rigolo.', ['tech', 'info'], 'https://robohash.org/rigolo', 'https://techy-api.vercel.app/api/json', 'https://uselessfacts.jsph.pl/api/v2/facts/random')
];

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');
const messagesDiv = document.getElementById('messages');
const botList = document.getElementById('bot-list');

// Charger les messages depuis le localStorage au démarrage
window.addEventListener('load', () => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(msg => displayMessage(msg.sender, msg.message, msg.type, msg.profilePicture, msg.timestamp));
});

const sendMessage = () => {
    const message = messageInput.value.trim();
    if (message) {
        const timestamp = new Date().toLocaleTimeString();
        displayMessage('Vous', message, 'user', '', timestamp);
        saveMessage('Vous', message, 'user', '', timestamp);
        bots.forEach(bot => respondToMessage(bot, message));
        messageInput.value = '';
    }
};

const displayMessage = (sender, message, type, profilePicture = '', timestamp) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    if (type === 'bot') {
        messageElement.innerHTML = `<div><img src="${profilePicture}" alt="${sender}" class="bot-image"> <span>${sender}: ${message}</span></div><div class="timestamp">${timestamp}</div>`;
    } else {
        messageElement.innerHTML = `<div><span>${sender}: ${message}</span></div><div class="timestamp">${timestamp}</div>`;
    }
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

const saveMessage = (sender, message, type, profilePicture, timestamp) => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ sender, message, type, profilePicture, timestamp });
    localStorage.setItem('messages', JSON.stringify(messages));
};

const clearMessages = () => {
    localStorage.removeItem('messages');
    messagesDiv.innerHTML = '';
};

const displayBotList = (bots) => {
    bots.forEach(bot => {
        const botItem = document.createElement('li');
        botItem.innerHTML = `<img src="${bot.profilePicture}" alt="${bot.name}" class="bot-image"> ${bot.name}`;
        botItem.addEventListener('click', () => {
            const timestamp = new Date().toLocaleTimeString();
            const commandList = bot.actions.join(', ');
            const description = `${bot.description} Commandes: ${commandList}.`;
            displayMessage(bot.name, description, 'bot', bot.profilePicture, timestamp);
            saveMessage(bot.name, description, 'bot', bot.profilePicture, timestamp);
        });
        botList.appendChild(botItem);
    });
};

sendButton.addEventListener('click', sendMessage);
clearButton.addEventListener('click', clearMessages);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Afficher la liste des bots au démarrage
displayBotList(bots);
