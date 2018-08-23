var State2 = Object.assign({}, BaseState, {
  init: function() {
    console.log('State2')
  },
  preload: function() {},
  create: function() {
    var that=this;
    var addressX=[.1,.9,.6,.8,.2,.5]
    var xNum=0;
    var time=5;
    var score=0
    var logo = this.asw(w*.025, h*.025, 'logo',15)
    logo.anchor.set(0,0);
    var group = game.add.group()

    //document.getElementById('bgMusic').pause()

    var mh = this.asw(game.world.centerX,h*.4, 'mh',50)
    mh.anchor.set(.5);
    game.add.tween(mh).to({angle:10}, 100, Phaser.Easing.Linear.In, true, 0,10, true).onComplete.add(() => {
      game.add.tween(mh).to({width:mh.width*1.3,height:mh.height*1.3}, 200, Phaser.Easing.Linear.In, true, 0,0, false).onComplete.add(() => {

        mh.destroy()
        $('#gameContainer').css({'z-index':'99'})
        var emitter2 = game.add.emitter(game.world.centerX, game.world.centerY, 50);

        emitter2.makeParticles('mh');

        emitter2.minParticleSpeed.setTo(-1000, -1000);
        emitter2.maxParticleSpeed.setTo(1000, 1000);
        emitter2.minParticleScale = 0.15;
        emitter2.maxParticleScale = .15;
        emitter2.gravity = 10;
        emitter2.start(true, 2000,null,1000);

        setTimeout(function(){
          setTimeout(function(){
            emitter2.destroy()
          },1000)
          gameStart()
          game.time.events.repeat(Phaser.Timer.SECOND *.2, 100000, createOne, this);
        },1500)
      })
    })


    function gameStart(){

      setTimeout(function(){
        window.socketInstant.emit("c_end", {
          openId: document.getElementById('nickid').value,
          nickname: document.getElementById('nickname').value,
          headimg: "http://qn.kiis.cn/003b3899-c6f7-42a1-891a-2c1be0de9736.jpg"
        });
      },3000)
    }
    
    
    function createOne(){
        var sp=game.add.sprite(game.width*addressX[xNum],0, 'spObj',game.rnd.integerInRange(0,3));//game.rnd.integerInRange(game.width * 0.1, game.width * 0.82)
        that.setSize(sp,game.height*.2,false);
        xNum++;
        if(xNum>5){
          xNum=0
        }
        sp.anchor.set(.5);

        game.add.tween(sp).to({y:game.height*1.2}, 2000, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(() => {
          sp.destroy()
        })
        sp.inputEnabled = false
        sp.events.onInputDown.add(function() {
          score++;
          $('#score').text(score)
          sp.inputEnabled = false
          sp.destroy()
        })
    }
  }
})
