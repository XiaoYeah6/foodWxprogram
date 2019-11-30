//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    // hotapp: hotapp // 这里作为一个全局变量, 方便其它页面调用
  }
});

wx.cloud.init({
  env: "test-o4xhh"
});