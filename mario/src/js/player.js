let money = {};
class Player {
  constructor(settings, game) {
    this.game = game;
    this.stop = 1;
    this.keypress = 0;
    this.moveAction = 0;
    this.activeJumpAnimation = 0;
    this.main_src = 'http://localhost/2019/jsGames/mario/';
    this.settings = settings;
    this.setInitialPositions();
    this.attacheEvents();
  }

  setInitialPositions() {
    this.position = {
      y: this.settings.player.position[0],
      x: this.settings.player.position[1]
    };
  }

  initPlayer() {
    var cell = this.find(this.position.x, this.position.y);
    if(cell) {
      this.printPlayer(this.settings.player.src.stay);
      $(cell).append(this.player);
    }
  }

  deletePlayer() {
    this.player.remove();
    this.player = null;
  }

  printPlayer(img) {
    this.player = $('<img class="' + this.settings.player.class + '"/>');
    this.player.attr('src', this.main_src + img);
    return this.player;
  }

  changePlayerImage(img) {
    this.player.attr('src', this.main_src + img);
  }

  find(x, y) {
    var cell = $("." + this.settings.map.row.class + "[data='" + y + "']").find("." + this.settings.map.coll.class + "[data='" + x + "']");
    return cell;
  }

  playerJump() {
    if(this.moveAction == 0)
      this.jumpAnimation();
  }

  jumpAnimation() {
    var self = this;

    this.player.attr('src', this.main_src + this.settings.player.src.jump);
    this.contor = this.checkUpIsWall(money);

    for(var i = 1; i <= this.contor; i++) {
      setTimeout(function() {
        self.player.css({top: self.player.position().top - self.settings.player.data.jump});

        if(self.moveAction == 1)
          self.player.css({left: self.player.position().left + self.settings.player.data.jumpMove/2});
        if(self.moveAction == -1)
          self.player.css({left: self.player.position().left - self.settings.player.data.jumpMove/2});
      }, 100)
    }

    if(money.active) {
      console.log(money);
      this.collectMoneyEvent(money);
    }

    this.contor = this.checkDownIsWall();
    for(var j = 1; j <= this.contor; j++) {
      setTimeout(function() {
        self.player.css({top: self.player.position().top + self.settings.player.data.jump});

        if(self.moveAction == 1)
          self.player.css({left: self.player.position().left + self.settings.player.data.jumpMove/2});
        if(self.moveAction == -1)
          self.player.css({left: self.player.position().left - self.settings.player.data.jumpMove/2});
      }, 100)
    }

    setTimeout(function() {
      self.setNextPosition();
      self.player.attr('src', self.main_src + self.settings.player.src.stay);
      self.activeJumpAnimation = 0;
      self.moveAction = 0;
      self.deletePlayer();
      self.initPlayer();
      self.checkAfterMoveOX();
    }, 200)
  }

  collectMoneyEvent(money) {
    var cell;

    if(cell = this.checkUpIsWall(money)) {
      money.gold--;
      if(money.gold == 0) {
        this.changeEmptyGoldCell(cell, 1);
      }
      else {
        this.changeEmptyGoldCell(cell, 0);
      }
    }
  }

  changeEmptyGoldCell(cell, empty) {

    var cell_cell;
    var gold_anim;
    var self = this;
    switch(cell) {
      case 30:
        cell_cell = this.find(this.position.x, this.position.y-1);
        gold_anim = this.find(this.position.x, this.position.y-2);
        break;
      case 80:
        cell_cell = this.find(this.position.x, this.position.y-2);
        gold_anim = this.find(this.position.x, this.position.y-3);
        break;
      case 120:
        cell_cell = this.find(this.position.x, this.position.y-3);
        gold_anim = this.find(this.position.x, this.position.y-4);
        break;
    }

    if(empty && cell_cell) {
      cell_cell.removeClass(this.settings.map.classes[3]);
      cell_cell.addClass(this.settings.map.classes[4]);
    }

    if(cell_cell) {
      var class_name = cell_cell.attr('class').split(' ')[1];

      if(this.settings.map.classes[3] == class_name) {
        gold_anim.addClass(this.settings.map.classes[5]);

        setTimeout(function() {
          gold_anim.removeClass(self.settings.map.classes[5]);
        }, 200);
      }
    }
  }



  checkUpIsWall(money = {}) {
    var cells = [];
    cells[0] = this.find(this.position.x, this.position.y-1).attr('class').split(' ');
    cells[1] = this.find(this.position.x, this.position.y-2).attr('class').split(' ');
    cells[2] = this.find(this.position.x, this.position.y-3).attr('class').split(' ');

    if(this.checkIfStabilWallUP(cells[0][1], money)) {
      return 30;
    }

    if(this.checkIfStabilWallUP(cells[1][1], money)) {
      return 80;
    }

    if(this.checkIfStabilWallUP(cells[2][1], money)) {
      return 120;
    }

    return 200;
  }

