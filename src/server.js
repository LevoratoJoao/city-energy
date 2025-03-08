import express from 'express';
import { WebSocketServer } from 'ws';
import { join } from 'path';

import bodyParser from 'body-parser';
const { json } = bodyParser;

import deviceRoutes from './routes/deviceRoutes.js';
import technicianRoutes from './routes/technicianRoutes.js';
import deviceService from './services/devicesService.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(json());
app.use('/api/devices', deviceRoutes);
app.use('/api/technician', technicianRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

app.get('/', (req, res) => {
    res.send('City Energy Consumption API');
});

app.get('/client', (req, res) => {
    res.sendFile(join(__dirname, '../public/client.html'));
});

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', async (message) => {
        const json = JSON.parse(message);
        console.log('Received message:', json.data);
        if (json !== null && json.data.type === 'device') {
            deviceService.updateDevice(json.data.id, json.data.status);
        }
    });
});

// Upgrade HTTP server to WebSocket server
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});