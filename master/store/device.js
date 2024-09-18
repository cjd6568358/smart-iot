import { configure, observable, action } from 'mobx-miniprogram'
// 不允许在动作外部修改状态
configure({ enforceActions: 'observed' });
export const deviceStore = observable({

  // 数据字段
  deviceMap: {},

  // 计算属性
  get deviceList() {
    return Object.values(this.deviceMap)
  },

  // actions
  setState: action(function (deviceId, newState) {
    if (this.deviceMap[deviceId]) {
      this.deviceMap[deviceId] = { ...this.deviceMap[deviceId], ...newState }
    } else {
      this.deviceMap[deviceId] = newState
    }
  }),
  add: action((deviceId, model, options) => {
    if (model === "2dGkWmko") {
      x11Helper.addSubscribe(deviceId, options, (data) => {
        console.log(data)
        this.setState(deviceId, data)
      })
    }
  }),
  getStatus: action(function (deviceId, data) {
    if (this.deviceMap[deviceId].model === "2dGkWmko") {
      x11Helper.getStatus(deviceId)
    }
  }),
  setSwitch: action(function (deviceId, status) {
    if (this.deviceMap[deviceId].model === "2dGkWmko") {
      x11Helper.setSwitch(deviceId, status)
    }
  }),
  setCountDown: action(function (deviceId, num) {
    if (this.deviceMap[deviceId].model === "2dGkWmko") {
      x11Helper.setCountDown(deviceId, num)
    }
  }),
})