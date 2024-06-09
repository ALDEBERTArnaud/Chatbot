import { displayMessage, saveMessage } from './messageController.js';

// Répondre à un message en fonction de l'action
export const respondToMessage = (bot, message) => {
    if (message === 'au rapport') {
        commonResponse(bot); // Réponse commune pour "au rapport"
    } else {
        bot.actions.forEach(action => {
            if (message.includes(action)) {
                performAction(bot, action); // Exécuter l'action correspondante
            }
        });
    }
};

// Requête à l'API en fonction du bot et de l'action 
const performAction = (bot, action) => {
    let apiEndpoint = bot.apiEndpoint;
    if (bot.name === 'Rigolo' && action === 'info') {
        apiEndpoint = bot.secondaryApiEndpoint; // Utiliser l'API secondaire pour "info"
    }
    if (bot.name === 'Rigolo' && action === 'chuck') {
        apiEndpoint = bot.thirdApiEndpoint; // Utiliser l'API tertiaire pour "chuck"
    }

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            // Mapper les actions aux réponses de l'API
            const actionMap = {
                'btc': data.bitcoin?.usd ? `${data.bitcoin.usd} USD` : undefined,
                'eth': data.ethereum?.usd ? `${data.ethereum.usd} USD` : undefined,
                'ltc': data.litecoin?.usd ? `${data.litecoin.usd} USD` : undefined,
                'xrp': data.ripple?.usd ? `${data.ripple.usd} USD` : undefined,
                'bnb': data.binancecoin?.usd ? `${data.binancecoin.usd} USD` : undefined,
                'apple': data.AAPL?.price ? `${data.AAPL.price} USD` : undefined,
                'google': data.GOOGL?.price ? `${data.GOOGL.price} USD` : undefined,
                'amazon': data.AMZN?.price ? `${data.AMZN.price} USD` : undefined,
                'microsoft': data.MSFT?.price ? `${data.MSFT.price} USD` : undefined,
                'tech': data.message,
                'info': data.text,
                'chuck': data.value
            };

            // Afficher et sauvegarder le message de la réponse
            const message = actionMap[action] !== undefined ? `${actionMap[action]}` : 'Action inconnue.';
            const timestamp = new Date().toLocaleTimeString();
            displayMessage(bot.name, message, 'bot', bot.profilePicture, timestamp);
            saveMessage(bot.name, message, 'bot', bot.profilePicture, timestamp);
        })
        .catch(error => console.error('Erreur:', error)); // Gérer les erreurs de requête
};

// Réponse commune à une action
const commonResponse = (bot) => {
    const message = 'Oui chef !';
    const timestamp = new Date().toLocaleTimeString();
    displayMessage(bot.name, message, 'bot', bot.profilePicture, timestamp);
    saveMessage(bot.name, message, 'bot', bot.profilePicture, timestamp);
};

// Afficher la liste des bots
export const displayBotList = (bots) => {
    const botList = document.getElementById('bot-list');
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
