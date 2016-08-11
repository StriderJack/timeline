(function() {
    'use strict';

    angular
        .module('app.timeline')
        .controller('TimelineController', TimelineController);

    TimelineController.$inject = ['$q', '$rootScope', 'events', 'entities', '$timeout'];

    /* @ngInject */
  function TimelineController($q, $rootScope, events, entities, $timeout) {
    var vm = this;
    vm.title = 'TimelineController';

    vm.entities = entities;

    vm.getData = getData;
    vm.getBegining = getBegining;
    vm.getEnd = getEnd;

    vm.tot = 0;
    vm.data = {};

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
