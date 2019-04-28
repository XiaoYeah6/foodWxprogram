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

  search(e) {
    wx.navigateTo({
      url: './home-list/home-list?' + utils.default.dealQuery(Object.assign(this.data.searchUrlInfor, {
        keyword: e.detail.value.searchName
      }))
    })
  },

  // 点击热门分类显示详情页面
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
        let menuUrl = constUrl.default.menuUrl + utils.default.dealQuery({
          appkey: constUrl.default.menuAppkey
        });
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
    // 思路： 先判断数据库里面是否含有classid这类的数据；
    // 如果有直接取出来，
    // 如果没有首先从接口中去请求数据
    // 然后把数据显示到页面的同时，也存入数据库中

    const db=wx.cloud.database();
    const foodList = db.collection('food-list');
    foodList.where({
      classid: "6" //当前每日推荐的classid
    }).get().then((res)=>{
      if(res.data[0]){
        that.setData({
          recommendList: res.data
        });
      } else {
        // 请求的url接口
        let recommendListUrl = constUrl.default.recommendListUrl + utils.default.dealQuery(Object.assign(that.data.recommendListInfor, {
          appkey: constUrl.default.menuAppkey
        }));

        // 请求数据
        let recommendList = [];
        utils.default.requestData(recommendListUrl).then((res) => {

          let resultList = res.data.result.result.list;
          // 获取用户的openid
          utils.default.getOpenId().then((res) => {
            let openId = res.result.OPENID;

            // 打包请求的数据
            resultList.forEach((item) => {
              let aRem = {};
              aRem.content = utils.default.deleWrap(item.content);
              aRem.id = item.id;
              aRem.name = item.name;
              aRem.pic = item.pic;
              aRem.time = new Date().getTime();
              aRem.viewCount = 0;
              aRem.starCount = 0;
              aRem.shareCount = 0;
              aRem.classid = item.classid;
              // 同时把数据显示到页面上面
              recommendList.push(aRem);
              // 把数据存入到数据库中
              foodList.add({
                data: aRem
              }).then((res) => {
                console.log(res);
              }).catch(console.error);
            });

            // 更新数据
            that.setData({
              recommendList
            });
          });



        });

      }
    });
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