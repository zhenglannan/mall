<template>
  <div id="tabmenu" class="left">
    <Scroll class="wrapper">
      <div
        v-for="(item,index) in categories"
        :key="index"
        class="menu"
        @click="select(index)"
        :class="{active:currentIndex===index}"
      >{{item.title}}</div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "TabMenu",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Scroll
  },
  methods: {
    select(index) {
      this.currentIndex = index;
      this.$emit('select',index)
    }
  }
};
</script>

<style scoped>
#tabmenu {
  height: 100vh;
  padding-bottom: 87px;
  width: 30%;
  text-align: center;
  background: #eeeeee;
  font-size: 15px;
}
.wrapper {
  height: 97%;
  overflow: hidden;
}
.menu {
  padding: 5.2vw;
}
.active {
  color: var(--color-high-text);
  background: #ffffff;
  font-weight: bold;
}
</style>