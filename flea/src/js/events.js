class Events{
  onclickEvent(element, game) {
    element.on('click', function(event) {
      var flea = $(this).find('.' + game.settings.flea.class);
      if(flea.length) {
        game.levelUp();
      }
      else{
        game.fakeClick();
      }
    });
  }
}
