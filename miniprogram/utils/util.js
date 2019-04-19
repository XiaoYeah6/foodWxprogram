let requestData=(url)=>{
  return new Promise((resolve)=>{
    wx.request({
      url: url,
      success: resolve
    });
  });
}

let setStorage=(key,data)=>{
  wx.setStorage({
    key,
    data
  })
}

let deleWrap=(str)=>{
  let reg = /<br \/\>/g;
  let str1=str.replace(reg,"");
  return str1;
}

let dealQuery=(obj)=>{
  return Object.keys(obj).map((item) => {
    return item + "=" + obj[item]
  }).join("&");
}
export default{
  requestData,
  setStorage,
  deleWrap,
  dealQuery
}