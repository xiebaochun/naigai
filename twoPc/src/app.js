/**
 * Created by lsc on 2016/11/21.
 */
// 设置图片目录

var socketInstant = io.connect("ws://192.168.2.9:5000");
console.log(socketInstant,'>>>>>>>>>>>>>>>>>>>');
socketInstant.on("connect", function() {
  //that.doLogin();
  //that.watchSocket();
  console.log('connected');
  socketInstant.on("reload", function(data) {
      console.log('reload')
      window.location.reload();
  });
});



var Phaser = Phaser || {};
var myGame = myGame || {};



document.getElementById('gameContainer').style.height = document.body.clientHeight + 'px';

var Ratio = window.devicePixelRatio



var ww = Ratio * (document.documentElement.clientWidth || document.body.clientWidth)
var hh = Ratio * (document.documentElement.clientHeight || document.body.clientHeight)
var game = new Phaser.Game(ww, hh, Phaser.AUTO, 'gameContainer','Boot',true);

//game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
// 添加场景
game.state.add('State1', State1)
game.state.add('State2', State2)
game.state.add('State3', State3)
game.state.add('State4', State4)
game.state.add('State5', State5)

game.state.start('Preloader')
