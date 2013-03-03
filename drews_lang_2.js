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


  var commands = {
    alert: function (args) {
      alert(args[0])
    }, say: function (args) {
      console.log(args[0]) 
    }
  }

  var to_linked_list = function (list, list_i, linked_list) {
    if (list_i == list.length) {
      return linked_list
    } else {
      var item = list[list_i]

    }
  }

  var evaluate = function (raw_code, _scope) {
    scope = _scope || {}
    if (is_array(raw_code)) {
      code = raw_code
    } else {
      code = drews_expression(raw_code)
      code = to_linked_list(raw_code)
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
