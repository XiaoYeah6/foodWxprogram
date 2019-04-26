// pages/profile/profile.js
let constUrl = require("../../utils/const.js");
let utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: ""
  },

  share(){
    wx.showShareMenu({
      withShareTicket: true 
    })
  },

  clearStor(){
    wx.showModal({
      title: "提示",
      content: '清除缓存可能造成卡顿，是否确认清除缓存',
      confirmText: "确认",
      success(res){
        if(res.confirm){
          wx.clearStorage();
          wx.showToast({
            title: '',
          })
        }
      }
    })
  },

  showCollection(e){
    wx.navigateTo({
      url: './collection/collection?openId='+e.currentTarget.dataset.openid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.default.getOpenId().then((res)=>{
      this.setData({
        openId: res.result.OPENID
      });
    });
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