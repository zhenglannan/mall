<template>
  <div class="tabcontentcategory">
    <GridView :cols="3" :line-space="15" :v-margin="20">
      <div class="item" v-for="(item,index) in subcategories" :key="index">
        <a :href="item.link">
          <img class="item-img" src="item.image" alt />
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </GridView>
  </div>
</template>

<script>
import GridView from "common/gridView/GridView";

export default {
  name: "TabContentCategory",
  data() {
    return {};
  },
  props: {
    subcategories: {}
  },
  components: {
    GridView
  },
  methods: {}
};
</script>

<style scoped>
  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>