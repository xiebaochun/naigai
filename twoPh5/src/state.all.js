"use strict";

window.maxData = null;
window.socketInstant = null;
var actId = "redpack";
var baseUrl = window.IP;
window.Api = {
    doAjax: function doAjax(parms, url, cb) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: parms,
                success: function success(data) {
                    resolve(data);
                },
                error: function error(err) {
                    reject(err);
                }
            });
        });
    },

    // 用户信息初始化接口
    saveUser: function saveUser() {
        return new Promise(function (resolve, reject) {
            var timestamp = Date.parse(new Date());
            var name = $("#nickname").val();
            var openId = $("#nickid").val();
            var img = $("#nickpic").val();
            var sig = 'actId=' + actId + '&timestamp=' + timestamp;
            sig = md5(sig).toUpperCase();
            $.ajax({
                url: baseUrl + 'redPack/saveUser',
                type: "POST",
                dataType: "json",
                data: {
                    timestamp: timestamp,
                    name: name,
                    openId: openId,
                    img: img,
                    actId: actId,
                    sig: sig
                },
                success: function success(data) {
                    resolve(data);
                },
                error: function error(err) {
                    //alert('网络错误，请稍后尝试');
                }
            });
        });
    },

    //更新达标用户信息接口
    saveRecordUser: function saveRecordUser(isTrue, cb) {
        return new Promise(function (resolve, reject) {
            var timestamp = Date.parse(new Date());
            var name = $("#nickname").val();
            var openId = $("#nickid").val();
            var img = $("#nickpic").val();
            var sig = 'actId=' + actId + '&timestamp=' + timestamp;
            sig = md5(sig).toUpperCase();
            $('.tips').show();
            $.ajax({
                url: baseUrl + 'redPack/saveRecordUser',
                type: "POST",
                dataType: "json",
                data: {
                    timestamp: timestamp,
                    name: name,
                    openId: openId,
                    img: img,
                    actId: actId,
                    sig: sig,
                    isTrue: isTrue
                },
                success: function success(data) {
                    resolve(data);
                    cb && cb();
                    $('.tips').hide();
                    // if(data.data.isTrue == 0){
                    //     cb && cb()
                    // }else{
                    //
                    // }
                },
                error: function error(err) {
                    //reject(err);
                }
            });
        });
    },

    //派送红包接口
    recordReadPack: function recordReadPack() {
        return new Promise(function (resolve, reject) {
            var timestamp = Date.parse(new Date());
            var name = $("#nickname").val();
            var openId = $("#nickid").val();
            var img = $("#nickpic").val();
            var sig = 'actId=' + actId + '&timestamp=' + timestamp;
            sig = md5(sig).toUpperCase();
            $('.tips').show();
            $.ajax({
                url: baseUrl + 'redPack/recordReadPack',
                type: "POST",
                dataType: "json",
                data: {
                    timestamp: timestamp,
                    name: name,
                    openId: openId,
                    img: img,
                    actId: actId,
                    sig: sig
                },
                success: function success(data) {
                    window.oneClick = true;
                    $('.tips').hide();
                    if (data.code == '200') {
                        $('#moneyNum').html(data.money);
                        $(".page").hide();
                        $('.hbPage').show();
                    } else if (data.code == '502') {
                        $('#moneyNum').css({ 'font-size': '.6rem' });
                        $('#moneyNum').html('红包被抢光啦');
                        $(".page").hide();
                        $('.hbPage').show();
                    } else {
                        $('#moneyNum').css({ 'font-size': '.6rem' });
                        $('#moneyNum').html(data.msg);
                        $(".page").hide();
                        $('.hbPage').show();
                    }
                },
                error: function error(err) {
                    //reject(err);
                }
            });
        });
    }

};

var durTime = 300;
var w = window.innerWidth * window.devicePixelRatio;
var h = window.innerHeight * window.devicePixelRatio;

