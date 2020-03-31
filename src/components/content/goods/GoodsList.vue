<template>
<div class="goods"> 
  <GoodsListItem v-for="item in goods" :key="item.id" :goodsItem="item" class="listItem">
  </GoodsListItem>
</div>
</template>

<script>
import GoodsListItem from './GoodsListItem';
export default {
  name:"GoodsList", 
  data() {
    return {}
  },
  props:{
    goods:{
      type:Array,
      default:[]
    }
  },
  methods:{},
  components:{
    GoodsListItem
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  /* 给宽度决定一行该有多少个 */
  flex-wrap: wrap;
  justify-content: space-around;
}
.listItem{
  width: 50%;
  padding: 2px 2px;
/* flex: 1; */

}
</style>