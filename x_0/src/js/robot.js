class Robot {
  constructor(game) {
    this.game = game;
    this.comb = null;
    this.playerIndex = null;
    this.movecount = 0;
    this.setPlayer(this.game.settings.info.start);
  }

  setPlayer(playerIndex) {
    this.playerIndex = playerIndex;
  }

  move(moveCount) {
    this.getCombination(moveCount);
  }

  getCombination(moveCount) {
    var self = this;
    $.ajax({
      type: 'POST',
      url: "src/ajax/getCombination.php",
      data: {comb_key: this.game.comb_key,player_index: this.playerIndex},
    }).done(function(result) {

        console.log(result);
      if(result.length > 0) {
        if(self.playerIndex == -1 || self.comb == null)
          self.comb = JSON.parse(result);
        self.clickByPrestabiliteCombinationsEvent(self.comb);
      }
    });
  }

  clickByPrestabiliteCombinationsEvent(comb) {

    if(!comb[this.playerIndex][this.movecount]) {
      return false;
    }
    var indexs = comb[this.playerIndex][this.movecount].split(this.game.coordonate_separate);
    this.movecount++;
    var cell = this.getnextMoveCell(indexs);
    if(cell) {
      console.log(indexs);
      cell.click();
      return true;
    }

    return false;
  }

  getnextMoveCell(indexs) {
    var cell = $("." + this.game.settings.map.child[0].class + "[data='" + indexs[0] + "']").find("." + this.game.settings.map.child[0].child[0].class + "[data='" + indexs[1] + "']");
    return cell;
  }
}
