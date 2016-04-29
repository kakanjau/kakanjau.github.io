(function(){
  var app = angular.module("kaka.console");

  app.service("CliService", ['$q', function($q){
    var map = {};
    var commandHistory = [];
    var commandHistoryCursor = 0;
    var service = {};
    
    service.registerCommand = function(commandName, command) {
      if(typeof commandName !== 'string' || typeof command !== 'function') {
        return;
      }
      map[commandName] = command;
    };
    
    service.runCommand = function(command) {
      var commandHistoryIndex = commandHistory.indexOf(command);
      if(commandHistoryIndex >= 0) {
        commandHistory.splice(commandHistoryIndex, 1);
      }
      commandHistory.unshift(command);
      commandHistoryCursor = 0;
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
    
    service.getPrevCommand = function() {
      var cursor = commandHistoryCursor;
      commandHistoryCursor = Math.min(commandHistory.length-1, commandHistoryCursor+1);
      return commandHistory[cursor];
    };
    
    service.getNextCommand = function() {
      if(commandHistoryCursor == 0) {
        return undefined;
      }else {
        commandHistoryCursor = Math.max(0, commandHistoryCursor-1);
        return commandHistory[commandHistoryCursor];
      }
    };
    
    service.getHistory = function() {
      
    };
    
    service.registerCommand('help', function(){
      var list = [];
      angular.forEach(map, function(command, key) {
        list.push(key);
      });
      return '目前支持命令：' + list.join('、');
    });
    
    service.registerCommand('history', function(){
      return commandHistory.slice(1, 101).join('<br>');
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