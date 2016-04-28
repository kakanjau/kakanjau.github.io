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
      return $http.get('/blog/articles/index.json').then(function(result){
        var articles = treeToList(result.data);
        var ret = [];
        angular.forEach(articles, function(article){
          if(!article.isBranch){
            ret.push('<a href="/blog/#/article/' + article.name + '" target="_blank">' + article.name + '</a>');
          }
        });
        return ret.join('<br>');
      });
    }
    
    function show() {
      
    }
    
    function treeToList(tree){
      var list = [];
      var call = (list, nodes, parent) => {
        for (var node of nodes) {
          var children = node.children;
          node.parent = parent;
          node.level = parent ? (parent.level + 1) : 0;
          node.chilren = null;
          list.push(node);
          if (children) {
            node.isBranch = true;
            call(list, children, node);
          }
        }
      };
      call(list, tree);
      return list;
    };
    return service;
  }]);
})();