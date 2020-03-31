<template>
<!-- <div class="backtop" @click='topclick'> -->
  <div class="backtop" >
<img src="~assets/img/common/top.png" alt="">
</div>
</template>

<script>
export default {
  //返回顶部
  name:"ToTop", 
  data() {
    return {}
  },
  methods:{
    // topclick(){
    //   this.$emit('topclick')
    // }
  }
}
</script>

<style scoped>
/* 因为此组件都在右下角的位置，所以在子组件内统一设定 */
.backtop{
   position: fixed;
  bottom: 8%;
  right: -25px;
}
.backtop img{
    width: 65%;
}
</style>