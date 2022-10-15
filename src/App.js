import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./App.css";
function App() {
  const host = "http://localhost:5000/";
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState();
  useEffect(() => {
    socketRef.current = io.connect(host);
    console.log(socketRef.current);
    socketRef.current.on("getId", (id) => {
      // console.log({ 1: 1, id });
      console.log(id);
      setUserId(socketRef.current.id);
    });
    socketRef.current.on("sendDataServer", (data) => {
      console.log( messages );
      setMessages([...messages, data.data.content]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [messages]);
  const sendMessage = () => {
    if (message?.length > 0) {
      console.log(2);
      const msg = {
        content: message,
        id: userId,
      };
      socketRef.current.emit("sendDataClient", msg);
      setMessage("");
    }
  };
  console.log({ messages, userId, socketRef: socketRef.current });
  return (
    <div className="App">
      <h1>Chat App</h1>
      {messages.map((message) => (
        <p>{message}</p>
      ))}
      <input
        type={"text"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
