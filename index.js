const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Static Files (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log(`✅ User Connected: ${socket.id}`);

    // User ko uski ID send karna
    socket.emit('your id', socket.id);

    socket.on('chat message', (msg) => {
        console.log(`📩 Message Received from [${socket.id}]: ${msg}`);
        io.emit('chat message', { socketId: socket.id, message: msg });
    });

    socket.on('disconnect', () => {
        console.log(`❌ User Disconnected: ${socket.id}`);
    });
});

server.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
});
