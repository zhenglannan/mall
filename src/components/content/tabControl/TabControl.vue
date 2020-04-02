<template>
  <div class="TabControl">
    <div v-for="(item,index) in title" :key="index" class="tabitem"
    :class="{active:currentIndex===index}" @click="tabbtn(index)">
      <span>{{item}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex:0
    };
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 利用索引index来决定激活class
    tabbtn(index){
      this.currentIndex=index;
      this.$emit("tabbtn",index)
    }
  }
};
</script>

<style scoped>
.TabControl {
  display: flex;
  text-align: center;
  font-size: 15px;
  /* line-height可以继承 */
  line-height: 40px;
  height: 40px;
}
.tabitem {
  flex: 1;
}
/* 激活样式 */
.active{
  color: var(--color-high-text);
}
.active span{
  padding: 0 5px;
  border-bottom: 1px solid var(--color-tint);
  
}
</style>