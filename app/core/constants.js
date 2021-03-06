/* global d3:false */
(function() {
  'use strict';

  angular
      .module('app.core')
      .constant('d3', d3)
      .constant('events', {
        COMPUTED: 'COMPUTED',
        ENTITY_READY: 'ENTITY_READY'
      })
      .constant('entities', [
        {
          name: 'Bob Dylan',
          birth: new Date('1941', '04', '24'),
          death: new Date(Date.now())
        },
        {
          name: 'Joan Baez',
          birth: new Date('1941', '00', '09'),
          death: new Date(Date.now())
        },
        {
          name: 'Sting',
          birth: new Date('1951', '09', '02'),
          death: new Date(Date.now())
        },
        {
          name: 'Mark Knopfler',
          birth: new Date('1949', '07', '12'),
          death: new Date(Date.now())
        },
        {
          name: 'Janis Joplin',
          birth: new Date('1943', '00', '19'),
          death: new Date('1970', '09', '04')
        },
        {
          name: 'Beethoven',
          birth: new Date('1770', '11', '17'),
          death: new Date('1827', '02', '26')
        }
      ]);
})();
