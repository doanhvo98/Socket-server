import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "./../../helpers/socketHelper";
import { request } from "express";

let userLogin = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    
    socket.on("agent-login", data => {
     
      clients = pushSocketIdToArray(clients, data.id, socket.id);
      console.log(clients);
      //Gửi thông báo cho website khi agent đăng nhập
      let dataToEmit = {
        id: data.id,
        socketId: socket.id,
        username: data.username,
        message: `${data.username} đăng nhập.`
      };

      let userID = {
        userID: data.id,
        username: data.username,
        socketId: socket.id,
        event: "Đăng nhập: " + Date(Date.now())
      };

     // let emitNotifyToArray = clients[socket.id].forEach(socketId => io.sockets.connected[socketId].emit("send-list-user-online", userID));
      socket.emit("send-list-user-online", userID); 

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