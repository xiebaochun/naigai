var State1 = Object.assign({}, BaseState, {
    init: function() {
        console.log('State1')
    },
    preload: function() {},
    create: function() {
        var that = this
        var jd = 0
        var runHow = false;
        var logo = this.asw(w* .025, h* .025, 'logo', 15)

        var timePh=null

        var oneAchieve=true
        var gameAchieve=false

        logo.anchor.set(0, 0);

        var emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);

        emitter.makeParticles('iO', [0, 1]);

        emitter.minParticleSpeed.setTo(-500,-500);
        emitter.maxParticleSpeed.setTo(500, 500);
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = .6;
        emitter.gravity = 0;
        emitter.start(false, 2000, 10);

        initSocket()
        var that = this;

        function initSocket() {
            var openid = document.getElementById('nickid').value;

            window.socketInstant = io.connect(
                "ws://"+window.scoketIp+"?openid=" + openid, //"ws://192.168.0.26:5125?openid=" + openid,
                {
                    path: "/"
                }
            );

            window.socketInstant.on('error', (error) => {
                window.location.reload();
            });
            
            window.socketInstant.on('disconnect', function(error){
                    window.location.reload();
            });

            window.socketInstant.on("connect", function() {
                doLogin();
            });
        }

        function doLogin(){
          var openid = document.getElementById('nickid').value;
          window.socketInstant.emit("c_login", {
            openId: document.getElementById('nickid').value,
            nickname: document.getElementById('nickname').value,
            headimg: document.getElementById('nickpic').value
          });
        }

        watchSocket ()

        function watchSocket ()  {
          window.socketInstant.on("s_start", function(data) {
            console.log("s_start");
            console.log(data);
            emitter.destroy()
            $('.page1').hide();
            $('.page2').show();
            //jdFun()
          });

          window.socketInstant.on("s_status", function(data) {
            //console.log("s_status");
            //console.log(data);
            if(data.status==true){
                emitter.destroy()
                $('.page1').hide();
                $('.page2').show();
                //jdFun()
            }
          });

          window.socketInstant.on("s_get_all_stand", function(data) {
                console.log("s_get_all_stand");
                console.log(data);
                if(window.peopleNum!=data.total){
                    setProgress(data.total)
                }
                window.maxData = data.progress
                window.peopleNum=data.total

                $('#numP').html(data.total)
                //setProgress(data.total)
          });
          window.socketInstant.on("s_add", function(data) {
            console.log("s_add");
            console.log(data);
          });
          window.socketInstant.on("s_someOneAdd", function(data) {
            console.log("s_someOneAdd");
            console.log(data);
            var message=data[0].allopints
            var num=parseInt((message/window.maxData)*100)
            game.time.events.remove(timePh);
            console.log('摇数：'+num)
            if(runHow==false){
                $('.page2 .runGif').attr('src', window.baseURI + 'runGif.gif')
                runHow=true
            }
            if(num>=80&&oneAchieve==true){
                console.log(1254)
                oneAchieve=false
                intTmie()
            }
            if(num>=100&&gameAchieve==false){
                gameAchieve=true
                num=100
                game.time.events.removeAll();
                $('.page2 .runGif').css({ 'left': '95%' })
                $('.page2 .run').css({ 'left': '93%' })
                $('.page2 .runGif').attr('src', window.baseURI + 'end.gif')
                setTimeout(() => {
                  $('.page2').hide();
                  that.state.start('State2')
                  window.socketInstant.removeAllListeners();
                }, 500)
            }else{
                if(num>=100){
                    num=100
                }
                $('.page2 p').css({ 'width': num + '%' })
                $('.page2 h2').html(num + '%')
                $('.page2 .run').css({ 'left': num + '%' })
                $('.page2 .runGif').css({ 'left': num + '%' })
            }
            
            timePh=game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
              runHow=false
              $('.page2 .runGif').attr('src', window.baseURI + 'stopGif.gif')
            })
          });
          window.socketInstant.on("s_login", function(data) {
            //console.log("s_login");
            //console.log(data);
          });
          window.socketInstant.on("s_people", function(data) {
            //console.log("s_people");
            //console.log(data);
            if(window.peopleNum!=data.total){
                setProgress(data.total)
            }
            window.maxData = data.progress
            window.peopleNum=data.total
            $('#numP').html(data.total)
            //setProgress(data.total)
          });


          
        }

        function setProgress(num){
          var that=this
          window.socketInstant.emit("c_progress", {
            progress:num*50
          })
        }

        // $('.page1 .ewm').on('click', function() {
        //     emitter.destroy()
        //     $('.page1').hide();
        //     $('.page2').show();
        //     //jdFun()
        // })
        // 
        function intTmie(){
            game.time.events.repeat(Phaser.Timer.SECOND * 1, 10000000, autoAdd, this)
        }

        function autoAdd(){
            var that=this
            var openid = document.getElementById('nickid').value;
            var addData=window.peopleNum*50*0.01
            
            window.socketInstant.emit("c_add", {
              openId: openid,
              points: addData
            });
        }

        function jdFun() {
            var aa = setInterval(() => {
                if (jd >= 20) {
                    if (!runHow) {
                        runHow = true
                        $('.page2 .runGif').attr('src', window.baseURI + 'stopGif.gif')
                    } else {
                        $('.page2 .runGif').attr('src', window.baseURI + 'runGif.gif')
                    }
                }
                $('.page2 p').css({ 'width': jd + '%' })
                $('.page2 h2').html(jd + '%')
                $('.page2 .run').css({ 'left': jd + '%' })
                $('.page2 .runGif').css({ 'left': jd + '%' })
                if (jd >= 100) {
                    clearInterval(aa)
                    $('.page2 .runGif').css({ 'left': '95%' })
                    $('.page2 .run').css({ 'left': '93%' })
                    $('.page2 .runGif').attr('src', window.baseURI + 'end.gif')
                    setTimeout(() => {
                        $('.page2').hide();
                        that.state.start('State2')
                    }, 1500)
                }

                jd += 10;
            }, 1000)
        }

    }
})
