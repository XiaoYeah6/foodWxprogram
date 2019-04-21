// pages/science/science.js
let constUrl = require("../../utils/const.js");
let utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scienceMenu: [
      {
        name: "养生保健",
        id: 100,
        content: "健康速递 养生保健",
        pic: "../../images/nutrition.png"
      },
      {
        name: "营养科普",
        id: 105,
        content: "营养科普 养生饮食",
        pic: "../../images/nutrition.png"
      },
      {
        name: "养老观察",
        id: 102,
        content: "人群养生 养老观察",
        pic: "../../images/nutrition.png"
      },
      {
        name: "运动常识",
        id: 109,
        content: "运动常识 有氧瑜伽",
        pic: "../../images/nutrition.png"
      },
      {
        name: "心灵氧吧",
        id: 108,
        content: "心里百科 心灵氧吧",
        pic: "../../images/nutrition.png"
      },
      {
        name: "疾病科普",
        id: 101,
        content: "体质养生 中医两性",
        pic: "../../images/nutrition.png"
      }

    ]
  },

  showScienceList(e){
    // console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: './science-list/science-list?id='+id+"&title="+title,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let that = this;
    // wx.getStorage({
    //   key: 'scienceMenu',
    //   success: (res) => {
    //     this.setData({
    //       scienceMenu: res.data
    //     })
    //     console.log(res.data);
    //   },
    //   fail() {
    //     //   // 科普分类的url
    //     //   // let menuUrl = "http://route.showapi.com/90-86?showapi_appid=92670&showapi_sign&4e87aa3a7c724690be471832a5b48ae0";
    //     //   // 请求数据
    //     wx.request({
    //       url: 'http://route.showapi.com/90-86',
    //       data: {
    //         showapi_timestamp: utils.default.formatterDateTime(),
    //         showapi_appid: '92670',
    //         showapi_sign: '4e87aa3a7c724690be471832a5b48ae0',
    //       },
    //       header: {
    //         'content-type': 'application/json' // 默认值
    //       },
    //       success(res) {
    //         let obj = res.data.showapi_res_body.list;
    //         // 定义一个数组用于保存四个分类数据
    //         // let arr = [];
    //         // arr.push(obj[0], obj[12], obj[7], obj[6]);
    //         // 设置缓存数据
    //         // utils.default.setStorage('scienceMenu', arr);
    //         // that.setData({
    //           // scienceMenu: arr
    //         // });
    //         obj[6], obj[9], 
    //         console.log(obj);
    //       }
    //     })
    //   }
    // })

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