var socket = io("192.168.11.112:3000");

// TODO LOGIN

socket.on("send-list-user-online", function (data) {
  $(".userID-list").html("");
  // data.forEach(function (i) {
    $(".userID-list").append("<li class='user'>" + "ID: " + data.userID + "<br>" + " Username: " + data.username + "</li>");
    //$(".userID-list").append("<li class='user'>" + data.username + "</li>");
  // });
  $(".log").append("<li class='_log'>" + "Username: "+data.username + "<br>" + "Socket ID: " + data.socketId + "<br>" +data.event);
});
// TODO RECEIVE TASK

// socket.on("Server-send-taoCV-thatbai", function () {
//   alert("trung CV");
// });
socket.on("send-notif-user-login", data => {
  alert(data.message);
});
// socket.on("Server-send-listCV", function (data) {
//   $("#listCV").html("");
//   $("#tasklist").html("");
//   data.forEach(function (i) {
//     $("#listCV").append(
//       "<div class='user'>" +
//         "ID: " +
//         i.id +
//         " name: " +
//         i.name +
//         " assign: " +
//         i.assign +
//         " status: " +
//         i.status +
//         " data: " +
//         i.update_date +
//         "</div>"
//     );
//     $("#tasklist").append("<option class='userItem'>" + i.id + "</option>");
//   });
// });


// socket.on("client-nhan-cong-viec", function (data) {
//   alert("da nhan cong viec: " + data.name);
// });
// socket.on("server-khong-nhan-cong-viec", function (data) {
//   alert("khong nhan cong viec: " + data.name);
// });

$(document).ready(function () {
 
  // $("#btncreate").click(function () {
  //   socket.emit("send-tao-CV", $("#nametask").val());
  // });
  $("#click").click(function () {
    let data = {
      id: "25",
      username: "traibo"
    };
    socket.emit("agent-login", data);
  });
    // $("#btnGiaoCV").click(function () {
    //   socket.emit("giao-CV", {
    //     nhanvien: $("#userlist :selected").text(),
    //     id: $("#tasklist :selected").text(),
    //   });
    // });
});
