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
          // 获取下一个已经执行过的命令
          else if(code == 40) {
            $scope.command = CliService.getNextCommand();
          }
          // 获取上一个已经执行过的命令
          else if(code == 38) {
            var historyCom = CliService.getPrevCommand();
            $scope.command = historyCom !== undefined ? historyCom : $scope.command;
          }
        }
      },
      template: '<p><div class="console" ><input type="text" autofocus="autofocus" ng-model="command" ng-keydown="keypress($event)"></div><span style="color:#b5e853;float:left;">kakanjau.GitHub.io$&nbsp;</span></p>'
    }
  }]);

})();
