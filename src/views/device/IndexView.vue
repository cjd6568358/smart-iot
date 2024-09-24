<script setup>
import { NavBar, Switch } from 'vant';
import { useDeviceStore } from '../../stores/device'
import { setSwitch } from '../../utils/x11Helper';
const deviceStore = useDeviceStore()

</script>
<template>
    <NavBar :title="`设备(${deviceStore.allList.length})`"></NavBar>
    <div class="page-body devices">
        <div v-for="item in deviceStore.allList" class="item" :key="item.deviceId">
            <div class="top">
                <img :src="item.logo" mode="" />
                <Switch class="builtin-switch" :model-value="item.switch === 1"
                    @update:model-value="bool => setSwitch(item.deviceId, bool ? 1 : 0)" />
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="bottom">
                <div class="localtion"></div>
                <div class="extra"></div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.devices {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    padding: 10px;

    .item {
        height: 100px;
        background-color: #fff;
        border-radius: 12px;
        border: 1px solid #eee;
        padding: 10px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);

        .top {
            display: flex;
            align-items: center;

            img {
                width: 50px;
                height: 50px;
                margin-right: auto;
            }
        }

        .name {
            margin-top: 5px;
            font-size: 13px;
            font-weight: 500;
        }
    }
}
</style>