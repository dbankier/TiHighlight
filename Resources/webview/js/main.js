$(document).ready(function() {
  Ti.App.addEventListener("compile", function(data) {
    Ti.App.fireEvent("message", {code: CoffeeScript.compile(data.code,{bare:'on'})});
  });
  Ti.App.addEventListener("js2coffee", function(data) {
    try {
      Ti.App.fireEvent("updateCode", {code: Js2coffee.build(data.code)});
    } catch(e) {
      Ti.API.error(e);
    }
  });
  Ti.App.addEventListener("coffee2js", function(data) {
    try {
      Ti.App.fireEvent("updateCode", {code: CoffeeScript.compile(data.code,{bare:'on'}).replace(/.*void 0;\n/,"")});
    } catch(e) {
      Ti.API.error(e);
    }
  });


});



