var app = require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.get('/socket/client/index.html',function (req,res) {
    res.send('<h1>welcome</h1>');
})
//在线用户
var onlineUser={};
var onlineCount=0;
var reward_type = 0;
var connect_count = 0;
io.on('connection',function (socket) {
    connect_count++;
    console.log('连接数:' + connect_count);
    io.emit('connectCount',{});
    socket.on('reload',function (obj) {
        io.emit('reload',{});
        console.log('reload');
        
    })
    socket.on('start',function (obj) {
        io.emit('start',{});
        console.log('start');
        
    })
    socket.on('setRewardType',function (obj) {
        console.log('setRewardType');
        reward_type = obj.reward_type;
    })

    socket.on('getRewardType',function (obj) {
        io.emit('rewardType',{reward_type: reward_type});
    })

    // //监听新用户加入
    // socket.on('login',function (obj) {
    //     socket.name=obj.userid;
    //     //检查用户在线列表
    //     if(!onlineUser.hasOwnProperty(obj.userid)){
    //         onlineUser[obj.userid]=obj.username;
    //         //在线人数+1
    //         onlineCount++;
    //     }
    //     //广播消息
    //     io.emit('login',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});
    //     console.log(obj.username+"加入了聊天室");
    // })

    // //监听用户退出
    // socket.on('disconnect',function () {
    //     //将退出用户在在线列表删除
    //     if(onlineUser.hasOwnProperty(socket.name)){
    //         //退出用户信息
    //         var obj={userid:socket.name, username:onlineUser[socket.name]};
    //         //删除
    //         delete onlineUser[socket.name];
    //         //在线人数-1
    //         onlineCount--;
    //         //广播消息
    //         io.emit('logout',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});
    //         console.log(obj.username+"退出了聊天室");
    //     }
    // })

    //监听用户发布聊天内容
    // socket.on('message', function(obj){
    //     //向所有客户端广播发布的消息
    //     io.emit('message', obj);
    //     console.log(obj.username+'说：'+obj.content);
    // });
})
http.listen(5000, function(){
    console.log('listening on *:5000');
});