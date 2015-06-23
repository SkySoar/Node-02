var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var user_count = 0;
var n = 0;

io.on('connection', function(socket){

     socket.on('add user',function(msg){
        socket.username = msg;
        console.log(msg+" Has Enter.");
        io.emit('add user',{
            username: socket.username
        });
        n++;
        if(n == 0){
            console.log("There is no people,now.");
        }
        else if(n == 1){
            console.log("There is "+n+" people,now.");
        }
        else{
            console.log("There are "+n+" people,now.");
        }
        console.log("");
     });
    
     socket.on('chat message', function(msg){
     console.log(socket.username+":"+msg);
        io.emit('chat message', {
            username:socket.username,
            msg:msg
        });
     });

     socket.on('disconnect',function(){
        console.log(socket.username+" Has Left.");
        io.emit('user left',{
            username:socket.username
        });
        n--;
        if(n == 0){
            console.log("There is no people,now.");
        }
        else if(n == 1){
            console.log("There is "+n+" people,now.");
        }
        else{
            console.log("There are "+n+" people,now.");
        }
        console.log("");
     });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
