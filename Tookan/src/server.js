import express from "express";
import socketio from "socket.io";
import http from "http";
import configViewEngine from "./config/viewEngine";
import initSockets from "./sockets/index";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import passportSocketIo from "passport.socketio";
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "./helpers/socketHelper";

const {resolve} = require('path');
require('dotenv').config({path: resolve(__dirname + "../../sh/.env")});

let app = express();

let server = http.createServer(app);

let io = socketio(server);

configViewEngine(app);
app.use(bodyParser.urlencoded({extended: true}));
app.use(connectFlash());
app.use(cookieParser());
initSockets(io);

app.get("/", function (req, res) {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("co nguoi ket noi : " + socket.id);

  let clients = {};

  // socket.on("agent-login", data => {
  //   console.log(data);
  //   clients = pushSocketIdToArray(clients, data.id, socket.id);
  //   console.log(clients);
    
  //   //Gửi thông báo cho website khi agent đăng nhập
  //   let dataToEmit = {
  //     id: data.id,
  //     username: data.username,
  //     message: `${data.username} đăng nhập.`
  //   };

  //   socket.emit("send-notif-user-login", dataToEmit);
  // });

  // socket.on("new-task-created", function(data) {
  //   let response = {
  //     taskId: data.Id,
  //     startBefore: data.start_before,
  //     completeBefore: data.complete_before,
  //     customerName: data.name,
  //     address: data.address,
  //     status: data.status,
  //     comment: data.notes,
  //     orderId: data.order_id
  //   };
  //   console.log(response);
  //   //Socket send Task data to agent
  //   socket.emit("send-task-to-agent", response);
  // });

  socket.emit("send-client", "hello");

  socket.on("disconnect", () => {
    //clients = removeSocketIdFromArray(clients, socket.request.user.id, socket);
    console.log("nguoi ngat ket noi: " + socket.id);
  });
});

server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Hello Doanh Doanh, I am running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`);
});