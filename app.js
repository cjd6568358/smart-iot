// app.js
import { addSubscribe, getStatus } from '/utils/x11Helper';
import { deviceStore } from '/store/device'
import deviceConfig from '/assets/deviceConfig.js'
const deviceList = wx.getStorageInfoSync().keys.filter(key => key.startsWith('device_')).map(key => {
  const { model, name, options } = wx.getStorageSync(key)
  const deviceId = key.replace('device_', '')
  addSubscribe(deviceId, options, (data) => {
    console.log(data)
    deviceStore.setState(deviceId, { ...data, ...deviceConfig[model], name })
  }).then(() => getStatus(deviceId))
})

App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
