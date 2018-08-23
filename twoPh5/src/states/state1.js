var State1 = Object.assign({}, BaseState, {
    init: function () {
        console.log('State1')
    },
    preload: function () {
    },
    create: function () {
        let that = this;
        let jd = 0;
        let runHow = false;
        let logo = this.asw(w * .025, h * .025, 'logo', 30);
        logo.anchor.set(0, 0);
        window.firstShow=true;

        window.Api.saveUser();

        //初始化信息?
        initSocket();

        function initSocket() {
            let openid = document.getElementById('nickid').value;

            window.socketInstant = io.connect(
                "ws://"+window.scoketIp+"?openid=" + openid,//"ws://192.168.0.26:5125?openid=" + openid,120.76.45.115:5125
                { 
                    path: "/"
                }
            );

            window.socketInstant.on('error', function(error){
                window.location.reload();
            });
             window.socketInstant.on('disconnect', function(error){
                window.location.reload();
            });

            window.socketInstant.on("connect", function () {
                doLogin();
                window.socketInstant.emit("c_get_all_stand", function(data){
                
                })
            });

        }

        function doLogin() {
            let openid = document.getElementById('nickid').value;
            window.socketInstant.emit("c_login", {
                openId: document.getElementById('nickid').value,//document.getElementById('nickid').value
                nickname: document.getElementById('nickname').value,
                headimg: document.getElementById('nickpic').value
            });
        }

        // $('.page1 .hand').on('click', () => {
        //     $('.page1').hide();
        //     $('.page2').show();
        //     this.state.start('State2')
        //     //jdFun();
        // });
        watchSocket();

        function watchSocket() {
            window.socketInstant.on("s_start", function (data) {
                //console.log("s_start");
                //console.log(data);
                $('.page1').hide();
                $('.page2').show();
                jdFun()
            });

            window.socketInstant.on("s_status", function (data) {
                //console.log("s_status");
                //console.log(data);
                if (data.status === true) {
                    $('.page1').hide();
                    $('.page2').show();
                    jdFun()
                }
            });

            window.socketInstant.on("s_add", function (data) {
                //console.log("s_add");
                //console.log(data);
            });

            window.socketInstant.on("s_get_all_stand", function(data) {
                console.log("s_get_all_stand");
                console.log(data);
                window.peopleNum=data.total
                window.maxData = data.progress;
                console.log('最大'+window.maxData)
            });

            window.socketInstant.on("s_someOneAdd", function (data) {
                console.log("s_someOneAdd");
                console.log(data);
                that.lastRes = data;
                let message = data.allopints;
                let num = parseInt((message / window.maxData) * 100);
                game.time.events.removeAll();
                console.log(num)

                if (runHow === false) {
                    $('.page2 .runGif').attr('src', window.baseURI + 'runGif.gif');
                    runHow = true
                }

                if (num >= 100&&window.firstShow==true) {
                    num = 100;
                    window.firstShow=false
                    $('.page2').hide();
                    $('.page2 p').css({'width': num + '%'});
                    $('.page2 h2').html(num + '%');
                    $('.page2 .run').css({'left': (num - 10) + '%'});
                    $('.page2 .runGif').css({'left': (num - 10) + '%'});
                    setTimeout(() => {
                        $('.page2').hide();
                        that.state.start('State2')
                        console.log('进去')
                        window.socketInstant.removeAllListeners();
                    }, 500)
                }
                $('.page2 p').css({'width': num + '%'});
                $('.page2 h2').html(num + '%');
                $('.page2 .run').css({'left': (num - 10) + '%'});
                $('.page2 .runGif').css({'left': (num - 10) + '%'});
                game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                    runHow = false;
                    $('.page2 .runGif').attr('src', window.baseURI + 'stopGif.gif')
                })
            });
            window.socketInstant.on("s_login", function (data) {
                console.log("s_login");
                console.log(data);
            });
            
        }

        function setProgress(num){
          var that=this
          window.socketInstant.emit("c_progress", {
            progress:num*50
          })
        }

        function addPoint() {
            let openid = document.getElementById('nickid').value;
            window.socketInstant.emit("c_add", {
                openId: document.getElementById('nickid').value,
                points: 1
            });
        }

        function jdFun() {
            let SHAKE_THRESHOLD = 3000;
            let last_update = 0;
            let x = 0;
            let y = 0;
            let z = 0;
            let last_x = 0;
            let last_y = 0;
            let last_z = 0;
            let num = 0;
            let isprint = false;
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            }

            function deviceMotionHandler(eventData) {
                let acceleration = eventData.accelerationIncludingGravity;
                let curTime = new Date().getTime();
                if ((curTime - last_update) > 100&&window.firstShow==true) {
                    let diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

                    let x1 = Math.abs(x - last_x);
                    let y1 = Math.abs(y - last_y);
                    let z1 = Math.abs(z - last_z);
                    let max = 0;
                    if (x1 > y1) {
                        if (x1 > z1) {
                            max = x1;
                        } else {
                            max = z1;
                        }
                    } else {
                        if (y1 > z1) {
                            max = y1;
                        } else {
                            max = z1;
                        }
                    }
                    if (max > 40) {
                        isprint = true;
                        num++;
                        addPoint();
                        if (num >= 100) {
                            num = 100
                        }
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            }
        }
    }
});


