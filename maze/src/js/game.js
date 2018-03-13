class Settings {
  constructor () {
    this.settings = {
      'map' : {
        'selectors' : {
          'container' : '.container'
        },
        'classes' : {
          'body' : 'game-body',
          'row' : 'game-row',
          'col' : 'game-col',
          'start' : 'startTab',
          'over' : 'overTab',
          'score' : 'score-container',
          'header':'header',
          'gameContainer' : 'game-container',
          'header_score' : 'header-score',
          'header_name' : 'header-name',
          'topScoreList' : 'top-score-list',
          'controll' : {
            'container' : 'controll-buttons',
            'up' : 'controll-up',
            'left' : 'controll-left',
            'right' : 'controll-right',
          }

        },
        'ids' : {
          'row' : 'row-id-',
          'col' : 'col-id-',
          'name' : 'name'
        },
        'tags' : {
          'body' : 'table',
          'row' : 'tr',
          'col' : 'td',
        },
        'dimensions' : {
          'rows_nr' : 20,
          'cols_nr' : 20
        }
      },
      'player': {
        'source' : 'src/images/player.gif',
        'selector' : {
          'class' : 'player-select'
        }
      },
      'texts' : {
      	'header_name' : 'Hi ',
        'header_score' : 'Your Score: ',
        'end_score' : 'Your Score: ',
      }
    };
  };
}

class Map {
  constructor (game) {
    this.game = game;
    this.settings = new Settings();
    this.settings = this.settings.settings;
    this.timeoutTime = 100;
    this.maxOrizontalCells = 8;
    this.route = {};
    this.init();
  };

  init () {
    var map = this.createMap();
    var container = $(this.settings.map.selectors.container);
    var game_container = this.crateHtmlElement("div", {'class' : this.settings.map.classes.gameContainer});
    this.createHeaderTab(game_container);
    game_container.append(map);
    this.createStartForm(game_container);
    this.createOverForm(game_container);
    container.append(game_container);
    container.append(this.createControllButtons());
  };

  mapMoveUp() {
    this.clearMap();
    this.changeRoute();
    this.printRoute();
  }

  mapMoveOrizontal() {
    this.clearMap();
    this.printRoute();
  }

  getRoute() {
    return this.route;
  }

  clearMap() {
    for(var row = 1; row <= this.settings.map.dimensions.rows_nr; row++) {
      for(var col = 1; col <= this.settings.map.dimensions.cols_nr; col++) {
        this.selElementStyle(row, col, '#d9d9d9', 1, 1);
      }
    }
  }

  emptyRoute() {
    this.route = {};
  }

  changeRoute() {
    var new_route = {};
    for(var i = this.settings.map.dimensions.cols_nr; i >= 1 ; i--) {
      if(i == 1) {
        var vertical_cells_nr = this.getRandomArbitrary(2, this.maxOrizontalCells);
        var route_direction = this.getRandomArbitrary(0, 1);
        var last_cell_keys = Object.keys(this.route[i]);
        if( last_cell_keys.length > 1) {
          vertical_cells_nr = 1;
        }
        this.last_cell_key = this.setCells(new_route, i, route_direction, this.last_cell_key, vertical_cells_nr);
      }
      else {
        new_route[i] = jQuery.extend(true, {}, this.route[i-1]);
      }
    }

    this.route = new_route;
  }

  createMap() {
    var body = this.crateHtmlElement(this.settings.map.tags.body, {'class' : this.settings.map.classes.body});
    for(var row = 1; row <= this.settings.map.dimensions.rows_nr; row++) {
      var rowElement = this.crateHtmlElement(this.settings.map.tags.row, {'class' : this.settings.map.classes.row, 'attr' : { 'id' : this.settings.map.ids.row + row}});
      for(var col = 1; col <= this.settings.map.dimensions.cols_nr; col++) {
        var colElement = this.crateHtmlElement(this.settings.map.tags.col, {'class' : this.settings.map.classes.col, 'attr' : { 'id' : this.settings.map.ids.col + col}});
        //colElement.text(col);
        rowElement.append(colElement);
      }
      body.append(rowElement);
    }
    return body;
  }

  checkMove(move) {
    return  this.game.player.direction == 0 ? 1 : 0;
  }

