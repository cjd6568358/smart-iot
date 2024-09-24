<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NavBar, Form, Field, CellGroup, Button, Toast } from 'vant';
import { addSub, getStatus } from '@/utils/x11Helper';
import { useDeviceStore } from '../../stores/device'
import devices from '@/assets/devices.json'
const router = useRouter()
const route = useRoute()
const deviceStore = useDeviceStore()
const host = ref('broker-cn.emqx.io');
const username = ref('CMCC_X11');
const password = ref('==CMCC@2024==');
const deviceId = ref('111005220023418');
const deviceName = ref('CMCC_X11');
const model = route.params.model
const onSubmit = (values) => {
    const { host, username, password, deviceId, deviceName } = values
    if (!host) {
        Toast('host 必填');
        return
    }
    if (!deviceId) {
        Toast('deviceId 必填');
        return
    }
    addSub(deviceId, { host, username, password }, (data) => deviceStore.setState(deviceId, { ...data, ...devices[model], name: deviceName })).then(() => {
        getStatus(deviceId)
        localStorage.setItem('device_' + deviceId, JSON.stringify({ options: { host, username, password }, name: deviceName, model }))
        router.push({ name: "deviceIndex" })
    }, (err) => {
        Toast.fail(err.message);
    })
};
</script>
<template>
    <NavBar title="添加设备"></NavBar>
    <Form class="page-body" @submit="onSubmit">
        <div class="title">MQTT参数</div>
        <CellGroup inset>
            <Field v-model="host" name="host" label="host" placeholder="host"
                :rules="[{ required: true, message: '请填写host' }]" />
            <Field v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <Field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </CellGroup>
        <div class="title">设备信息</div>
        <CellGroup inset>
            <Field v-model="deviceId" name="deviceId" label="设备ID" placeholder="设备ID"
                :rules="[{ required: true, message: '请填写设备ID' }]" />
            <Field v-model="deviceName" name="deviceName" label="设备名称" placeholder="设备名称"
                :rules="[{ required: true, message: '请填写设备名称' }]" />
        </CellGroup>
        <div class="button-group">
            <Button round block type="primary" native-type="submit">
                提交
            </Button>
            <Button round block>
                重置
            </Button>
        </div>
    </Form>
</template>
<style lang="scss" scoped>
.van-form {
    padding: 0 20px;

    .title {
        margin: 15px 0;
    }
}

.button-group {
    display: flex;
    gap: 10px;
    margin-top: 16px;
}
</style>