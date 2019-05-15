// pages/home/home-list/home-detail/home-detail.js
let constUrl = require("../../../../utils/const.js");
let utils = require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfor: {},
    foodId: '',
    pic: "",
    title: "",
    content: "",

    viewCount: 0,
    starCount: 0,
    shareCount: 0,
    isCollection: false
  },


  // 注意在这个位置还需要更新home页面foodList数据库的列表数据

  collection() {
    let that = this;
    // 判断是否是已经收藏过了
    if (!that.data.isCollection) {
      let openId;
      utils.default.getOpenId().then((res) => {
        openId = res.result.OPENID;

        // 在这个位置
        // 把数据存入数据库
        const db = wx.cloud.database();
        const foodCollection = db.collection('collection_food');

        foodCollection.add({
          data: {
            openId: openId,
            foodId: this.data.foodId,
            viewCount: this.data.viewCount,
            starCount: this.data.starCount,
            shareCount: this.data.shareCount,
            time: new Date().getTime(),
            imgUrl: this.data.pic,
            title: this.data.name,
            content: utils.default.deleWrap1(this.data.content)
          }
        }).then((res) => {
          console.log(res);
          // 更新是否收藏状态数据
          that.setData({
            isCollection: true
          });
          that.data.starCount = parseInt(that.data.starCount) + 1;
          that.setData({
            starCount: that.data.starCount
          });
          wx.showToast({
            title: '亲，收藏成功啦',
          })

        }).catch(console.error);
      })
    } else {
      wx.showToast({
        title: '亲，已经收藏了哦',
      })
    }


  },

  // 注意在这个位置还需要更新home页面foodList数据库的列表数据

  share() {
    wx.showShareMenu({
      withShareTicket: true
    })
    // 更新分享的状态数据
    this.data.shareCount = parseInt(this.data.shareCount) + 1;
    this.setData({
      shareCount: this.data.shareCount
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let that = this;

    that.setData({
      viewCount: options.viewcount,
      starCount: options.starcount
    });

    // 浏览数的更新
    this.data.viewCount = parseInt(this.data.viewCount) + 1;
    this.setData({
      viewCount: this.data.viewCount
    });

    // 请求详情列表数据
    wx.getStorage({
      key: "detailInfor" + options.classid,
      success: function(res) {
        that.setData({
          detailInfor: res.data,
          foodId: res.data.id,
          pic: res.data.pic,
          title: res.data.name,
          content: utils.default.deleWrap1(res.data.content)
        });
      },
      fail() {
        let menuDetailUrl = constUrl.default.menuDetailUrl + utils.default.dealQuery(Object.assign({
          id: options.classid
        }, {
          appkey: constUrl.default.menuAppkey
        }));

        // 请求数据
        utils.default.requestData(menuDetailUrl).then((res) => {

          let data = res.data.result.result;
          // 把数据存储在缓存中
          utils.default.setStorage("detailInfor" + options.classid, data);
          // 更新数据
          that.setData({
            detailInfor: data,
            foodId: data.id,
            pic: data.pic,
            title: data.name,
            content: utils.default.deleWrap1(data.content)
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