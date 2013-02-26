// Possible todo:
// allow to push and pop the code too.
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
    commands.push_stack()
    //doing "i" and "scope" here
    i_stack.push(i)
    var old_scope = scope
     
    scope = {parent_scope: old_scope}
    return ret_val
    i = fn_map[name]
    scope.args = args
  }

  var commands = {
    add: function (args) {
      return args[1] + args[2];
    },
    say: function (arg) {console.log(arg[1]); return arg[1]},
    alert: function (arg) {alert(arg[1])},
    "goto":function (args) {
      var name = args[1];
      goto_cmd(name, args.slice(2));
    },
    "goto2":function (args) {
      var name = args[0];
      goto_cmd(name, args.slice(1));
    },
    call: function (args) {
      var name = args[1]
      call_cmd(name, args.slice(2))
    },
    call2: function (args) {
      var name = args[0]
      call_cmd(name, args.slice(1))
    },
    ity: function (args) {
      return args[1]
    }, 
    sets: function (args) {
      values = args[0];
      var args_index = 1;
      for (var args_index = 1; args_index < values.length; args_index += 1) {
        var name = args[args_index]
        var value = values[args_index]
        scope[name] = value;
      }
    },
    ret_val: function (args) {return ret_val},
    fn: function (args) {
      var len = args.length
      var name = args[1] 
      fn_map[name] = code.length - 1
      for (var fn_i = 2; fn_i < len; fn_i++) {
        code.push(args[fn_i])
      }
      code.push(return_cmd)
      i += (len - 3)
      return i
    },
    "return": function (args) {
      //pop stack  
      i = i_stack.pop()
      scope = scope.parent_scope; 
      if (!scope) {
        i = code.length; //break!
      }
      return ret_val
    },
    "set": function (args) {
      name = args[1] 
      scope[name] = ret_val
      return ret_val;
    },
    "push_stack": function () {
    },
    "get": function (args) {
      if (args.length == 2) {
        var name = args[1]
        return scope[name]
      } else {
        var name = args[2]
        var scoped_name = args[1]
        var my_scope = scop[scoped_name]
        return my_scope[name]
      }
    },
    "get_parent": function (args) {
      name = args[1]
      return scope.parent_scope[name]
    }
  }

  var line = [];
  var i = 0;
  var i_stack = [];
  var scope = {};
  var fn_map = {}
  var ret_val
  var eval_line = function () {
    var my_func = line[0];
    var my_real_func = commands[my_func];
    if (my_real_func) {
      ret_val =  my_real_func(line);
    } else if (is_numeric(my_func)) {
      i = my_func
    } else {
      if (code[i + 1] == return_cmd) {
        commands.goto2(line)
      } else {
        commands.call2(line);
      }
    }
    i += 1
  }
  var code;
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
    console.log("fn_map:")
    console.log(fn_map)
    return ret_val
  } 
  return evaluate;
})
