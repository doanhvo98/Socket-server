import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "./../../helpers/socketHelper";
import { request } from "express";

let userLogin = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    
    socket.on("agent-login", data => {
     
      // let user = {
      //   id: data.id
      // };
      // socket.user = user;
      // clients.push(user);
      // console.log(clients);
      clients = pushSocketIdToArray(clients, data.id, socket.id);
      console.log(clients);
      //Gửi thông báo cho website khi agent đăng nhập
      let dataToEmit = {
        id: data.id,
        socketId: socket.id,
        username: data.username,
        message: `${data.username} đăng nhập.`
      };
      
      // let agentUser = $(
      //   `<li class="user_${data.id}" " data-mess-id="${data.id}"></li>`
      // );
      let userID = {
        userID: data.id,
        username: data.username,
        socketId: socket.id,
        event: "Đăng nhập: " + Date(Date.now())
      }

      if (clients[data.id]) {
        socket.emit("send-list-user-online", userID);
      }

      if (clients[data.id]) {
        //emitNotifyToArray(clients, "25", io, "send-notif-user-login", dataToEmit);
        socket.emit("send-notif-user-login", dataToEmit);
      }
    });
    // socket.emit("user-login", clients);

    socket.on("disconnect", () => {
      //clients = removeSocketIdFromArray(clients, data.id, socket);
      console.log("Nhân viên: "+socket.id+" ngừng kết nối" );
      // if(clients[data.id] == socket.id) {
      //   delete clients[socket.id];
      // }
    });
  });
};

module.exports = userLogin;