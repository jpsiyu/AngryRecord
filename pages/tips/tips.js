// pages/tips/tips.js

var tips = [
  "多运动，试试去跑步呗！",
  "找点好吃的哄哄肚子！",
  "玩会游戏吧！",
  "唱一首歌送给自己。",
  "到公园遛狗。",

  "到洗手间洗把脸.",
  "到阳台吹吹风",
  "来几个深呼吸",
  
  "看看小说",
  "给自己做几道菜",
  "超市逛逛，买点零食",
  "沏一壶茶",
  "洗个热水澡",
  "吃火锅去吧",
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },


  /**
   * 随机数
   */
  randomInt: function(max){
    return parseInt(Math.random() * (max + 1), 10);
  },

  /**
   * 更新界面
   */
  updateView: function(){
    var l = tips.length
    var n = this.randomInt(l-1)
    var t = tips[n]
    this.setData({
      choice: t
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.updateView()
  },
})