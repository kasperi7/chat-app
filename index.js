"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

const users = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join", (username) => {
    users.push({ username: username, id: socket.id });
    console.log("users connected:", users);
    socket.emit("response", "Joined with username " + username);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });

  socket.on("chat message", (msg) => {
    let userObject = users.find((user) => user.id === socket.id);
    let username = userObject.username;
    console.log("message: ", username, msg);
    io.emit("chat message", msg, username);
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
