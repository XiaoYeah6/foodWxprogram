//app.js
App({
  onLaunch: function () {


    wx.cloud.init({
      env: "test-o4xhh"
    });
    this.globalData = {}
  }
});