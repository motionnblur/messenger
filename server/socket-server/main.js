const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  socket.on("message", (messageJson) => {
    io.emit("broadcast", messageJson);
  });
});

io.listen(4000);
