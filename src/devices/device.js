const WebSocket = require('ws');

const [id] = process.argv.slice(2);

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    console.log('Starting device...', id);
    const data = { data: {
        type: 'device',
        id,
        status: 'On'
    }};
    ws.send(JSON.stringify(data));
});

ws.on('error', (error) => {
    console.error(`Device error: ${error}`);
    const data = { data: {
        type: 'device',
        id,
        status: 'Off'
    }};
    ws.send(JSON.stringify(data));
});

ws.on('close', () => {
    console.log('Shutting down device...', id);
    const data = { data: {
        type: 'device',
        id,
        status: 'Off'
    }};
    ws.send(JSON.stringify(data));
});

process.on('SIGINT', () => {
    console.log('Shutting down device...', id);
    const data = { data: {
        type: 'device',
        id,
        status: 'Off'
    }};
    ws.send(JSON.stringify(data));
    process.exit();
});