var Boot = Object.assign({}, BaseState, {
  init: function() {

    console.log(this, game.game)
    if (!this.game.device.desktop) {
      //this.game.stage.backgroundColor = "#d4d8d3";
      this.game.input.maxPointers = 5;
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.forceOrientation(false, true);
    }
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
  },
  preload: function() {
    //this.game.load.crossOrigin = true;
  },
  create: function() {
    this.game.state.start("Preloader");
  }
});
