const { join } = require("path");

const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Socket mapping
const socketMap = {};
const getAllClients = (id) => {
  // checking all the rooms in the adapters ad getting specific room
  return Array.from(io.sockets?.adapter?.rooms.get(id) || []).map(
    (userSocketId) => {
      return {
        userSocketId,
        userName: socketMap[userSocketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  //   console.log("Socket:", socket);
  //   console.log("Socket is active to be connected");

  socket.on("chat", (payload) => {
    console.log("Payload:", payload);
    io.emit("chat", payload);
  });
});

io.on("connection", (socket) => {
  socket.on("join", ({ id, username }) => {
    socketMap[socket.id] = username;
    // making socket join the room
    socket.join(id);

    // const allClients = getAllClients(id);

    // getting all clients detail
    // allClients.forEach(({ userSocketId }) => {
    //   // message emit to every participant
    //   io.to(userSocketId).emit("joined", {
    //     allClients,
    //     userName,
    //     userSocketId: socket.id,
    //   });
    // });
  });
});

server.listen(5000, () => {
  console.log("server listening on port 5000");
});
