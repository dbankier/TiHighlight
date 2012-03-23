/*globals, exports, require*/
require("/api/Includes");

var CodeWindow = require("/ui/CodeWindow").CodeWindow;
var PreviewWindow = require("/ui/PreviewWindow").PreviewWindow;

exports.StartScreen = function() {
  var tabGroup = Ti.UI.createTabGroup();

  var code_win = new CodeWindow(tabGroup);
  var code_tab = Ti.UI.createTab({
    icon : '/images/187-pencil.png',
    title : "Code Editor",
    window : code_win	});
    tabGroup.addTab(code_tab);

    var preview_win = new PreviewWindow(tabGroup);
    if (Ti.Platform.osname === "android") {
      //preview_win.addEventListener('focus', function() {
      tabGroup.addEventListener('focus', function(e) {
        if (e.index) {
          code_win.fireEvent('execute');}
      });
    }
    var preview_tab = Ti.UI.createTab({
      icon : '/images/176-ipad.png',
      title : "Preview",
      window : preview_win
    });
    tabGroup.addTab(preview_tab);

    return tabGroup;


};
