class Map {
  constructor(game) {
    this.current_map = 1;
    this.game = game;
    this.map_data = [];
    this.settings = game.settings;
    this.htmlGenerate = game.htmlGenerator;
    this.events = game.events;
  }

  generate() {
    var body = this.htmlGenerate.createElement(this.settings.map.body);
    this.generateMap(body);
    var container = $(this.settings.selectors.map.container);
    container.append(body);
  }

  regenerate() {
    this.clear();
    this.game.player.setInitialPositions();
    this.game.player.deletePlayer();
    this.game.player.initPlayer();
    this.generate();
  }

  clear() {
    var container = $(this.settings.selectors.map.container);
    container.html('');
  }

  generateMap(body) {
    this.getMapData(body);
  }

  getMapData(body) {
    var self = this;
    var map_number = self.current_map++;
    if(map_number > this.settings.map.maps_count) {
      self.current_map = map_number = 1;
    }

    $.ajax({
    url: "src/maps/map_" + map_number + ".php",
    }).done(function(data) {
      self.createMap(JSON.parse(data), body);
    });
  }

  createMap(data, body) {
    for(var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass(this.settings.map.row.class);
      row.attr('data', i);
      for(var j = 0; j < data[i].length; j++) {
        var coll = $("<div>");
        coll.addClass(this.settings.map.coll.class);
        coll.addClass(this.settings.map.classes[data[i][j]]);
        coll.attr('data', j);
        row.append(coll);
      }

      body.append(row);
    }
    this.game.player.initPlayer();
  }
}