  createControllButtons() {
    var self = this;
    var go = 0;

    var buttons = this.crateHtmlElement('div', {'class' : this.settings.map.classes.controll.container});
    var button = this.crateHtmlElement('button', {'class' : this.settings.map.classes.controll.up}, "UP");
    button.click(function(){
      go = self.checkMove();
      self.game.player.direction = 1;
      if(go == 1) {
        self.game.runPlayer(self.game.player.direction);
      }
    });
    buttons.append(button);
    var button = this.crateHtmlElement('button', {'class' : this.settings.map.classes.controll.left}, "LEFT");
    button.click(function(){
      go = self.checkMove();
      self.game.player.direction = 2;
      if(go == 1) {
        self.game.runPlayer(self.game.player.direction);
      }
    });
    buttons.append(button);
    var button = this.crateHtmlElement('button', {'class' : this.settings.map.classes.controll.right}, "RIGHT");
    button.click(function(){
      go = self.checkMove();
      self.game.player.direction = 3;
      if(go == 1) {
        self.game.runPlayer(self.game.player.direction);
      }
    });
    buttons.append(button);

    var button = this.crateHtmlElement('button', {'class' : this.settings.map.classes.controll.restart}, "RR");
    button.click(function(){
      self.clearMap();
      self.emptyRoute();
      self.game.startGame();
    });
    buttons.append(button);

    return buttons;
  }


  crateHtmlElement(tag_name, attributes, text = '') {
    var element = $("<" + tag_name + ">");
    if(attributes['class']) {
      element.addClass(attributes['class']);
    }
    if(attributes['attr']) {
      for(var attr in attributes['attr'])
        element.attr(attr, attributes['attr'][attr]);
    }

    if(text.length > 0) {
      element.text(text);
    }
    return element;
  }

  createRoute() {
    var startCol = this.getRandomArbitrary(1, this.settings.map.dimensions.rows_nr);
    for(var row = this.settings.map.dimensions.rows_nr; row > 0 ; row--) {
      var vertical_cells_nr = 1;
      var route_direction = this.getRandomArbitrary(0, 1);
      var cell_indetificator = startCol;
      if(row != this.settings.map.dimensions.rows_nr) {
        var cell_indetificator = this.last_cell_key;
        var vertical_cells_nr = this.getRandomArbitrary(2, this.maxOrizontalCells);
      }
      else {
        this.last_cell_key = startCol;
      }

      if(last_vertical_cells_nr && last_vertical_cells_nr > 1) {
        vertical_cells_nr = 1;
      }

      this.last_cell_key = this.setCells(this.route, row, route_direction, this.last_cell_key, vertical_cells_nr);
      var last_vertical_cells_nr = vertical_cells_nr;
    }
  }

  setCells(route, row_identificator, route_direction, last_cell_key,  vertical_cells_nr = 1) {
    var count = 1;
    var last_cell_col = null;
    if(route_direction) {
      for(var i = last_cell_key; i <= this.settings.map.dimensions.cols_nr; i++) {
        last_cell_col = i;
        count++;
        if(!route[row_identificator]) {
          route[row_identificator] = {};
        }
        route[row_identificator][i] = 1;
        if(count > vertical_cells_nr)
          break;
      }
    }
    else {
      for(var i = last_cell_key; i >= 1; i--) {
        last_cell_col = i;
        count++;
        if(!route[row_identificator]) {
          route[row_identificator] = {};
        }

        route[row_identificator][i] = 1;

        if(count > vertical_cells_nr) {
          break;
        }
      }
    }

    return last_cell_col;
  }

  printRoute() {

    for(var row in this.route) {
      for(var col in this.route[row]) {
        this.selElementStyle(row, col, 'red', 0);
      }
    }
  }

  selElementStyle(row, col, color, opacity, empty_html = false) {
    var cell_row_selector = "#" + this.settings.map.ids.row + row;
    var cell_col_selector = "#" + this.settings.map.ids.col + col;
    var cell = $(cell_row_selector).find(cell_col_selector);
    cell.css('background-color', color);

    if(opacity) {
      cell.css('opacity', 0);
    }
    else{
      cell.css('opacity', 1);
    }

    if(empty_html) {
      cell.html('');
    }
  }

