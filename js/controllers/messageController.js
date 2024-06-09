// Affichage des messages dans la fenêtre de chat 
export const displayMessage = (sender, message, type, profilePicture = '', timestamp) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    if (type === 'bot') {
        messageElement.innerHTML = `<div><img src="${profilePicture}" alt="${sender}" class="bot-image"> <span><b>${sender}</b> :</span> <span>${message}</span></div><div class="timestamp">${timestamp}</div>`;
    } else {
        messageElement.innerHTML = `<div><span><b>${sender}</b> :</span> <span>${message}</span></div><div class="timestamp">${timestamp}</div>`;
    }
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
};

// Sauvegarde des messages dans le localStorage
export const saveMessage = (sender, message, type, profilePicture, timestamp) => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ sender, message, type, profilePicture, timestamp });
    localStorage.setItem('messages', JSON.stringify(messages));
};

// Chargement des messages depuis le localStorage
export const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(msg => displayMessage(msg.sender, msg.message, msg.type, msg.profilePicture, msg.timestamp));
};

// Suppression des messages du localStorage et dans la fenêtre de chat
export const clearMessages = () => {
    localStorage.removeItem('messages');
    document.getElementById('messages').innerHTML = '';
};
