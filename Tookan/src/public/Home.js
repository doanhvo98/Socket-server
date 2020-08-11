// var socket = io("192.168.1.4:3000");
var socket = io.connect('192.168.1.2:3000/server-room')
// TODO LOGIN

socket.on('get message', function (msg) {
  console.log(msg);
});

socket.on('private event', function (msg) {
  console.log(msg);
});

socket.on("send-list-user-online", data => {
  // $(".userID-list").html("");
  // data.forEach(function (i) {
  $(".userID-list").append("<li class='user'>" + "ID: " + data.userID + "<br>" + " Username: " + data.username + "</li>");
    //$(".userID-list").append("<li class='user'>" + data.username + "</li>");
  // });
  $(".log").append("<li class='_log'>" + "Username: "+data.username + "<br>" + "Socket ID: " + data.socketId + "<br>" +data.event);
});

socket.on("send-notif-user-login", data => {
  alert(data.message);
});

$(document).ready(function () {
  // $("#click").click(function () {
  //   let data = {
  //     id: "25",
  //     username: "traibo"
  //   };
  //   socket.emit("agent-login", data);
  // });
});
