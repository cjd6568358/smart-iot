// pages/device/add.js
import { addSubscribe, getStatus } from '../../utils/x11Helper';
import { deviceStore } from '../../store/device'
import deviceConfig from '../../assets/deviceConfig.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.model = options.model || "2dGkWmko"
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  formSubmit(e) {
    const { host, username, password, deviceId, deviceName } = e.detail.value
    if (!host) {
      wx.showToast({
        title: 'host 必填',
      })
      return
    }
    if (!deviceId) {
      wx.showToast({
        title: 'deviceId 必填',
      })
      return
    }
    addSubscribe(deviceId, { host, username, password }, (data) => {
      console.log(data)
      deviceStore.setState(deviceId, { ...data, ...deviceConfig[this.model], name: deviceName })
    }).then(() => {
      getStatus(deviceId)
      wx.setStorageSync('device_' + deviceId, { options: { host, username, password }, name: deviceName, model: this.model })
      wx.switchTab({
        url: '/pages/device/overview',
      })
    }, (err) => {
      wx.showToast({
        icon: "error",
        title: err.message,
      })
    })
  }
})