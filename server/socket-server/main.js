const { Server } = require("socket.io");
const { performance } = require("perf_hooks");

const io = new Server({
  cors: {
    origin: "*",
  },
});

var list = [];

io.on("connect", (socket) => {
  list.push({
    key: socket.id,
    time: performance.now(),
  });

  socket.on("message", (messageJson) => {
    list.forEach((json) => {
      if (json.key == socket.id) {
        const lastTime = json.time;

        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) / 1000;

        if (deltaTime > 60 * 2) {
          socket.disconnect();
          return;
        }

        io.emit("broadcast", messageJson);
      }
    });
  });
});

io.listen(4000);
