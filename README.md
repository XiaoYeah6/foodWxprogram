# weichat-app
参赛项目
## 目录结构
- [效果图](#效果图)
- [项目目录](#项目目录)
- [项目目录说明](#项目目录说明)
- [实现功能](#实现功能)
- [遇到的问题](#遇到的问题)

### 效果图
  <img src="http://49.232.143.111:3000/images/food1.png" width="25%" alt="http://49.232.143.111:3000/images/food1.png"/>
  <img src="http://49.232.143.111:3000/images/food2.png" width="25%" alt="http://49.232.143.111:3000/images/food1.png"/>
  <img src="http://49.232.143.111:3000/images/food3.png" width="25%" alt="http://49.232.143.111:3000/images/food1.png"/>
  <img src="http://49.232.143.111:3000/images/food4.png" width="25%" alt="http://49.232.143.111:3000/images/food1.png"/>
  <img src="http://49.232.143.111:3000/images/food5.png" width="25%" alt="http://49.232.143.111:3000/images/food1.png"/>
  <img src="http://49.232.143.111:3000/images/food6.png" width="25%" alt="http://49.232.143.111:3000/images/food1.png"/>
  <img src="http://49.232.143.111:3000/images/food7.png" width="25%" alt="http://49.232.143.111:3000/images/food1.png"/>
  <img src="http://49.232.143.111:3000/images/food8.png" width="25%" alt="http://49.232.143.111:3000/images/food1.png"/>
  <img src="http://49.232.143.111:3000/images/food9.png" width="25%" alt="http://49.232.143.111:3000/images/food1.png"/>
  
### 项目目录
  <img src="http://49.232.143.111:3000/images/dir3.png" alt="http://49.232.143.111:3000/images/dir3.png"/>

### 项目目录说明
  1. images: 表示项目的图片资源文件夹
  2. pages: 表示项目的页面文件夹
  3. index: 表示登录授权页面
  4. home: 表示首页
  5. show: 表示食谱的展示页面
  6. publish: 表示食谱的发布页面
  7. science: 表示科普信息页面
  8. profile: 表示我的页面
  9. template: 表示存放模板页面的文件
  10. utils: 表示一些公共方法的文件
  11. wxParse: 用于解析富文本的一些文件
  12. app.js: 表示主入口文件
  13. app.json: 表示全局配置文件
  14. app.wxss: 表示全局配置文件

### 实现功能
  1. index页面（授权页面）的用户授权功能
  2. 轮播图组件的使用
  3. 搜索功能的实现
  4. 传图识菜功能的实现
  5. 首页地方菜系的布局
  6. 首页菜谱列表的分页加载
  7. 首页菜谱列表项的布局
  8. 菜谱详情页面的布局，以及菜谱的收藏分享和图片预览和下载功能
  9. 食展页面每一项的布局
  10. 评论页面的实现
  11. 点赞功能的实现
  12. 发表页面的布局，以及图片上传功能的实现
  13. 科普页面的布局问题
  14. 科普详情页面的富文本处理问题 以及收藏等功能
  15. 我的页面的布局以及个人基本信息的获取
  16. 收藏页面的收藏信息列表获取
  17. 发表页面发表信息列表获取
  18. 用户反馈页面中反馈信息功能的实现

### 遇到的问题
  1. 小程序中关于接口使用的问题
  ```
      首先是对于是协议是https的情况：
      在开发者工具中进行初级开发的时候，我们可以在工具栏的详情中的项目配置中
      勾选上不校验合法域名即可进行正常请求数据
      在开发后期的时候，当小程序该为体验版的时候，我们就要在微信公众平台上面
      的工具栏的开发中的开发设置中添加我们需要的request合法域名，然后刷新一下就可以进行正常使用
      
      其次是对于协议是http的情况：
      由于我们小程序开发的过程中使用wx.request()请求数据使用的接口必须是以
      协议https为开头的接口，所以对于http协议是不合法的，在体验版是不能够正常请求数据的，
      所以我们就必须把http协议转化为https协议，我们使用的方法就是代理服务来解决这个问题，
      我们知道hotapp有免费的https proxy,可以免费代理请求任何http或者https服务，
      只要设置好合法域名为https://wxapi.hotapp.cn , 就可以请求以http协议开头的接口
  ```
  2. 实现传图识菜的功能
  ```
      实现此功能我们借助了百度AI开放平台的百度图像识别AI服务，对图片进行细粒度识别，
      达到菜品识别的效果，可以检测用户上传的菜品图片，返回具体的菜名，卡路里，置信度
      信息；
      但是我们在使用接口进行请求数据的时候的遇到了参数的请求限制---请求图片需要
      经过base64编码，图片的base64编码指将一副图片数据编码成一串字符串，使用该字符串
      代替图像地址；但是我们并不了解如何将图片进行base64编码，通过查询资料，我们发现
      小程序提供了一个接口： wx.getFileSystemManger().readFile(); 我们可以设置encoding的
      值为base64既可以得到图片的base64编码，拿到这个编码在进行请求数据
      
        distinguishPhoto() {
            let that = this;
            wx.chooseImage({
              success: res => {
                wx.getFileSystemManager().readFile({
                  filePath: res.tempFilePaths[0], //选择图片返回的相对路径
                  encoding: 'base64', //编码格式
                  success: res => { //成功的回调

                    // 测试传图识别菜品的接口
                    // 6.10
                    // 24.2bb1e3f841e17fe5a43aa54ddacc3f58.2592000.1562743815.282335-16271897
                    wx.request({
                      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=24.2bb1e3f841e17fe5a43aa54ddacc3f58.2592000.1562743815.282335-16271897',
                      method: "POST",
                      data: {
                        image: res.data,
                        filter_threshold: 0.95
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                      },
                      success(res) {
                        if (res.data.length != 0) {
                          wx.navigateTo({
                            url: '../home/home-list/home-list?' + utils.default.dealQuery(Object.assign({
                              num: 10
                            }, {
                              keyword: res.data.result[0].name
                            }))
                          })
                        } else {
                          wx.showToast({
                            title: '暂无数据，亲换一个吧',
                          })
                        }
                      }
                    })

                  }
                })
              }
            })
          }
  ```
  3. 首页菜品按钮失效的问题
  ```
    在前期进行开发的时候，由于没有控制左边input框的宽度，导致其占了一行，覆盖
    了右边的搜索按钮，同时两个元素又是同级别的，所以input框把button按钮进行了
    覆盖，从而导致其失效；
    解决方法： 对button按钮设置了relative相对定位，设置
    一下index的层级关系，使其在input框的上面
  ```
  4. 关于小程序云开发的小程序端和服务端中数据库的更新操作存在的问题
  ```
    小程序端操作数据库：使用db.collection(“table”).doc(“id”).update({}) 
    时经常会发现更新失败，这是由于微信小程序只允许用户操作自己的数据，不允
    许一个用户去操作另一个用户的数据(既无法直接修改他人创建的记录)，当然这
    个是在小程序端，我们如果想要解决这个问题，必须从服务端去更新数据库，才能避免这个问题；

    服务端操作数据库：我们经常会遇到的问题是使用一个云函数用于专门更新数据库，
    我们在小程序端进行调用云函数，结果是云函数调用成功，但是更新的数据条数是0，
    每当出现这个问题的时候，我们要从以下几个方面去寻找错误：
    一是参数的名称是否匹配，
    二是参数的类型是否匹配，
    三是你的数据是不是根本没有进行修改，此时的数据更新条数自然为0；
  ```
  5. 由子页面跳转到父级页面的时候实现父级页面的更新
  ```
    评论的条数问题：
    由于我们在子页面更新了数据想要把更新的数据也同步到父级页面上面进行显示，
    我们可以在加载父级页面的时候重新渲染一下，但是由于父到子页面的时候
    父级页面是不会卸载的，因此从子页面跳转到父级页面的时候，不会触发父级页面
    的onLoad生命周期函数，但是可以触发onShow，
    因此可以在onShow中调用: this.onLoad()触发钩子函数重新渲染页面
  ```
  6. 小程序食展页面的点赞问题
  ```
    首先声明一个用户对一个列表项只能进行点赞(+1)和取消点赞(-1)两种情况。
    问题： 如何记录保存用户对一个列表项点赞的状态(未点过，点过已经取消，点过)
    解决： 我们在数据库创建一个集合专门用于保存用户点赞的信息，当用户点击按钮
    的时候，首先获取当前列表项的唯一标识id, 以及用户的openid到点赞状态表中
    查询用户对这个列表项的点赞状态。
    
    (1): 没有点赞过： 查询数据库结果是不存在这则记录
    (2): 点赞过：     查询数据库结果是存在这条记录，其点赞状态字段为true
    (3): 点赞过但是又被取消： 查询数据库结果存在这条记录，点赞状态字段为false
    
      addGood(e) {
          let that = this;
          let goodInfor = e.currentTarget.dataset;

          // 首先获取用户是否已经点赞的信息，
          // 然后再进行操作
          db.collection('show-goodinfor').where({
            _openid: that.data.openId, // 填入当前用户 openid
            showId: goodInfor.id
          }).get().then(res => {

            let data = res.data;
            // 如果此条数据用户没有点过赞
            // length=0说明用户没有点过赞，不等于0说明点过赞

            // (1): 此时length=0；
            if (!data.length) {
              db.collection('show-goodinfor').add({
                  data: {
                    showId: goodInfor.id,
                    isGood: true
                  }
                })
                .then(res => {
                  wx.showToast({
                    title: '点赞成功'
                  })
                  // 此时调用云函数更改数据库
                  wx.cloud.callFunction({
                    name: "getShowData",
                    data: {
                      showid: goodInfor.id,
                      goodcount: goodInfor.goodcount + 1,
                      databasename: "publish-list"
                    }
                  }).then((res) => {
                    db.collection('publish-list').where({}).orderBy('time', 'desc').limit(20).get().then(res => {
                      that.setData({
                        showInfors: res.data
                      });
                    })
                  });
                })
                .catch(console.error)
            } else if (!data[0].isGood) {
              // 获取这条点赞的唯一表述
              let goodId = data[0]._id;

              // 此时length不等于0， 用户已经点过赞，可能被取消了
              // 更新数据库的这条数据， 不需要创建新的记录了
              db.collection('show-goodinfor').doc(goodId).update({
                  data: {
                    isGood: true
                  }
                })
                .then(() => {
                  wx.showToast({
                    title: '点赞成功'
                  })
                  // 调用云函数更细数据库
                  wx.cloud.callFunction({
                    name: "getShowData",
                    data: {
                      showid: goodInfor.id,
                      goodcount: goodInfor.goodcount + 1,
                      databasename: "publish-list"
                    }
                  }).then((res) => {
                    db.collection('publish-list').where({}).orderBy('time', 'desc').limit(20).get().then(res => {
                      that.setData({
                        showInfors: res.data
                      });
                    })
                  });

                })
                .catch(console.error)

            } else {
              // 获取这条点赞的唯一表述
              let goodId = data[0]._id;

              // 用户已经点过赞了，此时想取消点赞
              // 也是要更新这条数据，不需要重新创建新的纪录了
              db.collection('show-goodinfor').doc(goodId).update({
                  data: {
                    isGood: false
                  }
                })
                .then(() => {
                  wx.showToast({
                    title: '取消点赞'
                  })
                  // 调用云函数更新数据库
                  wx.cloud.callFunction({
                    name: "getShowData",
                    data: {
                      showid: goodInfor.id,
                      goodcount: goodInfor.goodcount - 1,
                      databasename: "publish-list"
                    }
                  }).then((res) => {
                    db.collection('publish-list').where({}).orderBy('time', 'desc').limit(20).get().then(res => {
                      that.setData({
                        showInfors: res.data
                      });
                    })
                  });
                })
                .catch(console.error)
            }

          })

        }
  ```
  
  7. 把一个带有html标签的字符串解析成正常的html页面
  ```
    问题：科普页面中的数据都是使用爬虫获取的数据，带有html标签
    
    如果在Vue中，我们可以使用v-html指令来解决这个问题。
    
    在小程序中是不支持富文本字符串的显示的，为了解决这个问题，
    我们可以使用: wxParse提供的WxParse.wxParse(bindName,type,data,target,imagePadding)
    方法来解决这个问题
    参数解析：
    bindName: 绑定的数据名
    type: 数据解析后的类型，html, md
    data:  为传入的具体需要转换的额数据
    target: 为page对象， 
    imagePadding: 是显示的图片的内边距
  ```
  8. 获取用户当前地理位置的方法
  ```
    问题：使用小程序提供的获取位置的API接口只能获得用户当前的经纬度，
    不能获取具体的地名，位置信息等，
    解决：
    因此我们使用腾讯位置服务提供的第三方服务进行逆地址解析： 
    reverseDeocoder();接口提供，输入坐标返回地理位置信息，达到我们的需求
  ```
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
