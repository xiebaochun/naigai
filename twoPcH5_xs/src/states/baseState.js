var durTime = 300;

var w = window.innerWidth * window.devicePixelRatio;
var h = window.innerHeight * window.devicePixelRatio;

var BaseState = {

  asw: function(x, y, key, size, isHeight) {
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
  as: function(x, y, key) {
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
  setSize: function(sprite, len, param) {
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
  setFull: function(sprite) {

    sprite.width = w;
    sprite.height = h;
  },

  shake: function() {
    this.game.camera.shake(0.005, 300);
  },

  // /**
  //  * 动画函数
  //  * @param  {[type]}   obj  [精灵对象]
  //  * @param  {Function} cb   [回调]
  //  * @param  {[type]}   time [时间]
  //  * @return {[type]}        []
  //  */
  fromLeft: function(obj, cb, time) {
    var tt = time ? time : durTime;
    this.add
      .tween(obj)
      .from({ x: -this.game.width / 2 },
        tt,
        Phaser.Easing.Linear.In,
        true,
        0,
        0,
        false
      )
      .onComplete.add(function() {
        cb();
      });
  },

  toLeft: function(obj, time, cb) {
    this.add
      .tween(obj)
      .to({ x: -this.game.width / 2 },
        durTime,
        Phaser.Easing.Linear.In,
        true,
        time,
        0,
        false
      )
      .onComplete.add(function() {
        obj.destroy();
        cb && cb();
      });
  },

  fromRight: function(obj, cb, time) {
    var tt = time ? time : durTime;
    this.add
      .tween(obj)
      .from({ x: this.game.width * 1.5 },
        tt,
        Phaser.Easing.Linear.In,
        true,
        0,
        0,
        false
      )
      .onComplete.add(function() {
        cb();
      });
  },

  fromFlash: function(obj, cb) {
    this.add
      .tween(obj)
      .from({ alpha: 0 }, 100, Phaser.Easing.Linear.In, true, 0, 5, true)
      .onComplete.add(function() {
        cb();
      });
  },

  toRight: function(obj, time, cb) {
    this.add
      .tween(obj)
      .to({ x: this.game.width * 1.5 },
        durTime,
        Phaser.Easing.Linear.In,
        true,
        time,
        0,
        false
      )
      .onComplete.add(function() {
        obj.destroy();
        cb && cb();
      });
  },
  fromTop: function(obj, cb, time) {
    var tt = time ? time : durTime;
    this.add
      .tween(obj)
      .from({ y: -this.game.height * 0.4 },
        tt,
        Phaser.Easing.Linear.In,
        true,
        0,
        0,
        false
      )
      .onComplete.add(function() {
        cb();
      });
  },
  toTop: function(obj, time, cb) {
    this.add
      .tween(obj)
      .to({ y: -this.game.height * 0.4 },
        durTime,
        Phaser.Easing.Linear.In,
        true,
        time,
        0,
        false
      )
      .onComplete.add(function() {
        obj.destroy();
        cb && cb();
      });
  },
  fromBottom: function(obj, cb, time) {
    this.add
      .tween(obj)
      .from({ y: this.game.height * 1.4 },
        time,
        Phaser.Easing.Linear.In,
        true,
        0,
        0,
        false
      )
      .onComplete.add(function() {
        cb && cb();
      });
  },

  toBottom: function(obj, time, cb) {
    this.add
      .tween(obj)
      .to({ y: this.game.height * 1.4 },
        durTime,
        Phaser.Easing.Linear.In,
        true,
        time,
        0,
        false
      )
      .onComplete.add(function() {
        obj.destroy();
        cb && cb();
      });
  },
  fromZoomMax: function(obj, cb, time) {
    this.add
      .tween(obj)
      .from({ width: obj.width * 4.2, height: obj.height * 4.2 },
        time,
        Phaser.Easing.Linear.In,
        true,
        0,
        0,
        false
      )
      .onComplete.add(function() {
        cb && cb();
      });
  },
  fromZoomMax2: function(obj, cb) {
    this.add
      .tween(obj)
      .from({ width: obj.width * 10.2, height: obj.height * 10.2, alpha: 0.3 },
        250,
        Phaser.Easing.Linear.In,
        true,
        0,
        0,
        false
      )
      .onComplete.add(function() {
        cb && cb();
      });
  },
  fromZoomMin: function(obj, cb, time) {
    this.add
      .tween(obj)
      .from({ width: obj.width * 0.02, height: obj.height * 0.02 },
        time,
        Phaser.Easing.Linear.In,
        true,
        0,
        0,
        false
      )
      .onComplete.add(function() {
        cb && cb();
      });
  },
  fromZoomMin2: function(obj, cb, time) {
    this.add
      .tween(obj)
      .from({ width: obj.width * 0.02, height: obj.height * 0.02 },
        500,
        Phaser.Easing.Linear.In,
        true,
        0,
        0,
        false
      )
      .onComplete.add(function() {
        var timer = setTimeout(function() {
          obj.destroy();
          cb && cb();
          clearTimeout(timer);
        }, 500);
      });
  },
  fromAlpha: function(obj, cb) {
    this.add
      .tween(obj)
      .from({ alpha: 0 }, durTime, Phaser.Easing.Linear.In, true, 0, 0, false)
      .onComplete.add(function() {
        cb && cb();
      });
  },
  toAlpha: function(obj, time, cb) {
    this.add
      .tween(obj)
      .to({ alpha: 0 }, durTime, Phaser.Easing.Linear.In, true, time, 0, false)
      .onComplete.add(function() {
        obj.destroy();
        cb && cb();
      });
  },

  toZoomMin: function(obj, time, cb) {
    this.add
      .tween(obj)
      .to({ width: obj.width * 0.1, height: obj.height * 0.1, alpha: 0 },
        durTime,
        Phaser.Easing.Linear.In,
        true,
        time,
        0,
        false
      )
      .onComplete.add(function() {
        obj.destroy();
        cb && cb();
      });
  },

  toZoomMin2: function(obj, time, cb) {
    this.add
      .tween(obj)
      .to({ width: obj.width * 0.1, height: obj.height * 0.1, alpha: 0 },
        500,
        Phaser.Easing.Linear.In,
        true,
        time,
        0,
        false
      )
      .onComplete.add(function() {
        obj.destroy();
        cb && cb();
      });
  },
  toZoomMax: function(obj, time, cb) {
    this.add
      .tween(obj)
      .to({ width: obj.width * 5.1, height: obj.height * 5.1, alpha: 0 },
        durTime,
        Phaser.Easing.Linear.In,
        true,
        time,
        0,
        false
      )
      .onComplete.add(function() {
        obj.destroy();
        cb && cb();
      });
  },

  dangling: function(obj, isLeft) {
    if (isLeft) {
      this.add
        .tween(obj)
        .to({ x: obj.x + 10 },
          1000,
          Phaser.Easing.Linear.In,
          true,
          0,
          10000,
          true
        );
    } else {
      this.add
        .tween(obj)
        .to({ y: obj.y + 10 },
          1000,
          Phaser.Easing.Linear.In,
          true,
          0,
          10000,
          true
        );
    }
  },
  zoomandmax: function(obj) {
    this.add
      .tween(obj)
      .to({ width: obj.width * 1.08, height: obj.height * 1.08 },
        400,
        Phaser.Easing.Linear.In,
        true,
        0,
        10000,
        true
      );
  },

  phoneValidate: function(num) {
    if (!/^1(3|4|5|7|8)\d{9}$/.test(num)) {
      return false;
    } else {
      return true;
    }
  },

  addMask: function(alpha) {
    var mask = this.add.graphics();
    mask.beginFill(0x000000, alpha);
    mask.drawRect(0, 0, w, h);
    mask.endFill();

    return mask;
  },
  changeArr: function(arr) {
    var newArr = arr.sort(function() {
      return 0.5 - Math.random();
    });
    return newArr;
  }

}
