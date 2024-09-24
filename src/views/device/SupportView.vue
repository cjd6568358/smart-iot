<script setup>
import { useRouter } from 'vue-router'
import { NavBar, Grid, GridItem } from 'vant';
import devices from '@/assets/devices.json'
const router = useRouter()
const routerTo = (item) => {
    router.push({ name: 'deviceAdd', params: { model: item.model } })
}
</script>
<template>
    <NavBar title="支持列表"></NavBar>
    <Grid class="page-body" :column-num="3">
        <GridItem v-for="item in devices" :key="item.model" @click="routerTo(item)">
            <img :src="item.logo" />
            <div class="name">{{ item.name }}</div>
        </GridItem>
    </Grid>
</template>
<style lang="scss" scoped>
.page-body {
    padding: 10px;

    .van-grid-item {
        height: 140px;
        background-color: #fff;
        text-align: center;
        border-radius: 10px;

        img {
            width: 60px;
            height: 60px;
        }

        .name {
            margin-top: 2px;
        }
    }
}
</style>