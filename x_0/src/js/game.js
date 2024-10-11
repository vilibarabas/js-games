const reducer = (accumulator, currentValue) => accumulator + currentValue;

class Game {
  constructor () {
    this.settings = new Settings();
    this.clickCount = 0;
    this.game_player = 1;
    this.coordonate_separate = '_';
    this.game_map_cels = [];
    this.comb_key = '';
    this.ready = 1;
    this.robot = new Robot(this);
    this.robotMove = 1;
    this.combinationNow = {
      '-1' : [],
      '1' : [],
      'winner' : 0,
      'score' : 1
    };


    this.getCombinations();
  };

  init () {
    var container = $(this.settings.selectors.map.container);
    this.setRowsAndColls();
    var map = new CreateHtmlElementsBySettings(this.settings.map, new Events(), this);
    container.append(map);
    if(this.settings.info.start == 1)
      this.robotMove = this.robot.move(this.clickCount);
  };

  setRowsAndColls() {
    this.settings.map.child[0].count = this.settings.info.row_count;
    this.settings.map.child[0].child[0].count = this.settings.info.coll_count;
  };

  getNextPlayer() {
    this.game_player *= -1;
    if(this.game_player == 1) {
      return this.settings.elements.values['0'];
    }
    else {
      return this.settings.elements.values['x'];
    }
  };

  clickEventDataProcess(cell, data_type) {
    this.ready = 0;
    var self = this;
    var coll = cell.attr('data');
    var row = cell.parent().attr('data');
    if(!this.game_map_cels[row]) {
      this.game_map_cels[row] = [];
    }
    this.game_map_cels[row][coll] = data_type.data_value;
    var comb = row + this.coordonate_separate + coll;
    this.comb_key += comb + '|';
    this.combinationNow[this.game_player*-1].push(comb);
    this.clickCount++;
    if (this.clickCount == 9) {
      this.changeCombinationStore();
      this.saveNewCombinations();
    }

    var cond = (this.settings.info.start == -1) ? "this.clickCount % 2 != 0" : "this.clickCount % 2 == 0";

    if(this.clickCount && eval(cond)) {
      this.setReady(1);
      this.robotMove = this.robot.move(this.clickCount);
    }


    if(this.checkWinner()) {
      this.changeCombinationStore();
      this.saveNewCombinations();
      this.gameOver();
    }
  }

  setReady(status) {
    this.ready = status;
  }

  gameOver() {
    console.log(this.combinationStore);
  }

  changeCombinationStore() {
    if(this.combinationStore[this.comb_key]) {
      console.log('update');

    }
    else {
      console.log('new');
      this.combinationStore[this.comb_key] = this.combinationNow;
    }
  }

  saveNewCombinations() {
    var token = this.encodeTimestamp(this.timestamp().toString());
    var self = this;
    $.ajax({
      type: 'POST',
      url: "src/ajax/setScores.php",
      data: {comb: JSON.stringify(self.combinationStore), token: token},
    }).done(function(result) {

    });
  }

  getCombinations() {
    var self = this;
    $.ajax({
      type: 'POST',
      url: "src/ajax/getScores.php",
    }).done(function(result) {
      self.combinationStore = JSON.parse(result);
      self.init();
    });
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

  checkWinner() {
    for(var row in this.game_map_cels) {
      var sum_oriz = this.game_map_cels[row].reduce(reducer);

      if(this.checkSum(sum_oriz)) {
        return true;
      }

      var sum_vert = 0;
      for(var coll = 1; coll <= this.settings.info.coll_count; coll++) {

        if(this.game_map_cels[coll] && this.game_map_cels[coll][row])
          sum_vert += this.game_map_cels[coll][row];
        else
          break;
      }

      if(this.checkSum(sum_vert)) {
        return true;
      }
    }
    var sume_ox = 0;
    var sume_oy = 0;
    for(var row = 1, coll = 1; row <= this.settings.info.row_count; row++, coll++) {
      if(this.game_map_cels[coll] && this.game_map_cels[coll][row])
        sume_ox += this.game_map_cels[coll][row];
      if(this.game_map_cels[coll] && this.game_map_cels[coll][(this.settings.info.row_count + 1 - row)])
        sume_oy += this.game_map_cels[coll][(this.settings.info.row_count + 1 - row)];
    }

    if(this.checkSum(sume_ox) || this.checkSum(sume_oy)) {
      return true;
    }
  }

  checkSum(sum) {
    if(sum == 3) {
      this.combinationNow['winner'] = '1';
      return true;
    }
    else if(sum == -3) {
      this.combinationNow['winner'] = '-1';
      return true;
    }

    return false;
  }
};

$(document).ready(function() {
    new Game();
});
