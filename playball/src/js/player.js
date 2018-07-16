class Player {
  constructor(game) {
    this.game = game;
    this.length = 15;
    this.runPositionValue = 3;
    this.positions = {
      'width_poz' : this.game.settings.info.coll_count/2 - parseInt(this.length/2),
      'height_poz' : this.game.settings.info.row_count,
    };
    this.init();
  }

  init() {
    this.attacheEvents();
    this.clearPlayer();
    this.printPlayer();
  }

  attacheEvents() {
    var events = new Events();
    if(this.game.settings.player.event) {
      events[this.game.settings.player.event](1, this);
    }
  }

  printPlayer() {
    for(var i = this.positions.width_poz; i < this.positions.width_poz + this.length; i++ ) {
      var row = this.positions.height_poz;
      var coll = i;
      var cell = $('.' + this.game.settings.map.class).find("[data='" + row + "']").find("[data='" + coll + "']");
      this.game.map[row][coll].value = this.game.settings.game_settings.cells_values.player;
      cell.addClass(this.game.settings.player.class);
    }
  }

  clearPlayer() {
    var self = this;
    var row = this.positions.height_poz;
    var coll = this.positions.width_poz;

    this.game.map[row].map( function(el) {

     el.value =  self.game.settings.game_settings.cells_values.empty;});
    $('.' + this.game.settings.player.class).removeClass(this.game.settings.player.class);
  }

  movePlayer(direction) {
    if(direction && this.positions.width_poz > this.runPositionValue)
      this.positions.width_poz -= this.runPositionValue;
    else if (direction && this.positions.width_poz > 1)
      this.positions.width_poz--;

    else if(!direction && this.positions.width_poz + this.runPositionValue <= (this.game.settings.info.coll_count - this.length))
      this.positions.width_poz += this.runPositionValue;

    else if(!direction && this.positions.width_poz < (this.game.settings.info.coll_count - this.length) + 1)
      this.positions.width_poz++;

    this.clearPlayer();
    this.printPlayer();
  }
}
