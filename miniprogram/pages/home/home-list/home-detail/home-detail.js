// pages/home/home-list/home-detail/home-detail.js
let constUrl = require("../../../../utils/const.js");
let utils = require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfor: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let query = utils.default.dealQuery(options);
    let that = this;

    // 请求详情列表数据
    wx.getStorage({
      key: "detailInfor" + options.id,
      success: function (res) {
        that.setData({
          detailInfor: res.data
        });
        console.log(res.data);
      },
      fail() {
        let menuDetailUrl = "https://way.jd.com/jisuapi/detail?id="+options.id+"&appkey=d84a730b819430e5a41c09989fbcda66";
        // 请求数据
        utils.default.requestData(menuDetailUrl).then((res) => {

          let data=res.data.result.result;
          // 把数据存储在缓存中
          utils.default.setStorage("detailInfor"+options.id, data);
          // 更新数据
          that.setData({
            detailInfor: data
          });
        });

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})