let Preloader = Object.assign({}, BaseState, {
    init: function () {
        if (!this.game.device.desktop) {
          //this.game.stage.backgroundColor = "#d4d8d3";
          this.game.input.maxPointers = 5;
          this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.game.scale.forceOrientation(false, true);
        }
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    },
    preload: function () {
        let base = window.baseURI;
        this.load.crossOrigin = true;
        // common
        this.load.image('logo', base + 'logo.png');
        this.load.image('mh', base + 'mh.png');

        this.load.atlasXML('spObj', baseURI + 'sp.png', baseURI + 'sp.xml');

        this.load.onFileComplete.add(function (progess) {
            //document.getElementById('loadingText').innerHTML = progess + '%'
        });

        this.load.onLoadComplete.add(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('page1').style.display = 'block';
            this.state.start('State1')
        })
    },
    create: function () {

    }
});
