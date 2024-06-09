import { createBot } from './models/bot.js';
import { respondToMessage, displayBotList } from './controllers/botController.js';
import { displayMessage, saveMessage, loadMessages, clearMessages } from './controllers/messageController.js';


// Création des bots avec leurs propriétés et actions
const bots = [
    createBot('Crypto', 'Je suis le bot Crypto, je peux vous donner le prix actuel des cryptomonnaies.', ['btc', 'eth', 'ltc', 'xrp', 'bnb'], 'https://robohash.org/crypto', 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,ripple,binancecoin&vs_currencies=usd'),
    createBot('Bourse', 'Je suis le bot Bourse, je peux vous donner le prix actuel des actions.', ['apple', 'google', 'amazon', 'microsoft'], 'https://robohash.org/bourse', 'https://api.twelvedata.com/price?symbol=AAPL,GOOGL,AMZN,MSFT&apikey=74c1f4a6a72d485598395edf288464f5'),
    createBot('Rigolo', 'Je suis le bot Rigolo, je sers à rien mais je connais quelques trucs.', ['tech', 'info', 'chuck'], 'https://robohash.org/rigolo', 'https://techy-api.vercel.app/api/json', 'https://uselessfacts.jsph.pl/api/v2/facts/random', 'https://api.chucknorris.io/jokes/random')
];


// Sélection des éléments du DOM
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');

// Charger les messages depuis le localStorage au démarrage
window.addEventListener('load', loadMessages);

// Fonction pour envoyer un message 
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


// Ajout de listeners d'événements pour les boutons et le champ de saisie
sendButton.addEventListener('click', sendMessage);
clearButton.addEventListener('click', clearMessages);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Afficher la liste des bots au démarrage
displayBotList(bots);
