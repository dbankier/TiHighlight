/*globals, exports, require*/

exports.PreviewWindow = function(tabGroup) {
  var win = Ti.UI.createWindow({
    backgroundColor : 'white',
    exitOnClose : true,
    navBarHidden: true
  });

  win.add(Ti.UI.createLabel({
    text: "Preview Window",
    textAlign: 'center',
    color: '#999',
    font: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  }));


  var current;

  Ti.App.addEventListener("message", function(message) {
    tabGroup.setActiveTab(1);
    try {
      if(current && current.close !== undefined) {
        current.close();
      }
      current = eval(message.code);
      if(current && current.open !== undefined) {
        //current.open();
        tabGroup.activeTab.open(current);
      }
    } catch (e) {
      if(Ti.Platform.osname === 'android') {
        alert(e.toString());
      } else { //iOS Error
        alert("Line: " + e.line + "\n" + e.message);
      }
    }
  });

  return win;
};
