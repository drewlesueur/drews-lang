// Possible todo:
// allow to push and pop the code too.
//implement map
poor_module("drews_lang", function () {
  var to_string = Object.prototype.toString
  var is_array = function (a) { return to_string.call(a) == '[object Array]' }
  var is_function = function (obj) { return typeof obj === 'function'; }
  var is_string = function (a) { return to_string.call(a) == '[object String]' }
  var tab_expression = poor_module("drews_express")

  var macro_expand = function (code) {
    return code 
  }

  var is_numeric = function (numb) {
    var first_letter = numb[0];
    return first_letter.search(/\d/) == 0
  }
  var return_cmd = ["return"];

  var goto_cmd = function (fn_name, args) {
    scope.args = args;
    i = fn_map[fn_name];
  }

  var call_cmd = function (name, args) {
    //doing "i" and "scope" here
    i_stack.push(i)
    var old_scope = scope
     
    scope = {parent_scope: old_scope}
    return ret_val
    i = fn_map[name]
    scope.args = args
  }

  var line = [];
  var code;
  var code_stack = [];
  var i = 0;
  var i_stack = [];
  var scope = {};
  var scope_stack = {}; //or use scope.parent_scope?
  var fn_map = {}
  var ret_val;
  var raw_get = function (name) {
    if (name[0] == "'") {
      return name.substr(1);
    } else {
      return scope[name];
    }
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
    },
    say: function (args) {
      var vals = get_args(args, 1)
      console.log.apply(console, vals);
      return vals[0]
    },
    ity: function (args) {
      var vals = get_args(args, 1)
      return vals[0]
    }, "set": function (args) {
      debugger
      var name = args[1] 
      if (args.length == 3) {
        ret_val = raw_get(args[2])
      }
      scope[name] = ret_val
      return ret_val;
    }, "get": function () {
    
    }, "return": function () {
      i = i_stack.pop()
      if (i === undefined) {
        i = code.length; //break!
      }
      return ret_val
    }

  }
  
  var eval_line = function () {
    var my_func = line[0];
    var my_real_func = commands[my_func];
    ret_val =  my_real_func(line);
    i += 1
  }

  var evaluate = function (raw_code, scope) {
    scope = scope || {}
    if (is_array(raw_code)) {
      code = raw_code
    } else {
      code = tab_expression(raw_code)
    }
    code = macro_expand(code) 
    i = 0;
    code.push(return_cmd);
    while (true) {
      if (i >= code.length) {break}
      line = code[i]
      debugger
      eval_line();
    }
    return ret_val
  } 
  return evaluate;
})
