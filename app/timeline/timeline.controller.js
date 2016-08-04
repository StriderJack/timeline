(function() {
    'use strict';

    angular
        .module('app.timeline')
        .controller('TimelineController', TimelineController);

    TimelineController.$inject = ['$http'];

    /* @ngInject */
  function TimelineController($http) {
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
      }
    ];

    vm.getData = getData;
    vm.getBegining = getBegining;
    vm.getEnd = getEnd;

    vm.data = {};

    activate();

    ////////////////

    function activate() {
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
