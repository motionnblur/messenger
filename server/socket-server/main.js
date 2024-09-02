const { Server } = require("socket.io");
const { performance } = require("perf_hooks");
const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: "redis", // Assuming the Redis service is named 'redis' in your Docker Compose
    port: 6379,
  },
  username: "default",
});
client.connect();

client.on("connect", () => {
  console.log("Redis connected successfully");
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

const io = new Server({
  cors: {
    origin: "*",
  },
});

var list = [];

const setVal = async (key, value) => {
  await client.set(key, value);
};

io.on("connect", (socket) => {
  const t = performance.now();
  list.push({
    key: socket.id,
    time: t,
  });

  setVal(socket.id, t);

  socket.on("message", (messageJson) => {
    list.forEach(async (json) => {
      if (json.key == socket.id) {
        const lastTime = json.time;

        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) / 1000;

        if (deltaTime > 60 * 2) {
          socket.disconnect();
          return;
        }

        io.emit("broadcast", messageJson);
        const value = await client.get(socket.id);
        console.log(value);
      }
    });
  });
});

io.listen(4000);
