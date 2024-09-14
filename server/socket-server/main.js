const { Server } = require("socket.io");
const redis = require("redis");

let messages = [];

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
    const sessionData = await client.get("sessionId");

    if (sessionData === null || sessionData === undefined) {
      socket.emit("error", {
        errorMessage: "Session timeout, please login again",
        timeout: true,
      });
      socket.disconnect();

      (async () => {
        const response = await fetch("http://rest-server:8080/saveMessages", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            sessionId: messageJson.sessionId,
            userName: messageJson.userName,
            messages: messages,
          }),
        });
        /* const body = await response.text();
        console.log(body); */
      })();
      return;
    }
    if (messageJson.message.length > 100) {
      socket.emit("error", {
        errorMessage: "Message length should be equal or less than 100",
      });
      return;
    }
    io.emit("broadcast", messageJson);
    messages.push(messageJson.userName + ": " + messageJson.message);

    /*     await client.hSet("sessionId", {
      messages: JSON.stringify(messages),
    }); */

    /*     const d = await client.hGetAll("sessionId");
    console.log(d.messages); */
  });
});

io.listen(4000);
