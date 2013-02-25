
poorModule("script-string", function () {

load = function(url, callback) {
  var xhr;
  xhr = new (window.ActiveXObject || XMLHttpRequest)('Microsoft.XMLHTTP');
  xhr.open('GET', url, true);
  if ('overrideMimeType' in xhr) xhr.overrideMimeType('text/plain');
  xhr.onreadystatechange = function() {
    var _ref;
    if (xhr.readyState === 4) {
      if ((_ref = xhr.status) === 0 || _ref === 200) {
        callback(null, xhr.responseText, {fileName: url});
      } else {
        callback("Could not load " + url);
      }
    }
  };
  return xhr.send(null);
};


var script_string = function(id, cb) {
  var script = document.getElementById(id)
  if (script.src) {
    load(script.src, cb);
  } else {
    setTimeout(function (){
      cb(null, script.innerHTML.slice(1,-1))
    },0)
  }
}

return script_string
});