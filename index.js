var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var text = '';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    if (msg != 'stop' && msg.length <= 2) {
    text = text + msg;
    console.log('text => ',text);
    console.log('msg => ',msg);
    }
    if (msg === "stop") {
      io.emit('result', text);
      text = '';
    }
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
