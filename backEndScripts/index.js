const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const xlsx=require('xlsx')
const fs=require('fs')
const PORT = 3000;

const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server by passing the HTTP server instance
const wss = new WebSocket.Server({ server });

// Serve static files (optional, but you may want to serve HTML, CSS, etc.)
app.use(express.static('public'));

// Event handler for WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected!!!');

  // Event handler for WebSocket messages from clients (optional)
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Event handler for WebSocket connection closing
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the HTTP server

server.listen(PORT, () => {
  console.log(`Server is listening on port!! ${PORT}`);
});