var BaseState = {

    asw: function asw(x, y, key, size, isHeight) {
        var temp = this.add.sprite(x, y, key);
        temp.anchor.set(0.5);
        if (isHeight) {
            this.setSize(temp, size / 100 * h, true);
        } else {
            this.setSize(temp, size / 100 * w, false);
        }
        return temp;
    },

    // /**
    //  * 添加一个精灵
    //  * @param  {[type]} x   [x轴]
    //  * @param  {[type]} y   [y轴]
    //  * @param  {[type]} key [名字]
    //  * @return {[type]}     [返回精灵]
    //  */
    as: function as(x, y, key) {
        var w = this.game.width;
        var temp = this.add.sprite(x, y, key);
        return temp;
    },
    // /**
    //      * [setSize description]

    //      * @param {[type]}  sprite [description]
    //      * @param {[type]}  len    [description]
    //      * @param {Boolean} param  [description]
    //      */
    setSize: function setSize(sprite, len, param) {
        if (param) {
            var precent = len / sprite.height;
            sprite.height = len;
            sprite.width = sprite.width * precent;
        } else {
            var precent = len / sprite.width;
            sprite.width = len;
            sprite.height = sprite.height * precent;
        }
    },
    setFull: function setFull(sprite) {

        sprite.width = w;
        sprite.height = h;
    },

    shake: function shake() {
        this.game.camera.shake(0.005, 300);
    },

    // /**
    //  * 动画函数
    //  * @param  {[type]}   obj  [精灵对象]
    //  * @param  {Function} cb   [回调]
    //  * @param  {[type]}   time [时间]
    //  * @return {[type]}        []
    //  */
    fromLeft: function fromLeft(obj, cb, time) {
        var tt = time ? time : durTime;
        this.add.tween(obj).from({ x: -this.game.width / 2 }, tt, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            cb();
        });
    },

    toLeft: function toLeft(obj, time, cb) {
        this.add.tween(obj).to({ x: -this.game.width / 2 }, durTime, Phaser.Easing.Linear.In, true, time, 0, false).onComplete.add(function () {
            obj.destroy();
            cb && cb();
        });
    },

    fromRight: function fromRight(obj, cb, time) {
        var tt = time ? time : durTime;
        this.add.tween(obj).from({ x: this.game.width * 1.5 }, tt, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            cb();
        });
    },

    fromFlash: function fromFlash(obj, cb) {
        this.add.tween(obj).from({ alpha: 0 }, 100, Phaser.Easing.Linear.In, true, 0, 5, true).onComplete.add(function () {
            cb();
        });
    },

    toRight: function toRight(obj, time, cb) {
        this.add.tween(obj).to({ x: this.game.width * 1.5 }, durTime, Phaser.Easing.Linear.In, true, time, 0, false).onComplete.add(function () {
            obj.destroy();
            cb && cb();
        });
    },
    fromTop: function fromTop(obj, cb, time) {
        var tt = time ? time : durTime;
        this.add.tween(obj).from({ y: -this.game.height * 0.4 }, tt, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            cb();
        });
    },
    toTop: function toTop(obj, time, cb) {
        this.add.tween(obj).to({ y: -this.game.height * 0.4 }, durTime, Phaser.Easing.Linear.In, true, time, 0, false).onComplete.add(function () {
            obj.destroy();
            cb && cb();
        });
    },
    fromBottom: function fromBottom(obj, cb, time) {
        this.add.tween(obj).from({ y: this.game.height * 1.4 }, time, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            cb && cb();
        });
    },

    toBottom: function toBottom(obj, time, cb) {
        this.add.tween(obj).to({ y: this.game.height * 1.4 }, durTime, Phaser.Easing.Linear.In, true, time, 0, false).onComplete.add(function () {
            obj.destroy();
            cb && cb();
        });
    },
    fromZoomMax: function fromZoomMax(obj, cb, time) {
        this.add.tween(obj).from({ width: obj.width * 4.2, height: obj.height * 4.2 }, time, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            cb && cb();
        });
    },
    fromZoomMax2: function fromZoomMax2(obj, cb) {
        this.add.tween(obj).from({ width: obj.width * 10.2, height: obj.height * 10.2, alpha: 0.3 }, 250, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            cb && cb();
        });
    },
    fromZoomMin: function fromZoomMin(obj, cb, time) {
        this.add.tween(obj).from({ width: obj.width * 0.02, height: obj.height * 0.02 }, time, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            cb && cb();
        });
    },
    fromZoomMin2: function fromZoomMin2(obj, cb, time) {
        this.add.tween(obj).from({ width: obj.width * 0.02, height: obj.height * 0.02 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            var timer = setTimeout(function () {
                obj.destroy();
                cb && cb();
                clearTimeout(timer);
            }, 500);
        });
    },
    fromAlpha: function fromAlpha(obj, cb) {
        this.add.tween(obj).from({ alpha: 0 }, durTime, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            cb && cb();
        });
    },
    toAlpha: function toAlpha(obj, time, cb) {
        this.add.tween(obj).to({ alpha: 0 }, durTime, Phaser.Easing.Linear.In, true, time, 0, false).onComplete.add(function () {
            obj.destroy();
            cb && cb();
        });
    },

    toZoomMin: function toZoomMin(obj, time, cb) {
        this.add.tween(obj).to({ width: obj.width * 0.1, height: obj.height * 0.1, alpha: 0 }, durTime, Phaser.Easing.Linear.In, true, time, 0, false).onComplete.add(function () {
            obj.destroy();
            cb && cb();
        });
    },

    toZoomMin2: function toZoomMin2(obj, time, cb) {
        this.add.tween(obj).to({ width: obj.width * 0.1, height: obj.height * 0.1, alpha: 0 }, 500, Phaser.Easing.Linear.In, true, time, 0, false).onComplete.add(function () {
            obj.destroy();
            cb && cb();
        });
    },
    toZoomMax: function toZoomMax(obj, time, cb) {
        this.add.tween(obj).to({ width: obj.width * 5.1, height: obj.height * 5.1, alpha: 0 }, durTime, Phaser.Easing.Linear.In, true, time, 0, false).onComplete.add(function () {
            obj.destroy();
            cb && cb();
        });
    },

    dangling: function dangling(obj, isLeft) {
        if (isLeft) {
            this.add.tween(obj).to({ x: obj.x + 10 }, 1000, Phaser.Easing.Linear.In, true, 0, 10000, true);
        } else {
            this.add.tween(obj).to({ y: obj.y + 10 }, 1000, Phaser.Easing.Linear.In, true, 0, 10000, true);
        }
    },
    zoomandmax: function zoomandmax(obj) {
        this.add.tween(obj).to({ width: obj.width * 1.08, height: obj.height * 1.08 }, 400, Phaser.Easing.Linear.In, true, 0, 10000, true);
    },

    phoneValidate: function phoneValidate(num) {
        if (!/^1(3|4|5|7|8)\d{9}$/.test(num)) {
            return false;
        } else {
            return true;
        }
    },

    addMask: function addMask(alpha) {
        var mask = this.add.graphics();
        mask.beginFill(0x000000, alpha);
        mask.drawRect(0, 0, w, h);
        mask.endFill();

        return mask;
    },
    changeArr: function changeArr(arr) {
        var newArr = arr.sort(function () {
            return 0.5 - Math.random();
        });
        return newArr;
    }

};
var Boot = Object.assign({}, BaseState, {
    init: function init() {

        console.log(this, game.game);
        if (!this.game.device.desktop) {
            //this.game.stage.backgroundColor = "#d4d8d3";
            this.game.input.maxPointers = 5;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.forceOrientation(false, true);
        }
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    },
    preload: function preload() {
        //this.game.load.crossOrigin = true;
    },
    create: function create() {
        this.game.state.start("Preloader");
    }
});

