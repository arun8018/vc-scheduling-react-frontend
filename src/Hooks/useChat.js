import {useState,useEffect} from "react";
import io from "socket.io-client";

export default function useChat(id) {
  const [message, setMessage] = useState([]);
    useEffect(() => {
    const socket = io.connect(
        "https://vc-petco-client.litmus7.com:1367/notifications"
      );
    socket.emit("join", { room: id });
    socket.on("update_message", (data) => {
      console.log(data);
      setMessage((message) => [...message, data]);
    });
    }, [id]);

    const sendMessage = (newMessage) => {
        console.log(newMessage);
        
        setMessage((message) => [...message, { message:newMessage,type:"customer" }]);
    }
    console.log(message);
  return { message,sendMessage };
}
