<template>
  <div id="app">
    <!-- keep-alive保持组件不被销毁 ，再次进入时不被重新创建-->
    <!-- 详情页不能被缓存，不然退出后重新进入信息是一样的 -->
     <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="maintabbar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
.maintabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
