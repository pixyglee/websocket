import { useEffect, useState } from 'react';
import './App.css';

// Custom hook to manage WebSocket connection
function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null); // State to store WebSocket instance

  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket("ws://localhost:8080");

    // Event handler for when the WebSocket connection is opened
    socket.onopen = () => {
      console.log("connected");
      setSocket(socket); // Update state with the WebSocket instance
    };

    // Cleanup function to close the WebSocket connection when component unmounts
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return socket; // Return the WebSocket instance
}

// Main App component
function App() {
  const socket = useSocket(); // Use the custom hook to get WebSocket instance
  const [latestMessage, setLatestMessage] = useState(""); // State to store the latest received message
  const [message, setMessage] = useState(""); // State to store the message to be sent

  useEffect(() => {
    if (socket) {
      // Event handler for receiving messages from the WebSocket
      socket.onmessage = (event) => {
        console.log("Received message", event.data);
        setLatestMessage(event.data); // Update state with the received message
      };
    }
  }, [socket]); // Dependency array includes socket to re-run effect if socket changes

  if (!socket) {
    return <div>Loading...</div>; // Display loading message until WebSocket is connected
  }

  return (
    <>
      {/* Input field to enter message */}
      <input 
        onChange={(e) => setMessage(e.target.value)} 
        value={message} 
      />
      {/* Button to send the message */}
      <button onClick={() => {
        socket.send(message); // Send the message via WebSocket
        setMessage(""); // Clear input after sending
      }}>
        Send
      </button>
      {/* Display the latest received message */}
      {latestMessage}
    </>
  );
}

export default App;
