class Settings {
  constructor() {
    return {
      'selectors' : {
        'map' : {
          'container' : '.container'
        }
      },
      'info' : {
        'row_count' : 10,
        'coll_count' : 10,
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
                },
                'event' : 'onclickEvent'
              }
            ],
            'count' : 1,
            'attr' : {
              'data' : 0
            }
          }
        ]
      },
      'flea' : {
        'tag' : 'div',
        'class' : 'flea-container'
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
    };
  };
}
