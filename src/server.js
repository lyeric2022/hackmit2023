

const mqtt = require('mqtt');
const express = require('express');
const app = express();
const http = require('http').createServer(app);

// MQTT connection setup
const client = mqtt.connect('mqtt://192.168.192.239:1883');

// Subscribe to MQTT topics
client.subscribe('SENSORS');

// Handle incoming MQTT messages
client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  // Process the MQTT message as needed
});

client.on('connect', () => {
    console.log('Connected to MQTT broker');
  });
  

// HTTP server routes and other code here

// Start the HTTP server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});