(function(){
  var app = angular.module("kaka.console");

  app.directive("console", ['CliService', function(CliService){
    return {
      restrict: 'EA',
      link: function(){

      },
      controller: function($scope){
        $scope.keypress = function(event){
          var code = event.keyCode;
          var command = $scope.command || '';
          if(code == 13) {
            $scope.command = '';
            $scope.$emit('push-result', 'kakanjau.GitHub.io$ '+ command);
            if(command){
              CliService.runCommand(command).then(function(result){
                $scope.$emit('push-result', result);
              });
            }
          }
        }
      },
      template: '<p><div class="console" ><input type="text" autofocus="autofocus" ng-model="command" ng-keypress="keypress($event)"></div><span style="color:#b5e853;float:left;">kakanjau.GitHub.io$&nbsp;</span></p>'
    }
  }]);

})();
