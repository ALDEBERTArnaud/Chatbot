export const createBot = (name, description, actions, profilePicture, apiEndpoint, secondaryApiEndpoint = null) => ({
    name,
    description,
    actions,
    profilePicture,
    apiEndpoint,
    secondaryApiEndpoint
});

export const respondToMessage = (bot, message) => {
    if (message === 'au rapport') {
        commonResponse(bot);
    } else {
        bot.actions.forEach(action => {
            if (message.includes(action)) {
                performAction(bot, action);
            }
        });
    }
};

const performAction = (bot, action) => {
    let apiEndpoint = bot.apiEndpoint;
    if (bot.name === 'Rigolo' && action === 'info') {
        apiEndpoint = bot.secondaryApiEndpoint;
    }

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
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
                'info': data.text
            };

            const message = actionMap[action] !== undefined ? `${actionMap[action]}` : 'Action inconnue.';
            const timestamp = new Date().toLocaleTimeString();
            displayMessage(bot.name, message, 'bot', bot.profilePicture, timestamp);
            saveMessage(bot.name, message, 'bot', bot.profilePicture, timestamp);
        })
        .catch(error => console.error('Erreur:', error));
};

const commonResponse = (bot) => {
    const message = 'Oui chef !';
    const timestamp = new Date().toLocaleTimeString();
    displayMessage(bot.name, message, 'bot', bot.profilePicture, timestamp);
    saveMessage(bot.name, message, 'bot', bot.profilePicture, timestamp);
};

const displayMessage = (sender, message, type, profilePicture = '', timestamp) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    if (type === 'bot') {
        messageElement.innerHTML = `<div><img src="${profilePicture}" alt="${sender}" class="bot-image"> <span>${sender}: ${message}</span></div><div class="timestamp">${timestamp}</div>`;
    } else {
        messageElement.innerHTML = `<div><span>${sender}: ${message}</span></div><div class="timestamp">${timestamp}</div>`;
    }
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
};

const saveMessage = (sender, message, type, profilePicture, timestamp) => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ sender, message, type, profilePicture, timestamp });
    localStorage.setItem('messages', JSON.stringify(messages));
};
