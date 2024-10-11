class Settings {
  constructor() {
    return {
      'selectors' : {
        'map' : {
          'container' : '.container'
        }
      },
      'info' : {
        'row_count' : 3,
        'coll_count' : 3,
        'start' : 1
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
      'elements' : {
        'values' : {
          'x' : {
            'tag' : 'span',
            'class' : 'element-text',
            'text' : 'X',
            'data_value' : 1
          },
          '0' : {
            'tag' : 'span',
            'class' : 'element-text',
            'text' : '0',
            'data_value' : -1
          },
          'line' : {
            'tag' : 'line',
            'end' : false,
            'attr' : {
              'x1' : '0',
              'y1' : '80',
              'y2' : '20',
              'x2' : '100',
              'stroke' : 'black'
            }
          }
        }
      }
    };
  };
}
