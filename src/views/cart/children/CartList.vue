<template>
<div>
<CartListItem v-for="(item,index) in cartList" :key="index" :item-info=item :index=index></CartListItem>
</div>
</template>

<script>
import CartListItem from "./CartListItem";

export default {
  name:"CartList", 
  data() {
    return {
      cartList:this.$store.state.cartLists
    }
  },
  components:{
    CartListItem
  },
  methods:{}
}
</script>

<style scoped>
</style>