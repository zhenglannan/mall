<template>
  <div id="main-tab-bar">
    <tab-bar >
      <!-- 如果是只传字符串，不需要加冒号path="/home" 传变量要加冒号  :path="path1"-->
      <tab-bar-item path="/home">
        <img src="~assets/img/tabbar/home_active.svg" alt slot="item-icon-active" />
        <img src="~assets/img/tabbar/home.svg" alt slot="item-icon" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~assets/img/tabbar/category_active.svg" alt slot="item-icon-active" />
        <img src="~assets/img/tabbar/category.svg" alt slot="item-icon" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img src="~assets/img/tabbar/cart_active.svg" alt slot="item-icon-active" />
        <img src="~assets/img/tabbar/cart.svg" alt slot="item-icon" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img src="~assets/img/tabbar/profile_active.svg" alt slot="item-icon-active" />
        <img src="~assets/img/tabbar/profile.svg" alt slot="item-icon" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  data() {
    return {};
  },
  components: {
    TabBar,
    TabBarItem
  },
  methods: {}
};
</script>

<style scoped>
#main-tab-bar {
  /* 设置fixed或者sticky定位就必须设置 z-index*/
  z-index: 9;
}
</style>