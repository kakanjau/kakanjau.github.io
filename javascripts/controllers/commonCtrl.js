angular.module('kaka.cblog').controller('CommonCtrl', ['$scope', '$timeout','BlogCmd',
  function($scope, $timeout){
    $scope.screenStreams = [];
    $scope.height = document.documentElement.clientHeight - 10;
    $scope.$on('push-result', function(evt, data) {
      $scope.screenStreams.push(data);
      $timeout(function(){
        document.querySelector('.container input').scrollIntoView();
      }, 0);
    });
  }
]);
