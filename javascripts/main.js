(function(){
  var app = angular.module("kaka.cblog", ["ui.router", "ngSanitize", "LocalStorageModule", "kaka.console"]);

  // app.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider){
  //   $stateProvider
  //     .state("Basic", {
  //       url: "",
  //       templateUrl: "",
  //       controller: ""
  //     })
  //     .state("Blog", {
  //       url: "blog",
  //       templateUrl: "",
  //       controller: ""
  //     })
  //     .state("Manage", {
  //       url: 'manage',
  //       templateUrl: "",
  //       controller: ""
  //     })
  //   ;
  // });


  app.config(['localStorageServiceProvider',function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('')
      .setStorageType('sessionStorage')
      .setNotify(true, true);
  }]);

})();
