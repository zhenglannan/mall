<template>
  <div id="cart">
    <CartNavBar @dbClick.native='topclick'></CartNavBar>
    <Scroll class="wrapper" ref="scro" :probeType="3" @scrollPosition="scrollPosition">
      <CartList></CartList>
    </Scroll>
    <CartBottomBar></CartBottomBar>
    <ToTop @click.native="topclick" v-show="isShowToTop" class="totop"></ToTop>
  </div>
</template>

<script>
import CartNavBar from "./children/CartNavBar";
import CartList from "./children/CartList";
import CartBottomBar from "./children/CartBottomBar";

import Scroll from "components/common/scroll/Scroll";

import ToTop from "components/content/backtop/ToTop";

export default {
  name: "Cart",
  data() {
    return {
      isShowToTop: false
    };
  },
  components: {
    CartNavBar,
    CartList,
    CartBottomBar,
    Scroll,
    ToTop
  },
  // 有缓存
  activated() {
    // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    this.$refs.scro.refresh();
  },
  methods: {
    topclick() {
      // 调用scroll组件中scroll数据方法(x,y,返回时间快慢)
      this.$refs.scro.scroll.scrollTo(0, 0, 500);
    },
    scrollPosition(position) {
      this.isShowToTop = -position.y > 600;
    }
  }
};
</script>

<style scoped>
#cart {
  height: 100vh;
  padding-bottom: 95px;
}
.wrapper {
  height: 92%;
  /* height: calc(100%-52px); */
  overflow: hidden;
}
.totop{
      bottom: 16%;
}
</style>