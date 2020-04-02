<template>
  <div>
    <NavBar class="cartNavBar">
      <span slot="center" class="cartCenter">购物车({{length}})</span>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {mapGetters} from 'vuex';
export default {
  name: "CartNavBar",
  data() {
    return {
      count: 0
    };
  },
  components: {
    NavBar
  },
  methods: {},
  computed: {
    // getCount() {
    //  return this.$store.getters.getLength
    // }
    
    // 数组解构赋值
    // ...mapGetters(['getLength'])
    ...mapGetters({
      // 也可以是对象 映射成自己想要的名字 
      length:'getLength'
    })
  },
};
</script>

<style scoped>
.cartCenter {
  /* height: 100%; */
  color: #fff;
}
.cartNavBar {
  background: var(--color-tint);
}
</style>