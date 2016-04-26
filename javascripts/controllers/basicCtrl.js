angular.module('kaka.cblog').controller('BasicCtrl', ['$scope', 
  function($scope){
    $scope.type = 'common';
    $scope.pressKey = function(event){
      var code = event.keyCode;
      switch(code){
        case 13: excute(); break;
      }
    };
  }
]);