  setNextPosition() {
    var cells = [];
    //if wall is to up
    cells[0] = this.find(this.position.x, this.position.y-1).attr('class').split(' ');
    cells[1] = this.find(this.position.x, this.position.y-2).attr('class').split(' ');
    cells[2] = this.find(this.position.x, this.position.y-3).attr('class').split(' ');


    //if wall is down
    cells[3] = this.find(this.position.x + 1, this.position.y-3).attr('class').split(' ');
    cells[4] = this.find(this.position.x + 1, this.position.y-2).attr('class').split(' ');
    cells[5] = this.find(this.position.x + 2, this.position.y-2).attr('class').split(' ');
    cells[6] = this.find(this.position.x + 1, this.position.y-1).attr('class').split(' ');
    cells[7] = this.find(this.position.x + 2, this.position.y-1).attr('class').split(' ');
    cells[8] = this.find(this.position.x + 1, this.position.y).attr('class').split(' ');
    cells[9] = this.find(this.position.x + 2, this.position.y).attr('class').split(' ');

    var x = this.position.x;
    var y = this.position.y;
    var ex = 0;

    if(this.checkIfStabilWall(cells[0][1])) {
      return;
    }

    if(this.checkIfStabilWall(cells[1][1])) {
      if(this.moveAction != 0)
        this.setPositions((this.position.x + 1*this.moveAction), this.position.y);

      return;
    }

    if(this.checkIfStabilWall(cells[2][1])) {
      if(this.moveAction != 0)
        this.setPositions((this.position.x + 1*this.moveAction), this.position.y);
      return;
    }

    if(this.checkIfStabilWall(cells[3][1]) && this.moveAction) {
      x = this.position.x + 1;
      y = this.position.y -4;
    }

    if(this.checkIfStabilWall(cells[4][1]) && this.moveAction) {
      x = this.position.x + 1;
      y = this.position.y -3;
    }

    if(this.checkIfStabilWall(cells[5][1]) && this.moveAction) {
      x = this.position.x + 2;
      y = this.position.y - 3;
    }

    if(this.checkIfStabilWall(cells[7][1]) && this.moveAction) {
      x = this.position.x + 2;
      y = this.position.y - 2;
    }

    if(this.checkIfStabilWall(cells[6][1])&& this.moveAction) {
      x = this.position.x + 1;
      y = this.position.y - 2;
    }

    if(this.checkIfStabilWall(cells[9][1]) && this.moveAction) {

      x = this.position.x + 2;
      y = this.position.y - 1;
      ex = 1;
    }

    if(this.checkIfStabilWall(cells[8][1]) && this.moveAction && !ex) {
      x = this.position.x;
      y = this.position.y;
    }

    if(x == this.position.x && y == this.position.y && this.moveAction != 0) {

      x = this.position.x + 2*this.moveAction;
    }

    this.setPositions(x, y);
  }

  checkIfStabilWallUP(value, money = {}) {

    if(value == 'wall') {
      return true;
    }
    else if(value == 'gold' ) {
      if(typeof money.gold == 'undefined' || money.gold == 0) {
        money.gold = Math.floor(Math.random() * 5) + 1;
        money.active = true;
      }
      return true;
    }
    else if(value == 'empty_gold' ) {

      money.gold = Math.floor(Math.random() * 5) + 1;
      money.active = true;

      return true;
    }


    return false;
  }

  checkIfStabilWall(value) {
    if(value == 'wall') {
      return true;
    }
    if(value == 'gold' ) {
      return true;
    }

    if(value == 'empty_gold' ) {
      return true;
    }


    return false;
  }

  checkDownIsWall() {

    var cells = [];
    var return_val = 200;
    //if wall is to up
    cells[0] = this.find(this.position.x, this.position.y-1).attr('class').split(' ');
    cells[1] = this.find(this.position.x, this.position.y-2).attr('class').split(' ');
    cells[2] = this.find(this.position.x, this.position.y-3).attr('class').split(' ');

    //if wall is down
    cells[3] = this.find(this.position.x + 1, this.position.y-3).attr('class').split(' ');
    cells[4] = this.find(this.position.x + 1, this.position.y-2).attr('class').split(' ');
    cells[5] = this.find(this.position.x + 2, this.position.y-2).attr('class').split(' ');
    cells[6] = this.find(this.position.x + 1, this.position.y-1).attr('class').split(' ');
    cells[7] = this.find(this.position.x + 2, this.position.y-1).attr('class').split(' ');
    cells[8] = this.find(this.position.x + 1, this.position.y).attr('class').split(' ');
    cells[9] = this.find(this.position.x + 2, this.position.y).attr('class').split(' ');



    if(this.checkIfStabilWall(cells[0][1])) {
      return 30;
    }

    if(this.checkIfStabilWall(cells[1][1])) {
      return 80;
    }

    if(this.checkIfStabilWall(cells[2][1])) {
      return 120;
    }

    if(this.checkIfStabilWall(cells[3][1])) {

      return 40;
    }

    if(this.checkIfStabilWall(cells[4][1])) {

      return 40;
    }

    if(this.checkIfStabilWall(cells[5][1])) {

      return 80;
    }

    if(this.checkIfStabilWall(cells[7][1])) {

      return 120;
    }

    if(this.checkIfStabilWall(cells[6][1])) {

      return 120;
    }

    if(this.checkIfStabilWall(cells[9][1])) {

      return 160;
    }

    if(this.checkIfStabilWall(cells[8][1])) {

      return 160;
    }


    return 200;
  }

