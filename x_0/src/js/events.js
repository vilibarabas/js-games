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

  onclickEvent(element, game) {
    $(element).on('click', function(event) {
      var dataType = game.getNextPlayer();
      var element = new CreateHtmlElementsBySettings(dataType, new Events(), this);
      $(event.target).append(element);
      $(event.target).off( "click");
      game.clickEventDataProcess($(event.target), dataType);
    });
  }
}
