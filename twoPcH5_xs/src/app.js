/**
 * Created by lsc on 2016/11/21.
 */
// 设置图片目录



var Phaser = Phaser || {};
var myGame = myGame || {};



document.getElementById('gameContainer').style.height = document.body.clientHeight + 'px';

var Ratio = window.devicePixelRatio

$('body').width(document.documentElement.clientHeight*1.3 ||document.body.clientHeight*.3)

var worldWidth=null
var worldHeight=null
if(document.documentElement.clientWidth>document.body.clientWidth){
  worldHeight=document.documentElement.clientHeight || document.body.clientHeight
  worldWidth=document.documentElement.clientHeight*1.3 ||document.body.clientHeight*.3
}

var ww = Ratio * (worldWidth)
var hh = Ratio * (worldHeight)
var game = new Phaser.Game(ww, hh, Phaser.AUTO, 'gameContainer','Boot',true);

game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
// 添加场景
game.state.add('State1', State1)
game.state.add('State2', State2)
game.state.add('State3', State3)
game.state.add('State4', State4)
game.state.add('State5', State5)

game.state.start('Boot')
