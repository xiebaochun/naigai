var State3 = Object.assign({}, BaseState, {
  init: function() {
    console.log('init')
  },
  preload: function() {},
  create: function() {
    console.log(Object)
    var obj = this.asw(w / 2, h / 2, 'logo', 50)
      // this.fromLeft(obj, function() {
      //   console.log('animation ok')
      // }, 5000)
    this.add.tween(obj).from({ alpha: 0 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(() => {
      this.dangling(obj)
    })
    console.log('create')
  }


})