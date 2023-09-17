const mqtt = require("mqtt");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const WebSocket = require("ws");
const axios = require("axios");

// MQTT connection setup
const client = mqtt.connect("mqtt://192.168.192.239:1883");

// Subscribe to MQTT topics
client.subscribe("SENSORS");

// WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  // Forward MQTT messages to WebSocket clients
  client.on("message", (topic, message) => {
    const data = { topic: topic.toString(), message: message.toString() };
    ws.send(JSON.stringify(data));
  });

  // Handle WebSocket client disconnection
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

// // Handle incoming MQTT messages
// client.on("message", (topic, message) => {
//   console.log(`Received message on topic ${topic}: ${message.toString()}`);
//   // Process the MQTT message as needed
// });

// Attach WebSocket server to the HTTP server
http.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

// HTTP server routes and other code here

// Start the HTTP server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