var Preloader = Object.assign({}, BaseState, {
    init: function init() {
        if (!this.game.device.desktop) {
            //this.game.stage.backgroundColor = "#d4d8d3";
            this.game.input.maxPointers = 5;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.forceOrientation(false, true);
        }
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    },
    preload: function preload() {
        var _this = this;

        var base = window.baseURI;
        this.load.crossOrigin = true;
        // common
        this.load.image('logo', base + 'top_logo.png');
        this.load.image('bar_back', base + 'bar_back.png');
        this.load.image('bar_front', base + 'bar_front.png');
        this.load.image('bottom_sprites', base + 'bottom_sprites.png');
        this.load.image('caihongbao', base + 'caihongbao.png');
        this.load.image('DSRD_1', base + 'DSRD_1.png');
        this.load.image('DSRD_2', base + 'DSRD_2.png');
        this.load.image('DSRD', base + 'DSRD.png');
        this.load.image('fubeg', base + 'fubeg.png');
        this.load.image('icon_01', base + 'icon_01.png');
        this.load.image('icon_02', base + 'icon_02.png');
        this.load.image('icon_03', base + 'icon_03.png');
        this.load.image('loading', base + 'loading.png');
        this.load.image('percent', base + 'percent.png');
        this.load.image('redpacket_02', base + 'redpacket_02.png');
        this.load.image('redpacket', base + 'redpacket.png');
        this.load.image('secne_1_2', base + 'secne_1_2.png');
        this.load.image('secne_1_bg', base + 'secne_1_bg.png');
        this.load.image('secne_3_02', base + 'secne_3_02.png');
        this.load.image('secne_04_01', base + 'secne_04_01.png');
        this.load.image('sidai', base + 'sidai.png');
        this.load.image('slogen', base + 'slogen.png');
        this.load.image('s0logen_sub', base + 'sologen_sub.png');

        //this.load.atlasXML('spObj', baseURI + 'sp.png', baseURI + 'sp.xml');

        this.load.onFileComplete.add(function (progess) {
            //document.getElementById('loadingText').innerHTML = progess + '%'
        });

        this.load.onLoadComplete.add(function () {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('page1').style.display = 'block';
            _this.state.start('State1');
        });
    },
    create: function create() {}
});

