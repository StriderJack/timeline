(function() {
  'use strict';

  angular
    .module('app.timeline')
    .directive('tlVisualisation', tlVisualisation);

  tlVisualisation.$inject = [];

  /* @ngInject */
  function tlVisualisation() {

    var margin = 20,
      width = 960,
      height = 500 - .5 - margin,
      color = d3.interpolateRgb("#f77", "#77f");

    var directive = {
      link: link,
      restrict: 'E',
      scope: {
        data: '='
      }
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();
