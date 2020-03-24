<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeSwiper :banners=banners></HomeSwiper>
    <HomeRecommendView :recommend=recommend></HomeRecommendView>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
// 更加细致的封装
import HomeSwiper from "./childrens/HomeSwiper";
import HomeRecommendView from "./childrens/HomeRecommendView";

import { getHomeMultidata } from "network/home";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommend: []
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  methods: {},
  created() {
    //  console.log(getHomeMultidata);
    getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommend = res.data.recommend.list;
    });
  }
};
</script>

<style scoped>
.home-nav {
  color: #ffffff;
  background-color: var(--color-tint);
}
</style>