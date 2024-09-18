import { useEffect, useState } from 'react';
import './App.css';

function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("connected");
      setSocket(socket);
    };

    return () => {
      socket.close();
    };
  }, []);

  return socket;
}

function App() {
  const socket = useSocket();
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => { // Changed parameter name to event for clarity
        console.log("Received message", event.data);
        setLatestMessage(event.data);
      };
    }
  }, [socket]); // Added socket to the dependency array

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <input onChange={(e) => setMessage(e.target.value)} value={message}></input> {/* Added value attribute to input */}
      <button onClick={() => {
        socket.send(message);
        setMessage(""); // Clear input after sending
      }}>
        Send
      </button>
      {latestMessage}
    </>
  );
}

export default App;
