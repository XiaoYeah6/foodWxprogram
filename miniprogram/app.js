//app.js
var hotapp = require('./utils/hotapp.js');
App({
  onLaunch: function () {

    this.globalData = {}
  }
});

wx.cloud.init({
  env: "test-o4xhh"
});