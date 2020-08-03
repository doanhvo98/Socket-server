import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "../../helpers/socketHelper";

let Task = (io) => {
  let clients = {};
  
  io.on("connection", (socket) => {
    //push socket io to array
    socket.on("new-task-created", data => {
      console.log(data);
      clients = pushSocketIdToArray(clients, data.id, socket.id);
      console.log(clients);

      let response = {
        taskId: data.id,
        startBefore: data.start_before,
        completeBefore: data.complete_before,
        customerName: data.name,
        address: data.address,
        status: data.status,
        comment: data.notes,
        orderId: data.order_id,
        agentId: data.agent_id
      };
      console.log(response);
      //Socket send Task data to agent
      if (clients[data.agent_id]) {
        emitNotifyToArray(clients, data.agent_id, io, "send-task-to-agent", response);
      }
      else
      {
        let notif = "Nhân viên này hiện không online";
        socket.emit("send-user-offline-to-admin", notif);
      }
    });

    socket.on("disconnect", () => {
      // clients[currentUserId] = clients[currentUserId].filter((socketId) => {
      //   return socketId !== socket.id;
      // });

      // if (!clients[currentUserId].length) {
      //   delete clients[currentUserId];
      // }
      // clients = removeSocketIdFromArray(clients, data.id, socket);
      console.log("Nhân viên: "+socket.id+" ngừng kết nối" );
    });
  });
};

module.exports = Task;