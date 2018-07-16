class Wall {
  constructor(game) {
    this.game = game;
    this.length = 3;
    this.uniq = 1;
    this.walls = [];
  }
  createWall(position_y, newline) {
    var wall = {};
    var position_x = 1;
    wall.id = this.uniq++;
    wall.length = 5;
    wall.color = this.getRandomColor();
    if(newline) {
      position_x = 1;
    }
    else{
      if(this.walls.length) {
        var last = this.walls.slice(-1)[0];
        position_x = last.positions.x + last.length;
      }
    }

    wall.positions = {
      'x' : position_x,
      'y' : position_y,
    };
    if(position_x + wall.length > this.game.settings.info.coll_count + 1) {
      return false;
    }

    this.attacheWall(wall);
    this.walls.push(wall);

    return true;
  }

  attacheWall(wall) {
    for(var i = wall.positions.x; i < wall.positions.x + wall.length; i++ ) {
      var row = wall.positions.y;
      var coll = i;
      var cell = $('.' + this.game.settings.map.class).find("[data='" + row + "']").find("[data='" + coll + "']");
      this.game.map[row][coll].value = this.game.settings.game_settings.cells_values.wall;
      this.game.map[row][coll].wall_id = wall.id;
      cell.addClass(this.game.settings.wall.class);
      cell.css("background-color", wall.color);
      cell.attr(this.game.settings.wall.data_attribute, wall.id);
    }
  }

  deleteWall(wall) {

  }

  removeWall(id) {
    for(var wall in this.walls) {
      if(this.walls[wall].id == id) {
        var x = this.walls[wall].positions.x;
        var y = this.walls[wall].positions.y;
        for(var i = x; i < x + this.walls[wall].length; i++) {
          this.game.map[y][i].value = this.game.settings.game_settings.cells_values.empty;
        }

        $('*[' + this.game.settings.wall.data_attribute + '="' + id + '"]').css('background-color', '');
        $('*[' + this.game.settings.wall.data_attribute + '="' + id + '"]').removeClass(this.game.settings.wall.class);
        delete this.walls[wall];
      }
    }
    return false;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
