// pages/home/home/home-detail.js
let constUrl = require("../../../utils/const.js");
let utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuHomeList: [],
    homeListInfor: {
      start: 0,
      num: 10
    }
  },

  // 点击每日推荐显示详情页面
  showDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './home-detail/home-detail?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    // 处理一下请求数据的接口
    Object.assign(this.data.homeListInfor, {
      start: options.start,
      num: options.num,
      classid: options.classid
    });
    this.setData({
      homeListInfor: this.data.homeListInfor
    });

    let that = this;
    if (!options.classid || options.keyword) {
      console.log("关键字请求数据");
      // 请求详情列表数据
      wx.getStorage({
        key: 'menuHomeList' + options.keyword,
        success: function(res) {
          that.setData({
            menuHomeList: res.data
          });
        },
        fail() {

          let homeListUrl = constUrl.default.searchUrl + utils.default.dealQuery(Object.assign({
            num: options.num,
            keyword: options.keyword
          }, {
            appkey: constUrl.default.menuAppkey
          }));
          // 请求数据
          utils.default.requestData(homeListUrl).then((res) => {

            // 打包请求的数据
            let menuHomeList = [];
            res.data.result.result.list.forEach((item) => {
              let aRem = {};
              aRem.content = utils.default.deleWrap(item.content);
              aRem.id = item.id;
              aRem.name = item.name;
              aRem.pic = item.pic;
              menuHomeList.push(aRem);
            });

            // 把数据存储在缓存中
            utils.default.setStorage("menuHomeList", menuHomeList);
            // 更新数据
            that.setData({
              menuHomeList
            });
          });

        }
      })
    } else {
      console.log("非关键字请求数据");
      // 请求详情列表数据
      wx.getStorage({
        key: 'menuHomeList',
        success: function(res) {
          that.setData({
            menuHomeList: res.data
          });
        },
        fail() {

          let homeListUrl = constUrl.default.recommendListUrl + utils.default.dealQuery(Object.assign(that.data.homeListInfor, {
            appkey: constUrl.default.menuAppkey
          }));
          // 请求数据
          utils.default.requestData(homeListUrl).then((res) => {

            // 打包请求的数据
            let menuHomeList = [];
            res.data.result.result.list.forEach((item) => {
              let aRem = {};
              aRem.content = utils.default.deleWrap(item.content);
              aRem.id = item.id;
              aRem.name = item.name;
              aRem.pic = item.pic;
              menuHomeList.push(aRem);
            });

            // 把数据存储在缓存中
            utils.default.setStorage("menuHomeList", menuHomeList);
            // 更新数据
            that.setData({
              menuHomeList
            });
          });

        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})