(function() {
  'use strict';

  angular
      .module('app.entity')
      .controller('EntityController', EntityController);

  EntityController.$inject = ['$scope', '$q', 'events'];

  /* @ngInject */
  function EntityController($scope, $q, events) {
    var vmEntity = this;
    vmEntity.title = 'EntityController';

    vmEntity.name = $scope.entity.name;
    vmEntity.birth = $scope.entity.birth;
    vmEntity.death = $scope.entity.death;

    activate();

    ////////

    function setPercentages(begin, total) {
      setLifetimePc(total);
      setBeginingPc(begin, total);
    }

    function setLifetimePc(total) {
      vmEntity.lifetimePc = Math.round(Math.abs(100 * (vmEntity.death - vmEntity.birth) / total));
      return vmEntity.lifetimePc;
    }

    function setBeginingPc(begin, total) {
      vmEntity.beginingPc = Math.round(Math.abs(100 * (vmEntity.birth - begin) / total));
      return vmEntity.beginingPc;
    }

    function activate() {
      $scope.$on(events.COMPUTED, function (event, attrs) {
        console.log(vmEntity.name + ' catch ' + events.COMPUTED);
        setPercentages(attrs.begin, attrs.totalMs);
      });
      $scope.$emit(events.ENTITY_READY);
    }
  }
})();
