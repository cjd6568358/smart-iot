import { defineStore } from 'pinia'
import { addSub, getStatus } from '../utils/x11Helper';
import devices from '@/assets/devices.json'

const deviceStore = defineStore('device', {
    state: () => ({ allMap: {} }),
    getters: {
        allList: (state) => Object.values(state.allMap)
    },
    actions: {
        setState (deviceId, newState) {
            if (this.allMap[deviceId]) {
                Object.assign(this.allMap[deviceId], newState)
            } else {
                this.allMap[deviceId] = newState
            }
        }
    }
})
// useDeviceStore.$subscribe((mutation, state) => {
//     // 每当状态发生变化时，将整个 state 持久化到本地存储。
//     localStorage.setItem('deviceList', JSON.stringify(Object.values(state.allMap)))
// })
const initDeviceStore = () => {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith('device_')) {
            const { model, name, options } = JSON.parse(localStorage.getItem(key))
            const deviceId = key.replace('device_', '')
            addSub(deviceId, options, (data) => {
                console.log(data)
                deviceStore().setState(deviceId, { ...data, ...devices[model], name })
            }).then(() => getStatus(deviceId))
        }
    }
}

export {
    deviceStore as useDeviceStore,
    initDeviceStore
}