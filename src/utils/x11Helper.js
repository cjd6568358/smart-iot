import mqtt from "mqtt";
const clientMap = {}
const deviceMap = {}

const connect = ({ host, username, password }) => {
  return new Promise((resolve) => {
    try {
      const client = mqtt.connect(`wss://${host}:8084/mqtt`, {
        username,
        password,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        clientId: new Date().getTime(),
      });
      client.on("connect", () => {
        client.subscribe("/sys/2dGkWmko/#")
        client.on("message", (topic, payload) => {
          const result = JSON.parse(String.fromCharCode(...payload))
          const deviceId = topic.replace(/.*\/2dGkWmko\/(\d+).*/, '$1')
          // 设备上线后自动回复
          if (result.method === "thing.event.property.post" && result.id === 3) {
            getStatus(deviceId)
          }
          Object.entries(deviceMap).filter(([key, val]) => {
            if (deviceId === key && val.client === client && ['get_reply', 'set_reply', 'post'].some(action => topic.includes(action))) {
              val.callback({ ...result.data, deviceId })
            }
          })
        });
        client.on("error", (error) => {
          console.log(client, "onError", error);
        });
        client.on("reconnect", () => {
          console.log(client, "reconnecting...");
        });
        client.on("offline", () => {
          console.log(client, "offline");
        });
        resolve(client)
      });
      return client
    } catch (error) {
      console.log("mqtt.connect error", error);
    }
  })
}
const disconnect = (clientKey) => {
  if (clientMap[clientKey]) {
    clientMap[clientKey].end()
    delete clientMap[clientKey]
  }
}
const addSub = async (deviceId, mqttOptions = {}, callback) => {
  if (deviceMap[deviceId]) {
    throw new Error("不允许重复订阅")
  }
  const { host = "broker-cn.emqx.io", username = "test", password = "test" } = mqttOptions
  const clientKey = host + username
  if (!clientMap[clientKey]) {
    clientMap[clientKey] = await connect({ host, username, password })
  }
  deviceMap[deviceId] = { client: clientMap[clientKey], callback }
}
const getStatus = (deviceId) => {
  const { client } = deviceMap[deviceId]
  if (client) {
    client.publish(`/sys/2dGkWmko/${deviceId}/thing/service/property/get`, JSON.stringify({ "id": deviceId, "method": "thing.service.property.get", "params": ["switch", "countDown"], "timestamp": Date.now(), "version": "2.0.0" }))
  } else {
    console.log('client not find')
  }
}
const setSwitch = (deviceId, status) => {
  const { client } = deviceMap[deviceId]
  if (client) {
    client.publish(`/sys/2dGkWmko/${deviceId}/thing/service/property/set`, JSON.stringify({ "id": deviceId, "method": "thing.service.property.set", "params": { "switch": status }, "timestamp": Date.now(), "version": "2.0.0" }))
  } else {
    console.log('client not find')
  }
}
const setCountDown = (deviceId, num) => {
  const { client } = deviceMap[deviceId]
  if (client) {
    client.publish(`/sys/2dGkWmko/${deviceId}/thing/service/property/set`, JSON.stringify({ "id": deviceId, "method": "thing.service.property.set", "params": { "countDown": num }, "timestamp": Date.now(), "version": "2.0.0" }))
  } else {
    console.log('client not find')
  }
}

export {
  addSub,
  getStatus,
  setSwitch,
  setCountDown
}