import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/ChatRoom";

// no dotenv
// const socket = io.connect("http://localhost:5000");
// const username = nanoid(4);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chat/:id" element={<ChatRoom />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