  getRandomArbitrary (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createStartForm(container) {
    var self = this;
    var start = this.crateHtmlElement("div", {'class' : this.settings.map.classes.start});
    var label = $("<span>Your Name</span>");
    var input = $("<input>");
    input.attr('id',this.settings.map.ids.name);
    var button = $("<button class='start-button'>START</button> ");
    $(button).click(function(){
      self.game.checkLastScore();
      self.game.changeHeader();
      self.game.startGame();
    });
    start.append(label);
    start.append(input);
    start.append(button);
    var over = this.crateHtmlElement("div", {'class' : this.settings.map.classes.over});
    $(container).append(start);
  }

  createOverForm(container) {
    var self = this;
    var over = this.crateHtmlElement("div", {'class' : this.settings.map.classes.over});
    var toplist = this.crateHtmlElement("div", {'class' : this.settings.map.classes.topScoreList});
    over.append(toplist);
    var button = $("<button class='restart-button'>Restart</button> ");
    $(button).click(function(){
       self.game.startGame();
    });
    over.append(button);
    $(container).append(over);
  }

  createHeaderTab(container) {
    var header = this.crateHtmlElement("div", {'class' : this.settings.map.classes.header});
    var score = this.crateHtmlElement("span", {'class' : this.settings.map.classes.header_score});
    var name = this.crateHtmlElement("span", {'class' : this.settings.map.classes.header_name});

    header.append(name);
    header.append(score);
    container.append(header);
  }

  hideForm(class_name) {
    $("." + class_name).hide();
  }

  showForm(class_name) {

    $("." + class_name).show();
  }
};

class Player {
  constructor(map, game) {
    this.settings = new Settings();
    this.settings = this.settings.settings;
    this.bottomPaddingRows = 3;
    this.position = [];
    this.map = map;
    this.game = game;
    this.direction = 0; //1 up 2 left 3 right
    this.init();
  };

  init() {
    this.attacheMovePlayer();
  };

  setPlayerInitPosition() {
    var keys = Object.keys(this.map.route);
    this.position[0] = keys.length - this.bottomPaddingRows;
    this.position[1] = Object.keys(this.map.route[keys[keys.length - this.bottomPaddingRows]])[0];
  };

  printPlayer() {
    if(!this.checkRighPosition()) {
      return false;
    }
    var cell_row_selector = "#" + this.settings.map.ids.row + this.position[0];
    var cell_col_selector = "#" + this.settings.map.ids.col + this.position[1];
    var cell = $(cell_row_selector).find(cell_col_selector);
    $(cell).css('background-color', 'blue');
    var element = $("<div>");
    element.addClass(this.settings.player.selector.class);
    $(element).css('background-image', 'url(' + this.settings.player.source + ')', 'important');
    cell.append(element);

    return true;
  };

  checkRighPosition() {
    var route = this.map.getRoute();
    if(route && route[this.position[0]] && !route[this.position[0]][this.position[1]]) {
      return false;
    }
    return true;
  }

  attacheMovePlayer() {
    var self = this;
    $(window).keypress(function(event) {
      var go = 0;
      if(!self.game.gameStatus) {
        return;
      }
      if(self.direction == 0)
        go = 1;
      switch(event.which) {
        case 97:
          self.direction = 2;
          break;
        case 100:
          self.direction = 3;
          break;
        case 119:
          self.direction = 1;
          break;
      }
      if(go == 1){
        self.game.runPlayer(self.direction);
      }
    });
  };

  moveLeft() {
    if(this.position[1] > 0){
      this.position[1]--;
      return 1;
    }
    return 0;
  };

  moveRight() {
    if(this.position[1] < 100){
      this.position[1]++;
      return 1;
    }

    return 0;
  };

  moveUp() {
    this.map.mapMoveUp();
    return 1;
  };
};

class Game {
  constructor() {
    this.gameStatus = 0;
    this.timeoutTime = 800;
    this.gameLevel = 1;
    this.playerName = 'anonim';
    this.moveiesToLvUp = 5;
    this.levelUpDifficulty = 30;
    this.moovies = 0;
    this.scores = {};
    this.init();
  };

  init() {
    this.initScore();
    this.map = new Map(this);
    this.player = new Player(this.map, this);
  };

  initScore() {
    this.score = new Score(this);
    this.scores = this.score.getAllScores();
  }

  startGame() {
    this.gameStatus = 1;
    this.map.createRoute();
    this.map.printRoute(this.route);
    this.player.setPlayerInitPosition();
    this.player.printPlayer();
    this.map.hideForm(this.map.settings.map.classes.start);
    this.map.hideForm(this.map.settings.map.classes.over);
  };

