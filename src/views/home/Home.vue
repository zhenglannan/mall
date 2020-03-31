<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <TabControl
      :title="['流行','新款','精选']"
      @tabbtn="tabClick"
      ref="tabs1"
      v-show="isFixed"
      class="tabcontrol"
    ></TabControl>

    <Scroll
      class="wrapper"
      ref="wra"
      :probeType="3"
      :pullUpLoad="true"
      @scrollPosition="scrollPosition"
      @pullingUp="pullingUp"
    >
      <HomeSwiper :banners="banners" @imageLoad="imageLoad"></HomeSwiper>
      <HomeRecommendView :recommend="recommend"></HomeRecommendView>
      <FeatureView></FeatureView>
      <TabControl :title="['流行','新款','精选']" @tabbtn="tabClick" ref="tabs2"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>

    <!-- 组件不能直接监听事件，要加个native -->
    <ToTop @click.native="topclick" v-show="isShowToTop"></ToTop>
  </div>
</template>

<script>
// 更加细致的封装
import HomeSwiper from "./childrens/HomeSwiper";
import HomeRecommendView from "./childrens/HomeRecommendView";
import FeatureView from "./childrens/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import ToTop from "components/content/backtop/ToTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  // 这些数据可在vue.devtools实时观看
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowToTop: false,
      tabOffsetTop: 568,
      viewPosition: 0,
      saveY: 0
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    ToTop
  },
  methods: {
    /*   事件监听相关的方法 */
    // tab切换对应数据
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 修复tabcontrol动态样式改变bug
      this.$refs.tabs1.currentIndex = index;
      this.$refs.tabs2.currentIndex = index;
    },
    // 返回顶部
    topclick() {
      // 调用scroll组件中scroll数据方法(x,y,返回时间快慢)
      this.$refs.wra.scroll.scrollTo(0, 0, 500);
    },
    scrollPosition(position) {
      // console.log(position);
      // position.y是负值,所以先转为正值
      this.isShowToTop = -position.y > 600;
      this.viewPosition = -position.y;
      // console.log(this.viewPosition);
    },
    // 上拉加载更多
    pullingUp() {
      this.getHomeGoods(this.currentType);
      // 完成上拉加载更多
      this.$refs.wra.finishPullUp();
      // this.$refs.wra.scroll.refresh();
      // console.log("aa");
      // console.log(this.goods[this.currentType].page);
    },
    imageLoad() {
      // console.log(this.$refs.tabs.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabs2.$el.offsetTop;
    },
    /*   网络请求相关的方法 */
    // 获取首页Multidata数据
    getHomeMultidata() {
      // 请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    // 请求商品数据（请求和保存）
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res.data.list);
        // ...会将res.data.list这个数组解析，把数组中每个数据依次push
        // 或者for(let.. of ..)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;
      });
    },
    debounce(func, delay) {
      // timer不会被注销，因为在闭包中被引用
      let timer = null;
      // 返回要调用的函数，下一次
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }
  },
  mounted() {
    // 从事件总线接收，在每次图片刷新，调用scroll中refresh
    const refresh = this.debounce(this.$refs.wra.refresh, 200);
    this.$bus.$on("refresh", () => {
      // console.log("img load");
      refresh();
    });
  },
  computed: {
    // 传递给子组件goods中对应的数据
    showGoods() {
      return this.goods[this.currentType].list;
    },
    isFixed() {
      return this.viewPosition > this.tabOffsetTop;
    }
  },
  // 一般在created中只写主要的数据，只调用方法就行，不写具体的实现
  created() {
    // 对methods中方法进行调用
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // destroyed() {
  //       console.log('destroyed')
  // },
  activated() {
    // console.log('activated')
    // 先刷新再滚动
    this.$refs.wra.scroll.refresh();
    this.$refs.wra.scroll.scrollTo(0, this.saveY);
  },
  deactivated() {
    // 离开时保存位置信息
    this.saveY = this.$refs.wra.scroll.y;
    // console.log( this.saveY);
  }
};
</script>

<style scoped>
/* 首页导航栏 */
.home-nav {
  color: #ffffff;
  background-color: var(--color-tint);
  /* position: fixed; */
  /* top: 0; */
  /* left: 0; */
  /* right: 0; */
  width: 100%;
  margin: 0 auto;
  z-index: 9;
}
/* 首页 */
#home {
  /* bug:不能写死 */
  /* padding: 43px 0; */
  padding-bottom: 49px;
  position: relative;
  /* viewport height视口（整个界面）高度100%视口 */
  /* 为了不让Scroll组件顶满高度*/
  height: 100vh;
}
/* tab标签 */
.tabcontrol {
  /* 悬浮定位 */
  position: relative;
  /* top: 44px; */
  background: #ffffff;
  z-index: 9;
  width: 100%;
}
/* scroll组件 */
.wrapper {
  /* 要给warpper1.最外层给个高度 2.并且设置溢出隐藏*/
  /* 这个calc高度有bug */
  /* height: calc(100%-93px); *
  /* 100%是相对于父元素。要给父元素设定具体高度为100vh */
  height: 100%;
  overflow: hidden;
  /* position: relative; */
}
</style>