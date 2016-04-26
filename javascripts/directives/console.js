(function(){
  var app = angular.module("kaka.console");

  app.directive("console", [function(){
    return {
      restrict: 'EA',
      link: function(){

      },
      controller: function($scope){

      },
      template: '<div><span style="color:#b5e853">></span><input type="text" class="console" autofocus="autofocus" ng-model="console" ng-keydown="pressKey($event)"></div>'
    }
  }]);

})();
