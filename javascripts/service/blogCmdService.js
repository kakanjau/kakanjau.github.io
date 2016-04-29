(function() {
  var app = angular.module("kaka.console");
  
  app.service('BlogCmd', ['$http', 'CliService', function($http, CliService){
    var service;
    var articleList;
    CliService.registerCommand('blog', blog);
    
    function blog(args, options) {
      if(args.list){
        return list();
      }else if(args.show){
        return show(args.show)
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
        articleList = treeToList(result.data);
        var ret = [];
        angular.forEach(articleList, function(article){
          if(!article.isBranch){
            ret.push('<a href="/blog/#/article/' + article.name + '" target="_blank">' + article.name + '</a>');
          }
        });
        return ret.join('<br>');
      });
    }
    
    function show(name) {
      var article;
      if(articleList){
        angular.forEach(articleList, function(art){
          if(art.name === name) {
            article = art;
          }
        });      
        if(article.content) {
          return marked(article.content);
        }else{
          return $http.get(getArticlePath(article)).success(function(data){
            article.content = data;
            return marked(article.content);
          })
        }
      }else {
        return $http.get('/blog/articles/index.json').then(function(result){
          articleList = treeToList(result.data);
          angular.forEach(articleList, function(art){
            if(art.name === name) {
              article = art;
            }
          });      
          if(article.content) {
            return marked(article.content);
          }else{
            return $http.get(getArticlePath(article)).success(function(data){
              article.content = data;
              return marked(article.content);
            })
          }
        });
      }
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
    
    function getArticlePath(article){
      var path = [article.name];
      var ext = article.fileExt;
      while(article.parent) {
        path.unshift(article.parent.name);
        article = article.parent;
      }
      path.unshift('/blog/articles');
      return path.join('/') + '.' + ext;
    }
    
    return service;
  }]);
})();