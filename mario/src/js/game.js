class Game {
  constructor () {
    this.settings = new Settings();
    this.events = new Events();
    this.htmlGenerator = new CreateHtmlElementsBySettings();
    this.map = new Map(this);
    this.player = new Player(this.settings, this);
    this.init();
  };

  init () {
    this.map.generate();
  };
};


$(document).ready(function() {
    new Game();
});
