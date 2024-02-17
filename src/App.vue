<template>
  <div id="app">
      <!-- 在具名视图中渲染 Header 组件 -->
      <router-view name="header"></router-view>

      <!-- 在默认视图中渲染当前路由匹配的组件 -->
      <router-view></router-view>

      <!-- 在具名视图中渲染 Sidebar 组件 -->
      <router-view name="leftbar"></router-view>
      <router-view name="rightbar"></router-view>

      <router-view name="footer"></router-view>
  </div>
</template>

<script>

export default {
    name: 'App',
    components: {
    },
    data() {
        return {

        }
    },
    mounted() {
    },
    methods: {

    }
}
</script>

<style>
    @import "assets/css/popup.scss";
    @import "assets/css/bottom.scss";
body {
    margin: 0;
    overflow: hidden;
}
</style>
