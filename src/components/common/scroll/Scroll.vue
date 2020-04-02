<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  // better-scroll用于更好移动端滑动
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //  设置probeType这个属性才能监听
      // 3可以监听惯性滚动的位置，2只能监听手指滑动到那个位置，不能监听惯性
      // 为3会影响性能，不能写死
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    });
    // 2.监听滚定的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scrollPosition", position);
      });
    }
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log(position);
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //  对事件做封装，父组件直接调用
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      console.log("img load");
      // 逻辑处理语句，先判断scroll存不存在，不存在就不执行后面的操作
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style scoped>
</style>