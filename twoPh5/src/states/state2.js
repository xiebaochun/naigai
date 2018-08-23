var State2 = Object.assign({}, BaseState, {
    init: function () {
        console.log('State2')
    },
    preload: function () {
    },
    create: function () {
        var that = this;
        var addressX = [.1, .9, .6, .8, .2, .5];
        var xNum = 0;
        var time = window.gameLong;
        var score = 0;
        var logo = this.asw(w * .025, h * .025, 'logo', 30);
        logo.anchor.set(0, 0);
        var group = game.add.group();
        
        document.getElementById('bgMusic').pause()
        document.getElementById('ddMusic').play()

        var mh = this.asw(game.world.centerX, h * .4, 'mh', 70);
        mh.anchor.set(.5);

        window.oneClick=true
        
        

        game.add.tween(mh).to({angle: 10}, 100, Phaser.Easing.Linear.In, true, 0, 10, true).onComplete.add(() => {
            game.add.tween(mh).to({
                width: mh.width * 1.3,
                height: mh.height * 1.3
            }, 200, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(() => {
                mh.destroy();
                document.getElementById('ddMusic').pause()
                document.getElementById('zaMusic').play()
                var emitter = game.add.emitter(game.world.centerX, game.world.centerY, 50);

                emitter.makeParticles('mh');

                emitter.minParticleSpeed.setTo(-1000, -1000);
                emitter.maxParticleSpeed.setTo(1000, 1000);
                emitter.minParticleScale = 0.15;
                emitter.maxParticleScale = .15;
                emitter.gravity = 10;
                emitter.start(true, 2000, null, 1000);
                game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                    game.time.events.add(Phaser.Timer.SECOND, function () {
                        emitter.destroy()
                    });
                    gameStart()
                })
                
            });
        });


        function gameStart() {
            document.getElementById('zaMusic').pause()
            document.getElementById('gameMusic').play()
            $('.messagePage').show();

            game.time.events.repeat(Phaser.Timer.SECOND * .2, 1000000, createOne, this);

            game.time.events.repeat(Phaser.Timer.SECOND * 1, 100000, () => {
                time--;
                $('#time').text(time);
                if (time <= 0) {
                    $('#time').text(0);
                    game.time.events.removeAll();
                    if (score >=0) {
                        window.Api.saveRecordUser(1,()=>{
                            //显示收集成功页面, 且显示红包
                            $('.messagePage').hide()
                            $(".page").hide();
                            $('.winPage').show();
                            $('.foot').css({'z-index':'999'})
                        });
                    } else {
                        window.Api.saveRecordUser(0,()=>{
                            //显示失败的文字
                            $('.page').hide();
                            $('.messagePage').hide()
                            $('.messagePage').hide();
                            $('.failPage').show();
                            $('.foot').css({'z-index':'999'})
                        });
                    }
                }
            }, this);
        }

        $('#openHb').on('click',function(){
            document.getElementById('zjMusic').play()
            if(window.oneClick!=true){
                return;
            }
            window.oneClick=false
            window.Api.recordReadPack()
        })


        function createOne() {
            var sp = game.add.sprite(game.width * addressX[xNum], 0, 'spObj', game.rnd.integerInRange(0, 3));//game.rnd.integerInRange(game.width * 0.1, game.width * 0.82)
            that.setSize(sp, game.width * .2, false);
            xNum++;
            if (xNum > 5) {
                xNum = 0
            }
            sp.anchor.set(.5);

            game.add.tween(sp).to({y: game.height * 1.2}, 2500, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(() => {
                sp.destroy();
            });

            sp.inputEnabled = true;
            sp.events.onInputDown.add(function () {
                score++;
                $('#score').text(score);
                sp.inputEnabled = false;
                sp.destroy();
            })
        }
    }
});
