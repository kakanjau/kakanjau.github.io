(function(){
  var app = angular.module("kaka.console");

  app.service("CliService", ['$q', function($q){
    var map = {};
    var service = {};
    
    service.registerCommand = function(commandName, command) {
      if(typeof commandName !== 'string' || typeof command !== 'function') {
        return;
      }
      map[commandName] = command;
    };
    
    service.runCommand = function(command) {
      var obj = analyCommand(command);
      var ret;
      if(!map[obj.name]){
        obj.name = 'help';
      }
      
      ret = map[obj.name](obj.args, obj.options);
      if(ret && ret.then && (typeof ret.then === 'function')){
        return ret;
      }else{
        var defer = $q.defer();
        defer.resolve(ret);
        return defer.promise;
      }
    };
    
    service.hintCommand = function(command) {
      
    };
    
    service.registerCommand('help', function(){
      return '目前支持命令：`blog`';
    });
    
    function analyCommand(commandStr) {
      var list = commandStr.split(' ');
      var ret = {
        name: undefined,
        args: {},
        options: []
      };
      var item, argName;
      ret.name = list.shift();
      while(list.length > 0) {
        item = list.shift();
        if(/^--/.test(item)){
          ret.options.push(item.substring(2));
        }else if(/^-/.test(item)){
          argName = item.substring(1);
          ret.args[argName] = true;
        }else{
          argName && (ret.args[argName] = item);
        }
      }
      return ret;
    }
    return service;
  }]);
})();