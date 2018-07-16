class Ball {
  constructor(game) {
    this.game = game;
    this.run = 0;
    this.positions = {
      'x' : this.game.settings.info.coll_count/2,
      'y' : this.game.settings.info.row_count-2,
    };
    this.directions = {
      'x' : 1,
      'y' : 0
    }
    this.runPositionValue = 1;
    this.init();
  }

  init() {
    this.clearBall();
    this.printBall();
  }

  runBall() {
    var self = this;

    this.run = 1;
    if(!this.checkBallPosition()) {
      return false;
    }
    this.moveBall();
    this.clearBall();
    this.printBall();
    setTimeout(function() {
      self.runBall();
    }, this.game.timeout);

  }

  checkBallPosition() {
    if(this.positions.x == 1) {
      this.directions.x = 1;
    }

    if(this.positions.x == this.game.settings.info.coll_count) {
      this.directions.x = 0;
    }

    if(this.positions.y == 1) {
      this.directions.y = 0;
    }

    //check for die
    if(this.positions.y == this.game.settings.info.row_count-1) {
      if(!this.checkPlayerContact(this.positions.x)) {
        return false;
      }

      this.directions.y = 1;
    }

    if(!this.checkWallHit()) {

    }

    return true;
  }

  checkPlayerContact(x) {

    if(this.game.map[this.game.settings.info.row_count][x].value == 'player') {
      return true;
    }

    this.game.gameOver();
    this.clearBall();
    return false;
  }

  attacheEvents() {
    var events = new Events();
    if(this.game.settings.ball.event) {
      events[this.game.settings.ball.event](1, this);
    }
  }

  printBall() {
    var row = this.positions.y;
    var coll = this.positions.x;
    //this.game.map[row][coll].value = this.game.settings.game_settings.cells_values.ball;
    var cell = $('.' + this.game.settings.map.class).find("[data='" + row + "']").find("[data='" + coll + "']");
    cell.addClass(this.game.settings.ball.class);
  };

  clearBall() {
    var coll = this.positions.x;
    var row = this.positions.y;
    //this.game.map[row][coll].value = this.game.settings.game_settings.cells_values.empty;
    $('.' + this.game.settings.ball.class).removeClass(this.game.settings.ball.class);
  };

  moveBall() {
    if(this.directions.x)
      this.positions.x += this.runPositionValue;
    else
      this.positions.x -= this.runPositionValue;

    if(this.directions.y)
      this.positions.y -= this.runPositionValue;
    else
      this.positions.y += this.runPositionValue;
    //console.log(this.positions);
  }

  checkWallHit() {
    var nextPos = this.getNextPositions();
    var wall_id;
    if(!nextPos) {
      return false;
    }

    if(wall_id = this.checkBallIsHitNextPosition(nextPos)) {
        //console.log(this.directions);
        this.game.wall.removeWall(wall_id);
        //console.log(this.directions);
    }
    //console.log('not hit');
  }
  getNextPositions() {
    var variants = [];
    var x; var y;

    if(this.directions.x && this.directions.y) {

      x = this.positions.x + this.runPositionValue;
      variants.push({'x' : this.positions.x, 'y' : this.positions.y - this.runPositionValue, 'switch_direction' : ['y']}); //top
      variants.push({'x' : this.positions.x + this.runPositionValue, 'y' : this.positions.y - this.runPositionValue, 'switch_direction' : ['x', 'y']}); //top + right
      variants.push({'x' : this.positions.x + this.runPositionValue, 'y' : this.positions.y, 'switch_direction' : ['x']}); //right
      //console.log(variants);
    }
    else if(!this.directions.x && this.directions.y) {
      //left top
      x = this.positions.x + this.runPositionValue;
      variants.push({'x' : this.positions.x, 'y' : this.positions.y - this.runPositionValue, 'switch_direction' : ['y']}); //top
      variants.push({'x' : this.positions.x - this.runPositionValue, 'y' : this.positions.y - this.runPositionValue, 'switch_direction' : ['x', 'y']}); //top + left
      variants.push({'x' : this.positions.x - this.runPositionValue, 'y' : this.positions.y, 'switch_direction' : ['x']}); //left
    }
    else if(!this.directions.x && !this.directions.y) {
      //left down
      x = this.positions.x + this.runPositionValue;
      variants.push({'x' : this.positions.x, 'y' : this.positions.y + this.runPositionValue, 'switch_direction' : ['y']}); //down
      variants.push({'x' : this.positions.x - this.runPositionValue, 'y' : this.positions.y + this.runPositionValue, 'switch_direction' : ['x', 'y']}); //down + left
      variants.push({'x' : this.positions.x - this.runPositionValue, 'y' : this.positions.y, 'switch_direction' : ['x']}); //left
    }
    else if(this.directions.x && this.directions.y) {
      //right down
      x = this.positions.x + this.runPositionValue;
      variants.push({'x' : this.positions.x, 'y' : this.positions.y + this.runPositionValue, 'switch_direction' : ['y']}); //down
      variants.push({'x' : this.positions.x + this.runPositionValue, 'y' : this.positions.y + this.runPositionValue, 'switch_direction' : ['x', 'y']}); //down + right
      variants.push({'x' : this.positions.x + this.runPositionValue, 'y' : this.positions.y, 'switch_direction' : ['x']}); //right
      //console.log(variants);
    }
    //   x = this.positions.x - this.runPositionValue;

    // if(this.directions.y)
    //   y = this.positions.y -  this.runPositionValue;
    // else
    //   y = this.positions.y + this.runPositionValue;

    // if(!x || this.game.settings.info.coll_count < x || !y || this.game.settings.info.row_count < y) {
    //   return false;
    // }

    return variants;
  }

  checkBallIsHitNextPosition(variants) {
    for(var i = 0; i < variants.length; i++) {
      if(this.game.map[variants[i].y][variants[i].x].value == this.game.settings.game_settings.cells_values.wall) {
        if(this.game.map[variants[i].y][variants[i].x].wall_id) {
          this.changeDirection(variants[i].switch_direction);
          return this.game.map[variants[i].y][variants[i].x].wall_id;
        }
      }
    }

    return false;
  }

  changeDirection(directions) {
    for(var i = 0; i < directions.length; i++) {
      switch(directions[i]) {
        case 'x' :
          if(this.directions.x && this.positions.x > 1){
            this.directions.x = 0;

          }
          else
            if(this.positions.x < this.game.settings.info.coll_count)
              this.directions.x = 1;
          break;
        case 'y' :
          if(this.directions.y)
            this.directions.y = 0;
          else
            if(this.positions.y > 1)
              this.directions.y = 1;
          break;
      }
    }
  }
}




//   checkWallHit() {
//     var pos = this.nextPosition();
//     console.log(pos);
//     if(pos[0] && pos[1] && this.game.map[pos[1]][pos[0]].value == this.game.settings.game_settings.cells_values.wall) {
//       if(this.game.map[pos[1]][pos[0]].wall_id) {
//         this.game.wall.removeWall(this.game.map[pos[1]][pos[0]].wall_id);

//         this.game.map[pos[0]][pos[0]].value = this.game.settings.game_settings.cells_values.empty;
//       }
//     }
//   }
