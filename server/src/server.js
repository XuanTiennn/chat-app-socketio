import express from "express";
import env from "dotenv";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;
// app.route("/").get((req, res) => {
//   res.send("hello");
// });
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("getId", (data) => {
    socket.emit(socket.id);
  });

  socket.on("sendDataClient", (data) => {
    socket.emit("sendDataServer", { data });
  });
  socket.on("disconnect", (socket) => {
    console.log("disconnect");
  });
});

server.listen(PORT, () => {
  console.log("run in ", PORT);
});
