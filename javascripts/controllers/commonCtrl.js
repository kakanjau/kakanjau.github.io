angular.module('kaka.cblog').controller('CommonCtrl', ['$scope', 
  function($scope){
    $scope.pressKey = function(event){
      var code = event.keyCode;
      switch(code){
        // 处理案件：回车
        case 13: excute(); break;
        // 处理按键：上
        case 38: prev(); break;
        // 处理案件：下
        case 40: next(); break;
      }
      event.preventDefault();
      event.stopPropagation();
    };
  }
]);
