/*globals, exports, require*/

exports.CodeWindow = function() {
  var mode = 0;
  var convertCode = function(e) {
    mode = e.index;
    if (mode) {
      Ti.App.fireEvent("js2coffee", {code: codeArea.value });
    } else {
      Ti.App.fireEvent("coffee2js", {code: codeArea.value });
    }
  };

  var win = Ti.UI.createWindow({
    backgroundColor : '#2b4771',
    title: 'Enter Titanium Code',
    barColor: 'black',
    exitOnClose : true,
    activity: {
      onCreateOptionsMenu : function(e) {
        var menu = e.menu;
        var m1 = menu.add({
          title: "Convert Code"
        });
        m1.addEventListener('click', function() {
          convertCode({index: mode ? 0 : 1});
        });
        var m2 = menu.add({
          title: "Clear"
        });
        m2.addEventListener('click', function() {
          codeArea.value = "";
        });
      }
    }
  });

  var webview = Ti.UI.createWebView({
    height: 1,
    width: 1,
    url: "/webview/index.html"
  });
  win.add(webview);

  var default_text = "(function(){\n  var win=Ti.UI.createWindow({\n    backgroundColor: 'red',\n    navBarHidden: true\n  });\n\n  return win;\n}());";

  var codeArea = Ti.UI.createTextArea({
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderColor: 'black',
    borderRadius: 5,
    font: { 
      fontSize: 14,
      fontFamily: "Courier New"
    },
    value: default_text,
    suppressReturn: false,
    autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
  });
  if (Ti.Platform.osname !== "android") {
    codeArea.addEventListener("focus", function() {
      setTimeout(function(){
        codeArea.bottom= win.size.height /2 + (Ti.Platform.osname === "iphone" ? 10 : -10);
      }, 300);
    });
    codeArea.addEventListener("blur", function() {
      codeArea.bottom = 10;
    });
  }
  codeArea.addEventListener("swipe", function () {
    Titanium.UI.createEmailDialog({
      subject: "TiHighlight Code",
      messageBody: codeArea.value
    }).open();
  });
  win.addEventListener("click", function() {
    codeArea.blur();
  });
  win.add(codeArea);

  if (Ti.Platform.osname !=="android") {
    var tb = Ti.UI.createTabbedBar({
      labels: ["Javascript", "Coffeescript"],
      style: Ti.UI.iPhone.SystemButtonStyle.BAR,
      index: 0,
      backgroundColor: '#ccc',
      bottom: 20,
      height: 25,
      width: 180
    });
    tb.addEventListener("click", convertCode);

    win.add(tb);
  }


  //Execute the code
  var execute = function() {
    Ti.App.fireEvent(mode === 0 ? "message" : "compile" , { code: codeArea.value});
  };
  if (Ti.Platform.osname === "android") {
    win.addEventListener("execute", execute );
  } else {
    var button = Ti.UI.createButton({
      title: "Execute"
    });
    button.addEventListener("click",execute);
    win.rightNavButton = button;
  }

  var clear = Ti.UI.createButton({
    title: "Clear"
  });
  clear.addEventListener('click', function(){
    codeArea.value = "";
  });

  win.leftNavButton = clear;

  Ti.App.addEventListener("updateCode", function(data) {
    codeArea.value = data.code;
  });

  return win;
};
