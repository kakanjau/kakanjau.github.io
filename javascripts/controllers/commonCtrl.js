angular.module('kaka.cblog').controller('CommonCtrl', ['$scope', '$timeout', 'CliService', 'BlogCmd', 
  function($scope, $timeout,CliService){
    $scope.screenStreams = [];
    $scope.height = document.documentElement.clientHeight - 10;
    $scope.$on('push-result', function(evt, data) {
      $scope.screenStreams.push(data);
      $timeout(function(){
        document.querySelector('.container input').scrollIntoView();
      }, 0);
    });
    
    CliService.registerCommand('clear', function() {
      $scope.screenStreams = [];
      return '';
    });
  }
]);
