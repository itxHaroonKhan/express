const socket = io();
const input = document.getElementById('message');
const SendBtn = document.getElementById('SendBtn');
const chatBox = document.getElementById('chat-box');
const socketIdSpan = document.getElementById('socket-id');

// Apni Socket ID show karna
socket.on('your id', (id) => {
    console.log("🔵 Your Socket ID:", id);
    socketIdSpan.textContent = id;
});

// Message Send karna
SendBtn.addEventListener('click', () => {
    if (input.value.trim()) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// Message Receive karna aur UI Update
socket.on('chat message', (data) => {
    console.log(`📩 Message from [${data.socketId}]: ${data.message}`);
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `[${data.socketId}] ${data.message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});
