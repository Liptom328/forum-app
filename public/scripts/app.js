var socket = io('http://localhost:8000');
socket.on('message', function (data) {
    console.log(data);
});