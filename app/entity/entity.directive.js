(function() {
  'use strict';

  angular
    .module('app.entity')
    .directive('tlEntity', tlEntity);

  tlEntity.$inject = [];

  /* @ngInject */
  function tlEntity() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      scope: {
        'entity': '='
      },
      templateUrl: 'app/entity/entity.html',
      restrict: 'E'
    };
    return directive;
  }
})();