var State1 = Object.assign({}, BaseState, {
    init: function init() {
        console.log('State1');

    },
    preload: function preload() {},
    create: function create() {
        var that = this;

        setTimeout(function(){
            that.state.start('State2');
        },2000);

        var jd = 0;
        var runHow = false;
        //var logo = this.asw(w * .025, h * .025, 'logo', 30);
        //logo.anchor.set(0, 0);
        window.firstShow = true;

        window.Api.saveUser();

        //初始化信息?
        initSocket();

        function initSocket() {
            var openid = document.getElementById('nickid').value;

            window.socketInstant = io.connect("ws://" + window.scoketIp + "?openid=" + openid, //"ws://192.168.0.26:5125?openid=" + openid,120.76.45.115:5125
            {
                path: "/"
            });

            window.socketInstant.on('error', function (error) {
                window.location.reload();
            });
            window.socketInstant.on('disconnect', function (error) {
                window.location.reload();
            });

            window.socketInstant.on("connect", function () {
                doLogin();
                window.socketInstant.emit("c_get_all_stand", function (data) {});
            });
        }

        function doLogin() {
            var openid = document.getElementById('nickid').value;
            window.socketInstant.emit("c_login", {
                openId: document.getElementById('nickid').value, //document.getElementById('nickid').value
                nickname: document.getElementById('nickname').value,
                headimg: document.getElementById('nickpic').value
            });
        }

        
        watchSocket();

        function watchSocket() {
            window.socketInstant.on("s_start", function (data) {
                //console.log("s_start");
                //console.log(data);
                $('.page1').hide();
                $('.page2').show();
                jdFun();
            });

            
            window.socketInstant.on("s_login", function (data) {
                console.log("s_login");
                console.log(data);
            });
        }

        function setProgress(num) {
            var that = this;
            window.socketInstant.emit("c_progress", {
                progress: num * 50
            });
        }

        function addPoint() {
            var openid = document.getElementById('nickid').value;
            window.socketInstant.emit("c_add", {
                openId: document.getElementById('nickid').value,
                points: 1
            });
        }
    }
});

var State2 = Object.assign({}, BaseState, {
    init: function init() {
        console.log('State2');
        $('.page').hide();
        $('.page2').show();
    },
    preload: function preload() {},
    create: function create() {
        var that = this;
        var i = 0;
        var k = 0.2;
        var timer = setInterval( function(){
            i += k;
            if(i>30&& i<50){
                k = .4;
            }else if(i>=50 && i< 70){
                k = .2;
            }else if(i>=70 && i<80){
                k = .1;
            }else if(i>80){
                k = 1;
            }
            $('.page2 p').css({ 'width': i + '%' });
            $('.page2 .run').css({ 'left': i + '%' }); 
            if( i>=100 ){
                clearInterval(timer);
                that.state.start('State3');
                timer = null;
            }
        }, 1000/600 );
    }
});

