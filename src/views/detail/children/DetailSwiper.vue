<template>
<Swiper>
  <SwiperItem v-for="item in banners" :key="item.id" class="datailswiperitem">
    <img :src="item" alt="">
  </SwiperItem>
</Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name:"DetailSwiper", 
  data() {
    return {}
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{},
  components:{
    Swiper, SwiperItem
  }
}
</script>

<style scoped>
.datailswiperitem img{
  height: 400px;
}
</style>