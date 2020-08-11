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

var AdminRoom  = io.of('/admin-room');
var AgentRoom  = io.of('/agent-room');
var ServerRoom = io.of('/server-room');

configViewEngine(app);
app.use(bodyParser.urlencoded({extended: true}));
app.use(connectFlash());
app.use(cookieParser());
// initSockets(io);

let clients = {};

var sameEvent = function(io,tag) {
  console.log('--a user connected to ' + tag + ' --' + io.id);
  io.on('get message',function(msg){
    io.emit('get message',tag +msg);
  });
 
  io.on('disconnect', function () {
    console.log('--a user disconnected from '+tag);
  });
  return io;
}
 
ServerRoom.on('connection', function (socket) {
  socket = sameEvent(socket,'Server Room >');
  socket.on('private event', function (msg) {
    socket.emit('private event',msg);
  });
  
});

AgentRoom.on('connection', function (socket) {
  socket = sameEvent(socket,'Agent Room > ');

  socket.on("agent-login", data => {

    console.log(data);
    clients = pushSocketIdToArray(clients, data.id, socket.id);
    console.log(clients);

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

    io.of("/server-room").emit("send-list-user-online", userID); 
   //socket.emit("send-list-user-online", userID); 

    io.of("/admin-room").emit("send-notif-user-login", dataToEmit);
  });

  socket.on("disconnect", () => {
    console.log("Nhân viên: "+socket.id+" ngừng kết nối" );
  });
}); 

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Hello Doanh Doanh, I am running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`);
});