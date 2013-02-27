// Possible todo:
// scope chains
// macro
//implement map
poor_module("drews_lang", function () {
  var to_string = Object.prototype.toString
  var is_array = function (a) { return to_string.call(a) == '[object Array]' }
  var is_function = function (obj) { return typeof obj === 'function'; }
  var is_string = function (a) { return to_string.call(a) == '[object String]' }
  var drews_expression = poor_module("drews_express")

  var macro_expand = function (code) { return code }

  var return_cmd = ["return"];
  var line = [];
  var code;
  var code_stack = [];
  var i = 0;
  var i_stack = [];
  var scope = {};
  var scope_stack = {}; //or use scope.parent_scope?
  var global_scope = {}
  var ret_val;
  var arg_val = {};
  var raw_get = function (name) {
    //consider strings not being quoted and variables being quoted, or wrapped
    // consider scope chains?
    if (name[0] == "'") {
      return name.substr(1);
    } else {
      return scope[name];
    }
    // parent scope etc?
  }
  var get_args = function (args, start) {
    ret = [];
    for (var args_i = start; args_i < args.length; args_i++) {
      var name = args[args_i]
      var val = raw_get(name)
      ret.push(val);
    } 
    return ret;
  } 
  var commands = {
    add: function (args) {
      return args[1] + args[2];
    }, say: function (args) {
      var vals = get_args(args, 1)
      console.log.apply(console, vals);
      return vals[0]
    }, ity: function (args) {
      var vals = raw_get(args[0])
      return vals[0]
    }, "set_lit": function (args) {
      var name = args[1]
      scope[name] = args[2]
    }, "set": function (args) {
      var name = args[1] 
      if (args.length == 3) {
        ret_val = raw_get(args[2])
      }
      scope[name] = ret_val
      return ret_val;
    }, "set_global": function (args) {
      var name = args[0]
      var ret_val = raw_get(args[2]) 
      global_scope[name] = ret_val;
      return ret_val
    }, "get_global": function (args) {
      var name = args[1];
      return global_scope[name];
    }, "get": function (args) {
      var name = args[1]  
      return raw_get(name)
    }, "arg": function (args) {
      var arg_val =  raw_get(args[1])
    }, "return": function () {
      code = code_stack.pop();
      if (!code) {
        i = 0;
        code = [];
      }
      i = i_stack.pop();
      if (i === undefined) {
        i = code.length; //break!
      }
      return ret_val
    }, "goto": function () {
      var new_code = raw_get(args[2]);
      var new_scope = raw_get(args[3])
      i = args[1]
      if (new_code) { code = new_code }
      if (new_scope) { scope = new_scope }
      return ret_val;
    }, "call": function () {
      var new_i = args[1]
      var new_code = raw_get(args[2]);
      var new_scope = raw_get(args[3])
      i_stack.push(i);
      i = new_i;
      code_stack.push(code);
      if (new_code) { code = new_code }
      if (new_scope) { scope = new_scope }
      return ret_val

    }, "set_scope": function (args) {
      var new_scope = raw_get(args[1])
    }, "push_scope": function () {
      scope_stack.push(scope)
      scope = {};
      return ret_val
    }, "pop_scope": function () {
      scope = scope_stack.pop()
      return ret_val;
    }
  }
  
  var eval_line = function () {
    var my_func = line[0];
    var my_real_func = commands[my_func];
    ret_val =  my_real_func(line);
    i += 1 //consider using linked lists too??
  }

  var evaluate = function (raw_code, scope) {
    scope = scope || {}
    if (is_array(raw_code)) {
      code = raw_code
    } else {
      code = drews_expression(raw_code)
    }
    code = macro_expand(code) 
    i = 0;
    code.push(return_cmd);
    while (true) {
      if (i >= code.length) {break}
      line = code[i]
      eval_line();
    }
    return ret_val
  } 
  return evaluate;
})
