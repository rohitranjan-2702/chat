import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import { useNavigate, useParams, Navigate } from "react-router-dom";

const socket = io.connect("http://localhost:5000");
// const username = nanoid(4);
// let username = "";
// JSON.parse(localStorage.getItem("username", username));
console.log(JSON.parse(localStorage.getItem("username", username)));
// username = username;

const ChatRoom = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  // const location = useLocation();
  const reactNavigator = useNavigate();
  const { id } = useParams();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    socket.emit("join", { id, username });
    // socket.on("join", ({}))
  });
  // const username = user;

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { msg });
    setMsg("");
    // console.log(username);
  };

  console.log("user" + username);
  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });
  return (
    <>
      <div className="App">
        <h1>CHATTT</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.msg}:{" "}
              <span style={{ color: "red" }}>by {payload.username}</span>
            </p>
          );
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            placeholder="send text"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button type="submit"> send </button>
        </form>
      </div>
    </>
  );
};

export default ChatRoom;
