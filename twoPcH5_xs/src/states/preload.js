var Preloader = Object.assign({}, BaseState, {
  init: function() {

  },
  preload: function() {
    var base=window.baseURI
    this.load.crossOrigin = true;
    // common
    this.load.image('logo', base+'logo.png')
    this.load.image('mh', base+'mh.png')
    
    this.load.atlasXML('spObj', baseURI + 'sp.png', baseURI + 'sp.xml');
    this.load.atlasXML('iO', baseURI + 'i.png', baseURI + 'i.xml');
    this.load.audio('gameMusic', baseURI + 'game.mp3');
    this.load.audio('ddMusic', baseURI + 'dd.mp3');

    this.load.onFileComplete.add(function(progess) {
      document.getElementById('loadingText').innerHTML = progess + '%'
    })
    this.load.onLoadComplete.add(() => {
      document.getElementById('loading').style.display = 'none'
      this.state.start('State1')
    })
  },
  create: function() {
    
  }
});
