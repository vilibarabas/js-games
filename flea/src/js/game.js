class Game {
  constructor () {
    this.settings = new Settings();
    this.rows = this.settings.info.row_count;
    this.colls = this.settings.info.coll_count;
    this.timeout = 2000;
    this.level = 1;
    this.difficulty = 100;
    this.nextRound = 0;
    this.fakeClickCount = 0;
    this.init();
  };

  init () {
    var container = $(this.settings.selectors.map.container);
    var gameContainer = new CreateHtmlElementsBySettings(this.settings.game_container);
    var header = new CreateHtmlElementsBySettings(this.settings.header);
    this.setRowsAndColls();
    this.map = this.createMap();
    gameContainer.append(header);
    gameContainer.append(this.map);
    container.append(gameContainer);
    this.setLevel(this.level)
    this.startGame();
  };

  setRowsAndColls() {
    this.settings.map.child[0].count = this.rows;
    this.settings.map.child[0].child[0].count = this.colls;
  }

  createMap() {
    return new CreateHtmlElementsBySettings(this.settings.map, new Events(), this);
  }

  startGame() {
    var flea =  new Flea();
    this.runGame(flea);
  }

  runGame(flea) {
    var self = this;
    this.setGameRate();
    this.setNextRound(1);
    flea.removeFlea();
    flea.printFlea();
    setTimeout(function() {
      self.fakeClick();
      self.runGame(flea);
    }, this.gameRate);
  }

  levelUp() {
    this.setLevel(this.level++);
    this.fakeClickCount = 0;
  }

  setLevel(level) {
    var levelContainer = $('.' + this.settings.header.child[0].child[1].class);
    levelContainer.text(level);
  }

  fakeClick() {
    if(this.nextRound) {
      this.fakeClickCount++;
    }
    if(this.faleClickCount > 9) {
      this.fakeClickCount = 0;
      this.setLevel(this.level--);
    }
    this.setNextRound(0);
  }

  setNextRound(val) {
    this.nextRound = val;
  }

  setGameRate() {
    this.gameRate = this.timeout - this.level * this.difficulty;
  }
};

class Flea {
  constructor() {
    this.settings = new Settings();
    this.init();
  };

  init() {
    this.createFlea();
  }

  createFlea() {
    this.flea = new CreateHtmlElementsBySettings(this.settings.flea);
  }

  printFlea() {
    var position = this.getRandomCell();
    var cell = $('.' + this.settings.map.class).find("[data='" + position.row + "']").find("[data='" + position.coll + "']");
    $(cell).append(this.flea);
  }

  removeFlea() {
    var flea = $('.' + this.settings.flea.class);
    flea.parent().html();
  }

  getRandomCell() {
    var position =
    {
      'row' : this.getRandomArbitrary(1, this.settings.info.row_count),
      'coll' : this.getRandomArbitrary(1, this.settings.info.coll_count)
    };

    return position;
  }

  getRandomArbitrary (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};


$(document).ready(function() {
    new Game();
});
