angular.module('kaka.cblog').controller('BasicCtrl', ['$scope', 
  function($scope){
    var start = new Date('2016/5/21 00:00:00');
    var now = Date.now();
    $scope.distance = Math.ceil((now - start)/3600000/24);
  }
]);
