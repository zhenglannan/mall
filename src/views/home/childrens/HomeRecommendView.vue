<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  data() {
    return {};
  },
  methods: {},
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  padding: 7px 0 12px;
  border-bottom: 3px solid #eee;
}
.recommend-item{
  flex: 1;
  /* width: 80px; */
  /* height: 90px; */
  text-align: center;
  font-size: 14px;
}
.recommend-item img{
  width: 70px;
  height: 70px;
  margin: 3px 0;
}
</style>