  setPositions(x, y) {
    if(x > 26) {
      this.game.map.regenerate();

      return false;
    }
    this.position.x = x;
    this.position.y = y;

    return true;
  }

  playerMove(direction) {

    var cell = this.find(this.position.x + 1, this.position.y).attr('class').split(' ');
    if(this.activeJumpAnimation){
      return;
    }

    var cell2 = this.find(this.position.x + -1, this.position.y).attr('class').split(' ');

    if((cell[1] == 'wall' && direction == 1) || (cell2[1] == 'wall' && direction == -1))  {
      this.activeJumpAnimation = 0;
      this.moveAction = 0;
      return;
    }
    if(direction)
      this.moveRightAnimation();
    else
      this.moveLeftAnimation();
  }

  moveRightAnimation() {
    var self = this;
    this.player.attr('src', this.main_src + this.settings.player.src.run);
    for(var i = 1; i <= 200; i++) {
      setTimeout(function() {
        if(self.stop){
          self.player.css({left: self.player.position().left + self.settings.player.data.move});
        }
      }, 100)
    }

    setTimeout(function() {
      self.player.attr('src', self.main_src + self.settings.player.src.stay);
      self.moveAction = 0;
      self.activeJumpAnimation = 0;

      if(self.stop) {
        if(self.setPositions(++self.position.x, self.position.y)) {
          self.deletePlayer();
          self.initPlayer();
          self.checkAfterMoveOX();
        }
      }
    }, 100)
  }

  checkAfterMoveOX() {
    this.stop = 0;
    var self = this;

    if(this.position.y > 13) {
      this.stop = 1;
      setTimeout(function() {
        self.deletePlayer();
        self.initPlayer();
        // self.player.attr('src', self.main_src + self.settings.player.src.stay);
      }, 40);
      return;
    }
    var class_name = this.find(this.position.x, this.position.y + 1).attr('class').split(' ')[1];

    if(!this.checkIfStabilWall(class_name)) {
      this.moveDown();
    }
  }

  moveDown() {
    var self = this;
    self.player.attr('src', self.main_src + self.settings.player.src.jump);
    for(var i = 1; i <= 60; i++) {
      setTimeout(function() {
        self.player.css({top: self.player.position().top + self.settings.player.data.jump});
      }, 40);
    }

    self.setPositions(self.position.x, ++self.position.y);
    self.checkAfterMoveOX();
  }

  moveLeftAnimation() {
    var self = this;
    this.player.attr('src', this.main_src + this.settings.player.src.run);
    for(var i = 1; i <= 200; i++) {
      setTimeout(function() {
        if(self.stop) {
          self.player.css({left: self.player.position().left - self.settings.player.data.move});
        }
      }, 100)
    }

    setTimeout(function() {
      self.player.attr('src', self.main_src + self.settings.player.src.stay);
      self.activeJumpAnimation = 0;
      self.moveAction = 0;
      if(self.stop) {
        self.setPositions(--self.position.x, self.position.y);
        self.deletePlayer();
        self.initPlayer();
        self.checkAfterMoveOX();
      }
    }, 100)
  }

  attacheEvents() {
    var self = this;
    $(window).keydown(function(event) {

      self.keypress++;
      self.stop = 1;
      switch(event.which) {
        case 38: // up
        case 32: // space
          if(!self.activeJumpAnimation) {
            self.activeJumpAnimation = 1;
            self.playerJump();
          }
          break;
        case 39: // right
          self.moveAction = 1;
          self.playerMove(1);
          break;
        case 37: // left
          self.moveAction = -1;
          self.playerMove(0);
          break;
      }
    });
    $(window).keyup(function(event) {

      switch(event.which) {
        case 39: // right
        case 37: // left
          if(self.keypress > 1)
            self.stop = 0;
          break;
      }

      self.keypress = 0;
    });
  }
}
