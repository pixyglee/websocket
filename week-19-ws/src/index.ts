// Import the WebSocket module and WebSocketServer from 'ws' package
import WebSocket, { WebSocketServer } from 'ws';
// Import the 'http' module to create an HTTP server
import http from 'http';

// Create an HTTP server to handle incoming requests
const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    // Respond with "hi there" for any incoming HTTP request
    response.end("hi there");
});

// Create a new WebSocketServer and attach it to the HTTP server
const wss = new WebSocketServer({ server });
let userCount = 0; // Initialize a user counter

// Event listener for new WebSocket connections
wss.on('connection', function connection(ws) {

  // Handle errors on the WebSocket connection
  ws.on('error', console.error);

  // Event listener for receiving messages from the client
  ws.on('message', function message(data, isBinary) {
    // Broadcast the received message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        // Send the message to clients; support for binary messages if needed
        client.send(data, { binary: isBinary });
      }
    });
  });

  // Increment the user count and log it when a new user connects
  console.log("let userCount:", ++userCount);

  // Send a welcome message to the newly connected client
  ws.send('Hello! Message From Server!!');
});

// Start the HTTP server on port 8080 and log the listening status
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