  checkLevel() {
    if(this.moovies >= this.moveiesToLvUp) {
      this.moovies = 0;
      this.gameLevel++;
      this.changeHeader();
    }
  };

  changeHeader() {
    var score = $("." + this.map.settings.map.classes.header_score);
    score.text(this.map.settings.texts.header_score + this.gameLevel);
    var name = $("." + this.map.settings.map.classes.header_name);
    name.text(this.map.settings.texts.header_name + this.playerName);
  }

  runPlayer(direction) {
    var move;
    var self = this;
    this.moovies++;
    this.checkLevel();
    switch(direction) {
      case 2:
        move = this.player.moveLeft();
        break;
      case 3:
        move = this.player.moveRight();
        break;
      case 1:
        move = this.player.moveUp();
        break;
    }
    if(move) {
      this.map.mapMoveOrizontal();
      var game = this.player.printPlayer();
      if(!game) {
        this.gameOver();
      }
    }
    setTimeout(function(){
      if(self.player.direction && self.gameStatus)
        self.runPlayer(self.player.direction);
    }, self.timeoutTime - this.levelUpDifficulty*this.gameLevel);
  }

  gameOver() {
    this.setScores();
    this.gameStatus = 0;
    this.moovies = 0;
    this.map.clearMap();
    this.map.emptyRoute();
    this.player.direction = 0;
    this.createTopList();
    this.map.showForm(this.map.settings.map.classes.over);
  };

  createTopList() {
  	var cont = $("." + this.map.settings.map.classes.topScoreList);
  	cont.html('');
  	var head = $("<center><p>Top Scores</p></center>");
  	cont.append(head);
  	var list = $("<ol>");
  	var nr = 0;
  	for(var el in this.scores) {
  		nr++;
  		if(nr > 5)
  			break;
  		var li = $("<li>"+ el + " ..... " + this.scores[el] + "</li>");
  		list.append(li);
  	}
  	cont.append(list);
  }

  setScores() {
    this.scores[this.playerName] = this.gameLevel;
    var name = this.playerName;
    var data = {};
    data[name] = this.gameLevel;
    this.score.setNewScores(data);
    this.sort();
  }

  sort() {
  	var gata = 0;
  	var bestArray = {};
  	var best_val = 0;
  	var best_key;
  	for(var el1 in this.scores) {
  		for(var el2 in this.scores) {
	  		if(this.scores[el2] > best_val && !bestArray[el2]) {
	  			best_val = this.scores[el2];
	  			best_key = el2;
	  		}
	  	}

	  	bestArray[best_key] = best_val;

	  	best_val = 0;
  	}
  	this.scores = bestArray;

  }

  checkLastScore() {
    var name = $('#' + this.map.settings.map.ids.name).val();

    if(name.length > 0) {
      this.playerName = name;
    }

    if(this.scores.hasOwnProperty(this.playerName)) {
      this.gameLevel = this.scores[this.playerName];
    }
    else{
      this.scores[this.playerName] = this.gameLevel;
    }

  }
};

class Score {
  constructor(game) {
    this.game = game;
  }

  timestamp() {
  	return new Date().getTime();
  };

  encodeTimestamp(time) {
  	var settigns = {
      '0' : 'F',
      '1' : 'p',
      '2' : 'G',
      '3' : 'j1g',
      '4' : '9mc',
      '5' : 'h',
      '6' : 'K',
      '7' : 'A',
      '8' : 'x',
      '9' : 'IDSQ',
    }

  	var token = '';
  	for(var i = 0; i < time.length - 3; i++) {
			token += settigns[time[i]];
  	}
  	return token;
  }

  setNewScores(scores) {
  	var token = this.encodeTimestamp(this.timestamp().toString());
    $.ajax({
      type: 'POST',
      url: "src/ajax/setScores.php",
      data: {rez: JSON.stringify(scores), token: token},
    }).done(function(result) {

    });
  }

  getAllScores() {
    var self = this;
    $.ajax({
      url: "src/ajax/getScores.php",
    }).done(function(result) {
    	if(result.length > 0)
      	self.game.scores = JSON.parse(result);
    });
  }
}

$(document).ready(function() {
    new Game();
});
