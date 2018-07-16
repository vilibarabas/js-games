class Game {
  constructor () {
    this.settings = new Settings();
    this.timeout = 50;
    this.level = 1;
    this.difficulty = 100;
    this.nextRound = 0;
    this.fakeClickCount = 0;
    this.map = [];
    this.balls_count = 1;
    this.balls = [];
    this.init();
  };

  init () {
    var container = $(this.settings.selectors.map.container);
    var gameContainer = new CreateHtmlElementsBySettings(this.settings.game_container);
    var header = new CreateHtmlElementsBySettings(this.settings.header);
    var game_start = new CreateHtmlElementsBySettings(this.settings.game_start, new Events(), this);
    this.setRowsAndColls();
    var map = this.createMap();
    gameContainer.append(header);
    gameContainer.append(map);
    gameContainer.append(game_start);
    container.append(gameContainer);
    this.generateMapMatrix();
    this.initGame();
    this.generateWalls();
  };

  initGame() {
    for(var i = 0; i < this.balls_count; i++)
      this.balls.push(new Ball(this));
    this.player = new Player(this);
  }

  generateWalls() {
    this.wall = new Wall(this);
    for(var i = 1; i <= this.settings.info.wall_rows; i++) {

      var new_line = 1;
      while(this.wall.createWall(i, new_line)) {
        new_line = 0;
      }
    }
  }

  clearGame() {
    for(var i = 0; i < this.balls_count; i++)
      this.balls[i].clearBall();
    this.player.clearPlayer();
  }

  startGame() {
    $('.' + this.settings.game_start.class).hide();
    for(var i = 0; i < this.balls_count; i++)
      this.balls[i].runBall();
  }

  setRowsAndColls() {
    this.settings.map.child[0].count = this.settings.info.row_count;
    this.settings.map.child[0].child[0].count = this.settings.info.coll_count;
  }


  generateMapMatrix() {
    for(var i = 1; i <= this.settings.info.row_count; i++) {
      for(var j = 1; j <= this.settings.info.coll_count; j++) {
        var cell = {
          'value' : this.settings.game_settings.cells_values.empty
        };
        if(!this.map[i]) {
          this.map[i] = [];
        }
        this.map[i][j] = cell;
      }
    }
  }

  createMap() {
    return new CreateHtmlElementsBySettings(this.settings.map, new Events(), this);
  }

  gameOver() {
    this.clearGame();
    $('.' + this.settings.game_start.class).show();
    this.initGame();
  }
};

$(document).ready(function() {
    new Game();
});
