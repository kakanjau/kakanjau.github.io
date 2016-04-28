(function() {
  var app = angular.module("kaka.console");
  
  app.service('BlogCmd', ['$http', 'CliService', function($http, CliService){
    var service;
    CliService.registerCommand('blog', blog);
    
    function blog(args, options) {
      if(args.list){
        return list();
      }else{
        return help();
      }
    }
    
    function help() {
      var ret = "<span>输入命令：`blog -list` 获取博客文章列表</span><br>";
      ret += "<span>输入命令：`blog -show <文章名>` 获取博客文章内容</span><br>";
      ret += "也可以直接访问博客：<a href='./blog'>kaka-njau blog</a>";
      return ret;
    }
    
    function list() {
      return $http.get('/blog/articles/index.json');
    }
    
    function show() {
      
    }
    return service;
  }]);
})();