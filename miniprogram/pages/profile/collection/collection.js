// pages/profile/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionFoods: [],
    openId:""
  },

  showDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../home/home-list/home-detail/home-detail?id=' + id,
    })
  },

  toScienceCollec(){
    wx.redirectTo({
      url: '../collection-science/collection-science?openId='+this.data.openId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId: options.openId
    });
    const db=wx.cloud.database();
    db.collection("collection_food").where({
      _openid: options.openId // 填入当前用户 openid
    }).get().then((res)=>{
      console.log(res.data);
      this.setData({
        collectionFoods: res.data
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