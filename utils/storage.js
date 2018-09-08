const angryDictKey = 'angryDict'
var version = '1.0'

var Storage = function(){
  this.angryDict = null;
}

Storage.prototype.initAngryDict = function(){
  var res = wx.getStorageSync(angryDictKey)
  if (res == "")
    this.angryDict = {version: version, record:{}}
  else if(res.version != version)
    this.angryDict = {version: version, record:{}}
  else
    this.angryDict = res
}

Storage.prototype.getAngryCount = function (key) {
  var data = this.angryDict.record[key]
  if (data == null)
    return 0
  return data.count
},

Storage.prototype.getAngryData = function(key){
  var data = this.angryDict.record[key]
  if (data == null)
    return {}
  return data
}

Storage.prototype.angryAdd = function (key, angryType){

  var data = this.angryDict.record[key]
  if(data == null){
    data = {
      count: 0,
      mini: 0,
      medium: 0,
      heavy: 0,
    }
  }
  data.count++
  switch(angryType){
    case 1:
      data.mini++
      break
    case 2:
      data.medium++
      break
    case 3:
      data.heavy++
      break
    default:
      break
  }
  this.angryDict.record[key] = data
  console.log('angryAdd', this.angryDict)

  wx.setStorage({
    key: angryDictKey,
    data: this.angryDict,
    success: function () { console.log("add2AngryDict success") },
    fail: function () { console.log("add2AngryDict fail") },
  })

  return data.count
},

module.exports = Storage