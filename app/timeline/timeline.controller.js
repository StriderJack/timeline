(function() {
    'use strict';

    angular
        .module('app.timeline')
        .controller('TimelineController', TimelineController);

    TimelineController.$inject = ['$q', '$rootScope', 'events', '$timeout'];

    /* @ngInject */
  function TimelineController($q, $rootScope, events, $timeout) {
    var vm = this;
    vm.title = 'TimelineController';
    vm.entities = [
      {
        name: 'Bob Dylan',
        birth: new Date('1941', '04', '24'),
        death: null
      },
      {
        name: 'Joan Baez',
        birth: new Date('1941', '00', '09'),
        death: null
      },
      {
        name: 'Sting',
        birth: new Date('1951', '09', '02'),
        death: null
      },
      {
        name: 'Mark Knopfler',
        birth: new Date('1949', '07', '12'),
        death: null
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
    ];

    vm.getData = getData;
    vm.getBegining = getBegining;
    vm.getEnd = getEnd;

    vm.tot = 0;
    vm.data = {};

    vm.chartConfig = {
      options: {
        chart: {
          type: 'columnrange',
          inverted: true
        },

        tooltip: {
          valueSuffix: '°C'
        },

        plotOptions: {
          columnrange: {
            dataLabels: {
              enabled: true,
              formatter: function () {
                return this.y + '°C';
              }
            }
          }
        },

        legend: {
          enabled: false
        }
      },

      title: {
        text: 'Temperature variation by month'
      },

      subtitle: {
        text: 'Observed in Vik i Sogn, Norway'
      },

      xAxis: {
        categories: vm.entities.map(function(e) { return e.name; })
      },

      yAxis: {
        title: {
          text: 'Dates'
        }
      },

      series: [{
        name: 'Dates',
        data: vm.entities.map(function(e) { return [e.birth.getTime(), Date.now()]; })
      }]
    };

    activate();

    ////////////////

    function activate() {
      $rootScope.$on(events.ENTITY_READY, function (event, attrs) {
        vm.tot++;
        if(vm.tot==vm.entities.length) {
          $rootScope.$broadcast(events.COMPUTED, vm.data);
        }
      });
      $rootScope.$on(events.COMPUTED, function (event, attrs) {
        console.log(attrs);
      });
      getData();

      //return $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Argo_(2012_film)&rvparse')
    }

    function getData() {
      vm.data.begin = getBegining();
      vm.data.end = getEnd();
      vm.data.totalMs = vm.data.end - vm.data.begin;
    }

    function getBegining() {
      return vm.entities.map(function(m) {
        return m.birth;
      }).reduce(function(min, curr) {
        return Math.min(min, curr);
      }, Date.now());
    }

    function getEnd() {
      return vm.entities.map(function(m) {
        return m.death ? m.death : Date.now();
      }).reduce(function(max, curr) {
        return Math.max(max, curr);
      }, vm.entities[0].birth);
    }
  }

})();
