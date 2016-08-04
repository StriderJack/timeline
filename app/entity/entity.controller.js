(function() {
  'use strict';

  angular
      .module('app.entity')
      .controller('EntityController', EntityController);

  EntityController.$inject = ['$scope', '$q', 'events'];

  /* @ngInject */
  function EntityController($scope, $q, events) {
    var vm = this;
    vm.title = 'EntityController';

    vm.name = $scope.entity.name;
    vm.birth = $scope.entity.birth;
    vm.death = $scope.entity.death;

    activate();

    ////////

    function setPercentages(begin, total) {
      setLifetimePc(total);
      setBeginingPc(begin, total);
    }

    function setLifetimePc(total) {
      vm.lifetimePc = Math.abs(100 * (vm.death - vm.birth) / total);
      return vm.lifetimePc;
    }

    function setBeginingPc(begin, total) {
      vm.beginingPc = Math.abs(100 * (vm.birth - begin) / total);
      return vm.beginingPc;
    }

    function activate() {
      return $q.all([setListeners()]).then(function() {
        console.log('Activated Entity View');
      });
    }

    function setListeners() {
      return $q.when(true)
        .then(function() {
          $scope.$on(events.COMPUTED, function (event, attrs) {
            setPercentages(attrs.begin, attrs.total);
          });
        }
      );
    }
  }
})();
