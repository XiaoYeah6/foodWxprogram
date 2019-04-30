// pages/show/show-comment/show-comment.js
const db= wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    author: "",
    img: "",
    showId: "",
    commentLists: []
  },

  formSubmit(e){
    let that=this;
    let content=e.detail.value.commentContent;
    this.setData({
      commentContent: content
    });

    db.collection("comment-list").add({
      data: {
        time: new Date().getTime(),
        commentContent: content,
        authorImg: that.data.img,
        author: that.data.author,
        showId: that.data.showId
      }
    }).then((res)=>{
      wx.showToast({
        title: '评论成功',
      })
      db.collection("comment-list").where({
        showId: that.data.showId
      }).limit(10).get().then((res) => {
        that.setData({
          commentLists: res.data
        });
      });
      that.setData({
        commentContent: ""
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.setData({
      author: options.author,
      img: options.img,
      showId: options.id
    });

    db.collection("comment-list").where({
      showId: options.id
    }).limit(10).get().then((res)=>{
      that.setData({
        commentLists: res.data
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