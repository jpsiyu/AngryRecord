// pages/angry/angry.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    percent: 0,
    touching: false,
  },

  dateKey: new Date().toLocaleDateString(),
  clock: null,
  progressColor: ['lightskyblue', 'yellow', 'orange', 'red'],

  /**
   * 按下
   */
  touchStart: function(e){
    this.setData({touching: true})
    this.data.percent = 0
    this.updateProgress()
    this.clock = setInterval(
      () => {
        if(this.data.percent < 99){
          this.data.percent++
          this.updateProgress()
        }
      },
      50,
    )
  },

  /**
   * 离开
   */
  touchEnd: function(e){
    this.setData({touching: false})
    clearInterval(this.clock)

    var angryType = Math.floor(this.data.percent / 25)
    if (angryType <= 0){
      this.data.percent = 0
      this.updateProgress()
    }else{
      var newCount = app.storage.angryAdd(this.dateKey, angryType)
      this.updateCount(newCount)
    }
  },


  /**
   * 刷新进度条
   */
  updateProgress: function(){
    var index = Math.floor(this.data.percent / 25)

    var colorList = []
    var percentList = []
    var data = {}
    for(var i = 0; i < 4; i++){
      var percent
      var color
      if(i < index){
        percent = 100
        color = this.progressColor[i]
      }
      else if(i > index){
        percent = 0
        color = 'white'
      }
      else{
        percent = (this.data.percent - i * 25) * 4
        color = this.progressColor[i]
      }
      data['percent'+i] = percent
      data['progressColor'+i] = color
    }
    this.setData(data)
  },

  /*刷新计数*/
  updateCount: function(angryCount){
    this.setData({
      angryCount: angryCount,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.data.dateKey = new Date().toLocaleDateString()
    var n = app.storage.getAngryCount(this.dateKey)
    this.updateCount(n)
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