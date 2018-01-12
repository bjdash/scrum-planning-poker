// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3001,
	ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var bodyParser = require('body-parser');

var ROOMS = {}, lastRoomId = 1000;

server.listen(port, ip, function () {
    console.log('Server listening at port %d', port);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Routing
var roomRouter = express.Router();
roomRouter.route('/rooms')
    .get(function(req, res){
        res.json(ROOMS);
    })
    .post(function(req, res){
        var room = req.body;
        room.id = JSON.stringify(lastRoomId++);
        room.users = [];
        ROOMS[room.id] = room;
        res.json({
                name: room.name,
                admin:room.admin,
                id:room.id
            });
    })
 
 roomRouter.route('/rooms/:roomId/join')
    .get(function(req, res){
        var roomId = req.params.roomId;
        if(ROOMS[roomId]){
            var room = ROOMS[roomId];
            res.json({
                name: room.name,
                admin:room.admin,
                id:room.id
            });
        }else{
            res.status(404).json({msg:'Room not found'})
        }
    })

app.use(express.static(path.join(__dirname, 'build')));
app.post('/room', function (req, res) {
    res.send('created');
});

app.use('/api', roomRouter);


// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
    var addedUser = false;
    socket.on('ADD_USER', function(user){
        socket.userId = user.id;
        socket.roomId = user.roomId;
        delete user.roomId;
        ROOMS[socket.roomId].users.push(user);
        socket.join(socket.roomId);

        //socket.broadcast.to(socket.roomId).emit('USER_JOINED', ROOMS[socket.roomId]);
        //io.to(socket.roomId).emit('message', 'USER_JOINED', ROOMS[socket.roomId].users);
        io.sockets.to(socket.roomId).emit('USER_JOINED', ROOMS[socket.roomId].users);
        
    })

    socket.on('SET_STORY',function(data){
        if(data.room && ROOMS[data.room]){
            var room = ROOMS[data.room];
            if(room.admin === data.admin){
                io.sockets.to(data.room).emit('STORY_SET', data.story);    
            }else{
                socket.to(data.room).emit('ERROR', 'Acess denied.');
            }
        }else{
            socket.to(data.room).emit('ERROR', 'Room does not exist.');
        }
    })

    socket.on('SELECT_CARD',function(data){
        if(data.room && ROOMS[data.room]){
            io.sockets.to(data.room).emit('CARD_SELECED', {user:data.user, card:data.card});
        }else{
            socket.to(data.room).emit('ERROR', 'Room does not exist.');
        }
    })

    socket.on('REVEAL_CARDS',function(data){
        if(data.roomId && ROOMS[data.roomId]){
            io.sockets.to(data.roomId).emit('CARDS_REVEALED', {});
        }else{
            socket.to(data.room).emit('ERROR', 'Room does not exist.');
        }
    })

    socket.on('disconnect', function () {
        var room = ROOMS[socket.roomId], index;
        if(room){
            //check if its admin, delete room
            if(room.admin === socket.userId){
                delete ROOMS[socket.roomId];
                io.sockets.to(socket.roomId).emit('ADMIN_LEFT', {
                    id: socket.userId,
                    roomId: socket.roomId
                });
            }else{
                for(var i=0; i< room.users.length; i++){
                    if(room.users[i].id === socket.userId){
                        index = i;
                        break;
                    }
                }
                if(index){
                    room.users = room.users.splice(0, index);
                }

                io.sockets.to(socket.roomId).emit('USER_LEFT', {
                    id: socket.userId,
                    roomId: socket.roomId
                });
            }

        }else{
            socket.to(socket.roomId).emit('ERROR', 'Room does not exist.');
        }
    });
});


function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
