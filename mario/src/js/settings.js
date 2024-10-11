class Settings {
  constructor() {
    return {
      'selectors' : {
        'map' : {
          'container' : '.init-game-container'
        }
      },
      'map' : {
        'body' : {
          'class' : 'game-container',
        },
        'row' : {
          'class' : 'map-row',
        },
        'coll' : {
          'class' : 'map-coll',
        },
        'classes' : {
          '0' : 'heaven',
          '1' : 'floor',
          '2' : 'wall',
          '3' : 'gold',
          '4' : 'empty_gold',
          '5' : 'gold_anim'
        },
        maps_count: 2
      },
      'player' : {
        'position' : [
          14,
          3
        ],
        'class' : 'player',
        'src' : {
          'run' : 'src/images/player-run.gif',
          'stay' : 'src/images/player-stay.png',
          'jump' : 'src/images/player-jump.png',
        },
        'data' : {
          'jump' : 0.5,
          'move' : 2.2,
          'jumpMove' : 0.4
        }
      }
    };
  }
}
