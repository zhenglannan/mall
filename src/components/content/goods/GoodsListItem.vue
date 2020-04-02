<template>
  <div class="goodsItem">
    <img v-lazy="showImage" @click="imgClick" @load="imgLoad"/>
    <div class="desc">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  data() {
    return {};
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage(){
      return this.goodsItem.image||this.goodsItem.show.img
    },
  },
  methods: {
    // 原生js自带load函数，图片加载完后
    imgLoad(){
      // console.log('img load');
      // 发给事件总线
      this.$bus.$emit('refresh')
    },
    imgClick() {
      // console.log("imgclick");
      // 路由跳转(可以返回)
      this.$router.push({
        path: "/detail",
        query: {
          iid: this.goodsItem.iid|| this.goodsItem.item_id
        }
      });
    }
  }
};
</script>

<style scoped>
.goodsItem img {
  width: 100%;
  border-radius: 5px;
}
.desc {
  text-align: center;
  padding: 3px 0;
}
.desc p {
  font-size: 15px;
  padding-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.desc .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.desc .collect {
  position: relative;
}
.desc .collect::before {
  content: "";
  position: absolute;
  top: 0;
  left: -14px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/95%;
}
</style>