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
                    alert('网络错误，请稍后尝试');
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
        this.load.image('logo', base + 'logo.png');
        this.load.image('mh', base + 'mh.png');

        this.load.atlasXML('spObj', baseURI + 'sp.png', baseURI + 'sp.xml');

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
        var jd = 0;
        var runHow = false;
        var logo = this.asw(w * .025, h * .025, 'logo', 30);
        logo.anchor.set(0, 0);
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
                jdFun();
            });

            window.socketInstant.on("s_status", function (data) {
                //console.log("s_status");
                //console.log(data);
                if (data.status === true) {
                    $('.page1').hide();
                    $('.page2').show();
                    jdFun();
                }
            });

            window.socketInstant.on("s_add", function (data) {
                //console.log("s_add");
                //console.log(data);
            });

            window.socketInstant.on("s_get_all_stand", function (data) {
                console.log("s_get_all_stand");
                console.log(data);
                window.peopleNum = data.total;
                window.maxData = data.progress;
                console.log('最大' + window.maxData);
            });

            window.socketInstant.on("s_someOneAdd", function (data) {
                console.log("s_someOneAdd");
                console.log(data);
                that.lastRes = data;
                var message = data[0].allopints;
                var num = parseInt(message / window.maxData * 100);
                game.time.events.removeAll();
                console.log(num);

                if (runHow === false) {
                    $('.page2 .runGif').attr('src', window.baseURI + 'runGif.gif');
                    runHow = true;
                }

                if (num >= 100 && window.firstShow == true) {
                    num = 100;
                    window.firstShow = false;
                    $('.page2').hide();
                    $('.page2 p').css({ 'width': num + '%' });
                    $('.page2 h2').html(num + '%');
                    $('.page2 .run').css({ 'left': num - 10 + '%' });
                    $('.page2 .runGif').css({ 'left': num - 10 + '%' });
                    setTimeout(function () {
                        $('.page2').hide();
                        that.state.start('State2');
                        console.log('进去');
                        window.socketInstant.removeAllListeners();
                    }, 500);
                }
                $('.page2 p').css({ 'width': num + '%' });
                $('.page2 h2').html(num + '%');
                $('.page2 .run').css({ 'left': num - 10 + '%' });
                $('.page2 .runGif').css({ 'left': num - 10 + '%' });
                game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                    runHow = false;
                    $('.page2 .runGif').attr('src', window.baseURI + 'stopGif.gif');
                });
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

        function jdFun() {
            var SHAKE_THRESHOLD = 3000;
            var last_update = 0;
            var x = 0;
            var y = 0;
            var z = 0;
            var last_x = 0;
            var last_y = 0;
            var last_z = 0;
            var num = 0;
            var isprint = false;
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            }

            function deviceMotionHandler(eventData) {
                var acceleration = eventData.accelerationIncludingGravity;
                var curTime = new Date().getTime();
                if (curTime - last_update > 100 && window.firstShow == true) {
                    var diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

                    var x1 = Math.abs(x - last_x);
                    var y1 = Math.abs(y - last_y);
                    var z1 = Math.abs(z - last_z);
                    var max = 0;
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
                            num = 100;
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

var State2 = Object.assign({}, BaseState, {
    init: function init() {
        console.log('State2');
    },
    preload: function preload() {},
    create: function create() {
        var that = this;
        var addressX = [.1, .9, .6, .8, .2, .5];
        var xNum = 0;
        var time = window.gameLong;
        var score = 0;
        var logo = this.asw(w * .025, h * .025, 'logo', 30);
        logo.anchor.set(0, 0);
        var group = game.add.group();

        document.getElementById('bgMusic').pause();
        document.getElementById('ddMusic').play();

        var mh = this.asw(game.world.centerX, h * .4, 'mh', 70);
        mh.anchor.set(.5);

        window.oneClick = true;

        game.add.tween(mh).to({ angle: 10 }, 100, Phaser.Easing.Linear.In, true, 0, 10, true).onComplete.add(function () {
            game.add.tween(mh).to({
                width: mh.width * 1.3,
                height: mh.height * 1.3
            }, 200, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
                mh.destroy();
                document.getElementById('ddMusic').pause();
                document.getElementById('zaMusic').play();
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
                        emitter.destroy();
                    });
                    gameStart();
                });
            });
        });

        function gameStart() {
            document.getElementById('zaMusic').pause();
            document.getElementById('gameMusic').play();
            $('.messagePage').show();

            game.time.events.repeat(Phaser.Timer.SECOND * .2, 1000000, createOne, this);

            game.time.events.repeat(Phaser.Timer.SECOND * 1, 100000, function () {
                time--;
                $('#time').text(time);
                if (time <= 0) {
                    $('#time').text(0);
                    game.time.events.removeAll();
                    if (score >= 0) {
                        window.Api.saveRecordUser(1, function () {
                            //显示收集成功页面, 且显示红包
                            $('.messagePage').hide();
                            $(".page").hide();
                            $('.winPage').show();
                            $('.foot').css({ 'z-index': '999' });
                        });
                    } else {
                        window.Api.saveRecordUser(0, function () {
                            //显示失败的文字
                            $('.page').hide();
                            $('.messagePage').hide();
                            $('.messagePage').hide();
                            $('.failPage').show();
                            $('.foot').css({ 'z-index': '999' });
                        });
                    }
                }
            }, this);
        }

        $('#openHb').on('click', function () {
            document.getElementById('zjMusic').play();
            if (window.oneClick != true) {
                return;
            }
            window.oneClick = false;
            window.Api.recordReadPack();
        });

        function createOne() {
            var sp = game.add.sprite(game.width * addressX[xNum], 0, 'spObj', game.rnd.integerInRange(0, 3)); //game.rnd.integerInRange(game.width * 0.1, game.width * 0.82)
            that.setSize(sp, game.width * .2, false);
            xNum++;
            if (xNum > 5) {
                xNum = 0;
            }
            sp.anchor.set(.5);

            game.add.tween(sp).to({ y: game.height * 1.2 }, 2500, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
                sp.destroy();
            });

            sp.inputEnabled = true;
            sp.events.onInputDown.add(function () {
                score++;
                $('#score').text(score);
                sp.inputEnabled = false;
                sp.destroy();
            });
        }
    }
});

var State3 = Object.assign({}, BaseState, {
    init: function init() {
        console.log('init');
    },
    preload: function preload() {},
    create: function create() {
        var _this2 = this;

        console.log(Object);
        var obj = this.asw(w / 2, h / 2, 'logo', 50);
        // this.fromLeft(obj, function() {
        //   console.log('animation ok')
        // }, 5000)
        this.add.tween(obj).from({ alpha: 0 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            _this2.dangling(obj);
        });
        console.log('create');
    }

});

var State4 = Object.assign({}, BaseState, {
    init: function init() {
        console.log('init');
    },
    preload: function preload() {},
    create: function create() {
        var _this3 = this;

        console.log(Object);
        var obj = this.asw(w / 2, h / 2, 'logo', 50);
        // this.fromLeft(obj, function() {
        //   console.log('animation ok')
        // }, 5000)
        this.add.tween(obj).from({ alpha: 0 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function () {
            _this3.dangling(obj);
        });
        console.log('create');
    }

});
var State5 = Object.assign({}, BaseState, {
    init: function init() {},
    preload: function preload() {},
    create: function create() {}

});