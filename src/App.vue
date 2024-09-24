<script setup>
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router'
import { Tabbar, TabbarItem } from 'vant';
const route = useRoute()
const isShowTabBar = computed(() => ['deviceIndex', 'deviceSupport', 'userIndex'].includes(route.name));
</script>

<template>
  <RouterView />
  <Tabbar v-if="isShowTabBar" :fixed="false" route>
    <TabbarItem to="/device">首页</TabbarItem>
    <TabbarItem to="/device/support">添加</TabbarItem>
  </Tabbar>
</template>

<style>
.page-body {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
}
</style>
