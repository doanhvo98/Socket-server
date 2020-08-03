import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "./../../helpers/socketHelper";

let userOnlineOffline = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    let currentUserId = socket.request.user.id;
    if(clients[currentUserId]) {
      clients[currentUserId].push(socket.id);
    } else {
      clients[currentUserId] = [socket.id];
    }
  
    socket.on("check-status", () => {
      let listUsersOnline = Object.keys(clients);
      //B1
      socket.emit("server-send-list-users-online", listUsersOnline);  
      //B2
      socket.broadcast.emit("server-send-when-new-user-online", socket.request.user.id);
    });

    socket.on("disconnect", () => {
      clients[currentUserId] = clients[currentUserId].filter((socketId) => {
        return socketId !== socket.id;
      });

      if (!clients[currentUserId].length) {
        delete clients[currentUserId];
      }
     
      socket.broadcast.emit("server-send-when-new-user-offline", socket.request.user.id);
    });
  });
};

module.exports = userOnlineOffline;