/*

id fn x x

id 
 */

poor_module("drews_lang", function () {
  var to_string = Object.prototype.toString
  var is_array = function (a) { return to_string.call(a) == '[object Array]' }
  var is_function = function (obj) { return typeof obj === 'function'; }
  var is_string = function (a) { return to_string.call(a) == '[object String]' }
  var drews_expression = poor_module("drews_express")

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
      code = to_linked_list(code, 0, )
    }
  return evaluate;
})
