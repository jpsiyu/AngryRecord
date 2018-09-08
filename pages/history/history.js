// pages/history/history.js

// 引用图表插件
var wxCharts = require('../../3rd/dist/wxcharts.js')
var app = getApp()
var lineChart = null
var pieChart = null
var startPos = null

var str1 = "点击查看详细数据"
var str2 = "暂无记录数据"

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  selectKey: null,
  lineChartData: null,

  /**
  * 点击图标响应
  */
  touchHandler: function (e) {
    lineChart.scrollStart(e)
  },

  /**
   * 拖动响应
   */
  moveHandler: function (e) {
    lineChart.scroll(e)
  },

  touchEndHandler: function (e) {
    lineChart.scrollEnd(e)
    lineChart.showToolTip(e, {
      format: function (item, category) {
        //return category + ' ' + item.name + ':' + item.data
        return category + ' 生气 ' + item.data
      }
    })
    var index = lineChart.getCurrentDataIndex(e)
    this.updatePieChart(index)
  },

  /**
   * 创建图表数据
   */
  createChartData: function(){
    var angryDict = app.storage.angryDict.record
    var categories = []
    var data = []
    for (var key in angryDict) {
      categories.unshift(key)
      data.unshift(app.storage.getAngryCount(key))
    }
    this.lineChartData = {
      categories: categories,
      data: data
    }
    return this.lineChartData
  },

  /**
   * 更新图表
   */
  updateChart: function () {
    //获取设备宽度
    var windowWidth = 320
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth
    } catch (e) {
      console.error('getSystemInfoSync failed')
    }

    var simulationData = this.createChartData()

    if(simulationData.data.length == 0){
      this.setData({ chartDesc: str2 })
      return
    }
    this.setData({ chartDesc: str1 })

    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: false,
      series: [{
        name: '日期',
        data: simulationData.data,
        format: function (val, name) { return val + '次' }
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '生气次数',
        format: function (val, name) { return val },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    })
  },

  /**
   * 饼状图
   */
  updatePieChart: function(index){
    var key = this.lineChartData.categories[index]
    if (key == this.selectKey)
      return
    this.selectKey = key
    
    var angryData = app.storage.getAngryData(key)

    var pieSeries = [
      { name: '小怒', data: angryData.mini, color:'yellow' },
      { name: '怒了', data: angryData.medium, color:'orange' },
      { name: '怒飞', data: angryData.heavy, color:'red' },
    ]

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: pieSeries,
      width: windowWidth,
      height: 250,
      dataLabel: true,
    });
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
    this.updateChart()
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