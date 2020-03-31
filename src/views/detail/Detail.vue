<template>
  <div id="detail">
    <DetailNavBar @itemclick="itemclick" ref="nav"></DetailNavBar>
    <Scroll class="wrapper" ref="scro" :probeType="3" @scrollPosition="scrollPosition">
      <DetailSwiper :banners="topimages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <!-- 传值需要小驼峰命名 -->
      <DetailGoodsInfo :detail-info="detailInfo" @refresh="datailImgLoad"></DetailGoodsInfo>
      <DetailParamInfo :param-info="paramInfo" ref="param"></DetailParamInfo>
      <DetailCommentInfo :comment-info="commentInfo" ref="comment"></DetailCommentInfo>
      <DetailRecommendInfo :recommend-list="recommendList" ref="recommend"></DetailRecommendInfo>
    </Scroll>
    <DetailBottomBar @joinCart="joinCart"></DetailBottomBar>
    <ToTop @click.native="topclick" v-show="isShowToTop"></ToTop>
  </div>
</template>

<script>
import DetailNavBar from "./children/DetailNavBar";
import DetailSwiper from "./children/DetailSwiper";
import DetailBaseInfo from "./children/DetailBaseInfo";
import DetailShopInfo from "./children/DetailShopInfo";
import DetailGoodsInfo from "./children/DetailGoodsInfo";
import DetailParamInfo from "./children/DetailParamInfo";
import DetailCommentInfo from "./children/DetailCommentInfo";
import DetailRecommendInfo from "./children/DetailRecommendInfo";
import DetailBottomBar from "./children/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";

import ToTop from "components/content/backtop/ToTop";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      id: "",
      topimages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      isShowToTop: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    Scroll,
    ToTop
  },
  methods: {
    getDetail(id) {
      getDetail(id).then(res => {
        // console.log(res);
        // const data作为常量可以直接被调用
        const data = res.result;
        // 1.获取顶部轮播图数据
        this.topimages = data.itemInfo.topImages;
        // 2.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 4.获取商品详情数据
        this.detailInfo = data.detailInfo;
        // 5.获取商品参数数据
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 6.获取商品评论数据
        this.commentInfo = data.rate.list[0];
        // 得到数据传给组件，组件还得渲染一会是同步渲染的会很慢，所以还不可以拿到$el，
        // 可以$nextTick，前面组件dom渲染完（但图片还没加载完）后会回调里面的函数，这时候$el就有值了
        this.$nextTick(() => {
          // 数据不对：图片没有计算在内
          // this.themeTopYs = [];
          // this.themeTopYs.push(0);
          // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopYs);
        });
      });
    },
    getRecommend() {
      getRecommend().then(res => {
        // const data=res.data;
        // console.log(res.data);
        this.recommendList = res.data.list;
      });
    },
    itemclick(index) {
      // console.log(index);
      this.$refs.scro.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    // 防抖操作，阻止频繁调用传入函数，使用新生成的函数
    // 而新生成的函数不会频繁刷新，如果下一次执行来的非常快，那么下一次
    // 执行来得非常快,那么会将上一次取消掉
    debounce(func, delay) {
      // timer不会被销毁，因为在闭包中被引用
      let timer = null;
      // 返回要调用的函数，下一次
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    // 图片加载函数
    datailImgLoad() {
      //  const refresh = this.debounce(this.$refs.scro.refresh,200);
      this.$refs.scro.refresh();
      this.getThemeTopYs();
    },
    scrollPosition(position) {
      this.isShowToTop = -position.y > 600;
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i in this.themeTopYs) {
        if (
          (this.currentIndex !== i &&
            i < length - 1 &&
            positionY > this.themeTopYs[Number(i)] &&
            positionY < this.themeTopYs[Number(i) + 1]) ||
          // 不能加三等号！！
          (i == length - 1 && positionY > this.themeTopYs[Number(i)])
        ) {
          this.currentIndex = Number(i);
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    // 返回顶部
    topclick() {
      // 调用scroll组件中scroll数据方法(x,y,返回时间快慢)
      this.$refs.scro.scroll.scrollTo(0, 0, 500);
    },
    joinCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topimages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.lowNowPrice;
      product.iid = this.id;
      this.$store.dispatch('addCart',getRecommend)
    }
  },
  activated() {
    // console.log( this.$route.query.id);
    // this.$router.replace(this.path)
  },
  // 一旦有了数据就会执行updated更新数据
  updated() {
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  created() {
    // 在created中是不能拿到$refs的值的
    this.id = this.$route.query.iid;
    this.getDetail(this.id);
    this.getRecommend();
    // 给 this.getThemeTopYs赋值（对给this.themeTopYs赋值的操作进行防抖）
    this.getThemeTopYs = this.debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    }, 300);
  },
  mounted() {
    // created里异步请求数据，在mounted里数据还不一定到,
    // this.$bus.$on("refresh", () => {
    // });
  }
  // beforeRouteLeave (to, from, next) {
  //   console.log(this.$route.path);
  //   this.path=this.$route.path;
  //   next();
  // }
};
</script>

<style scoped>
#detail {
  /* 层级关系，覆盖maintabbar */
  position: relative;
  z-index: 10;
  background: #ffffff;
  height: 100vh;
  padding-bottom: 52px;
}
/* 100%是相对于父元素。要给父元素设定具体高度为100vh */
.wrapper {
  height: 92%;
  overflow: hidden;
}
</style>