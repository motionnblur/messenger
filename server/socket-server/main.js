const { Server } = require("socket.io");
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
  console.log("Redis was connected successfully");
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  socket.on("message", async (messageJson) => {
    const value = await client.get("sessionId");

    if (value === null || value === undefined) {
      socket.disconnect();
      return;
    }
    if (messageJson.message.length > 100) {
      socket.emit("error", {
        errorMessage: "Message length should be equal or less than 100",
      });
      return;
    }
    io.emit("broadcast", messageJson);
  });
});

io.listen(4000);
