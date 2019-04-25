// pages/home/home.js
let constUrl = require("../../utils/const.js");
let utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门分类数据列表
    menuList: [],

    // 每日推荐数据列表
    recommendList: [],

    // 写死的热门分类数据接口信息

    // 写死的每日推荐数据接口信息
    recommendListInfor: {
      classid: 6,
      start: 0,
      num: 10
    },
    searchUrlInfor: {
      // keyword: "",
      num: 10
    }
  },

  search(e){
    wx.navigateTo({
      url: './home-list/home-list?' + utils.default.dealQuery(Object.assign(this.data.searchUrlInfor, { keyword: e.detail.value.searchName}))
    })
  },

  // 点击每日推荐显示详情页面
  showDetail(e) {
    let id = e.currentTarget.dataset.classid;
    wx.navigateTo({
      url: './home-list/home-detail/home-detail?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let appkey = constUrl.default.menuAppkey;
    // 使用变量that保存this指向
    let that = this;

    // 热门分类
    // 获取缓存数据
    wx.getStorage({
      key: 'menuList',
      success: (res) => {
        this.setData({
          menuList: res.data
        })
      },
      fail() {
        // 热门分类请求的url
        // 处理url接口
        let menuUrl = constUrl.default.menuUrl + utils.default.dealQuery({ appkey: constUrl.default.menuAppkey });
        // 请求数据
        utils.default.requestData(menuUrl).then((res) => {
          // 设置缓存数据
          utils.default.setStorage('menuList', res.data.result.result[4].list.slice(0, 9));
          // 更新数据
          that.setData({
            menuList: res.data.result.result[4].list.slice(0, 9)
          })
        });
      }
    })

    // 每日推荐列表
    // 获取缓存数据
    wx.getStorage({
      key: 'recommendList',
      success: function(res) {
        that.setData({
          recommendList: res.data
        });
      },
      fail() {
        // let recommendListUrl = constUrl.default.recommendListUrl;
        let recommendListUrl = constUrl.default.recommendListUrl + utils.default.dealQuery(Object.assign(that.data.recommendListInfor, { appkey: constUrl.default.menuAppkey}));
        // 请求数据
        utils.default.requestData(recommendListUrl).then((res) => {

          // 打包请求的数据
          let recommendList = [];
          res.data.result.result.list.forEach((item) => {
            let aRem = {};
            aRem.content = utils.default.deleWrap(item.content);
            aRem.id = item.id;
            aRem.name = item.name;
            aRem.pic = item.pic;
            recommendList.push(aRem);
          });

          // 把数据存储在缓存中
          utils.default.setStorage("recommendList", recommendList);
          // 更新数据
          that.setData({
            recommendList
          });
        });

      }
    })


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