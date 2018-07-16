class Settings {
  constructor() {
    return {
      'game_settings' : {
        'cells_values' : {
          'empty' : 'empty',
          'ball' : 'ball',
          'player' : 'player',
          'wall' : 'wall'
        }
      },
      'selectors' : {
        'map' : {
          'container' : '.container'
        }
      },
      'info' : {
        'row_count' : 45,
        'coll_count' : 60,
        'wall_rows' : 10
      },
      'texts' : {
        'add_element_button' : 'Add Element'
      },
      'game_container' : {
        'tag' : 'div',
        'class' : 'game-container'
      },
      'map' : {
        'tag' : 'div',
        'class' : 'map-container',
        'child' : [
          {
            'class' : 'map-row',
            'child' : [
              {
                'class' : 'map-coll',
                'count' : 1,
                'attr' : {
                  'data' : 0
                }
              }
            ],
            'count' : 1,
            'attr' : {
              'data' : 0
            }
          }
        ]
      },
      'player' : {
        'tag' : 'div',
        'class' : 'play-ball-player',
        'event' : 'onKeypressEvent'
      },
      'ball' : {
        'tag' : 'div',
        'class' : 'play-ball-ball',
      },
      'wall' : {
        'class' : 'wall-element',
        'data_attribute' : 'wall-data-value'
      },
      'header' : {
        'tag' : 'div',
        'class' : 'game-header',
        'child' : [
          {
            'class' : 'level',
            'child' : [
              {
                'tag' : 'span',
                'text' : 'Level: '
              },
              {
                'tag' : 'span',
                'class' : 'print-level'
              }
            ]
          }
        ]
      },
      'game_start' : {
        'tag' : 'div',
        'class' : 'game-start',
        'child' : [
          {
            'tag' : 'button',
            'class' : 'start button',
            'text' : 'START',
            'event' : 'onclickStart'
          }
        ]
      }
    };
  };
}
