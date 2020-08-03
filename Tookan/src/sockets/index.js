import Task from "./task/Task";
import userOnlineOffline from "./user/userOnlineOffline";
import userLogin from "./user/userLogin";

let initSockets = (io) => {
  userLogin(io);
};
module.exports = initSockets;