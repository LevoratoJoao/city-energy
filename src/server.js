const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const bodyParser = require('body-parser');
const deviceRoutes = require('./routes/deviceRoutes');
const technicianRoutes = require('./routes/technicianRoutes');
const devicesService = require('./services/devicesService');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use('/api/devices', deviceRoutes);
app.use('/api/technician', technicianRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

app.get('/', (req, res) => {
    res.send('City Energy Consumption API');
});

app.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/client.html'));
});

// WebSocket Server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (message) => {
        const json = JSON.parse(message);
        console.log('Received message:', json.data);
        if (json !== null && json.data.type === 'device') {
            devicesService.updateDevice(json.data.id, json.data.status);
        }
    });
});

// Upgrade HTTP server to WebSocket server
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});