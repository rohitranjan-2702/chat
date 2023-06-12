import React from "react";
import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const createRoom = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    //Implementing navigation
    navigate(`/chat/${roomId}`, {
      state: {
        username,
      },
    });
  };
  return (
    <>
      <div className="App">
        <h1>JOIN ROOM</h1>
        <form onSubmit={createRoom}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="room id"
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          />
          <button type="submit"> join </button>
        </form>
      </div>
    </>
  );
};

export default HomePage;
