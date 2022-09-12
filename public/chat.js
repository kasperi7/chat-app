"use strict";

const socket = io("http://localhost:3000");
//const socket = io('https://servu.norwayeast.cloudapp.azure.com');

document.querySelector("#msg-input").addEventListener("submit", (event) => {
  event.preventDefault();
  const inp = document.getElementById("m");
  socket.emit("chat message", inp.value);
  inp.value = "";
});

document.querySelector("#join").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username");
  socket.emit("join", username.value);
  username.value = "";
});

socket.on("chat message", (msg, username) => {
  const item = document.createElement("li");
  item.innerHTML = username + ": " + msg;
  document.getElementById("messages").appendChild(item);
});

socket.on("response", (msg) => {
  console.log(msg);
});
