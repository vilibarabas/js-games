class Events{
  onKeypressEvent(element, player) {
    $(window).keydown(function(event) {

      switch(event.which) {
        case 65:
        case 37:
          player.movePlayer(1);
          break;
        case 68:
        case 39:
          player.movePlayer(0);
          break;
      }
    });
  };

  onclickStart(element, game) {
    $(element).click(function() {
      game.startGame();
    });
  }
}