var State3 = Object.assign({}, BaseState, {
    init: function init() {
        console.log('init');
        
    },
    preload: function preload() {},
    create: function create() {
        var _this2 = this;

        $('.page').hide();
        $('.page3').show();
        console.log(Object);

        setTimeout(function(){
            //_this2.state.start('State4');
        },5000);

        jdFun();
        var points = 0;
        function addPoint() {
            points++;
            if(points >=2){
                //_this2.state.start('State4'); 
            }
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


        var that=this;
        var addressX=[.1,.9,.6,.8,.2,.5]
        var xNum=0;
        var time=5;
        var score=0
        //var logo = this.asw(w*.45, h*.025, 'fubeg',15)
        //logo.anchor.set(0,0);
        var group = game.add.group()

        //document.getElementById('bgMusic').pause()

        var mh = this.asw(game.world.centerX,h*.55, 'fubeg',50)
        mh.anchor.set(.5);
        game.add.tween(mh).to({angle:10}, 100, Phaser.Easing.Linear.In, true, 0,10, true).onComplete.add(() => {
          game.add.tween(mh).to({width:mh.width*1.3,height:mh.height*1.3}, 200, Phaser.Easing.Linear.In, true, 0,0, false).onComplete.add(() => {

            mh.destroy()
            $('#gameContainer').css({'z-index':'99'})
            var emitter2 = game.add.emitter(game.world.centerX, game.world.centerY, 50);

            emitter2.makeParticles('icon_01');

            emitter2.minParticleSpeed.setTo(-1000, -1000);
            emitter2.maxParticleSpeed.setTo(1000, 1000);
            emitter2.minParticleScale = 0.25;
            emitter2.maxParticleScale = .85;
            emitter2.gravity = 10;
            emitter2.start(true, 2000,null,1000);


            // 红包粒子
            var emitter3 = game.add.emitter(game.world.centerX, game.world.centerY, 50);
            emitter3.makeParticles('redpacket');
            emitter3.minParticleSpeed.setTo(-1000, -1000);
            emitter3.maxParticleSpeed.setTo(1000, 1000);
            emitter3.minParticleScale = 0.35;
            emitter3.maxParticleScale = .75;
            emitter3.gravity = 10;
            emitter3.start(true, 2000,null,1000);

            setTimeout(function(){
              setTimeout(function(){
                emitter2.destroy()
                emitter3.destroy();
              },1000)
              //gameStart()
              game.time.events.repeat(Phaser.Timer.SECOND *.2, 100000, createOne, this);
            },1500)
          })
        })

        function createOne(){
            var sp=game.add.sprite(game.width*addressX[xNum],0, 'redpacket',game.rnd.integerInRange(0,3));//game.rnd.integerInRange(game.width * 0.1, game.width * 0.82)
            that.setSize(sp,game.height*.1,false);
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

            var sp=game.add.sprite(game.width*addressX[xNum],0, 'icon_01',game.rnd.integerInRange(0,3));//game.rnd.integerInRange(game.width * 0.1, game.width * 0.82)
            that.setSize(sp,game.height*.08,false);
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
        // var obj = this.asw(w / 2, h / 2, 'logo', 50);
        // // this.fromLeft(obj, function() {
        // //   console.log('animation ok')
        // // }, 5000)
        // this.add.tween(obj).from({ alpha: 0 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
        //     _this2.dangling(obj);
        // });
        // console.log('create');
    }

});

var State4 = Object.assign({}, BaseState, {
    init: function init() {
        console.log('init');
    },
    preload: function preload() {},
    create: function create() {
        var _this3 = this;

        $('.page').hide();
        $('.page4').show();


        console.log(Object);
        var obj = this.asw(w / 2, h *.6, 'caihongbao', 50);
        // this.fromLeft(obj, function() {
        //   console.log('animation ok')
        // }, 5000)
        this.add.tween(obj).from({ alpha: 0 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            _this3.dangling(obj);
        });

        var DSRD = this.asw(w * .8, h *.7, 'DSRD', 25);

        DSRD.anchor.set(.5);

        console.log('create');
    }

});
var State5 = Object.assign({}, BaseState, {
    init: function init() {},
    preload: function preload() {},
    create: function create() {}

});