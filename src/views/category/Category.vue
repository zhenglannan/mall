<template>
  <div id="category">
    <CategoryNavBar></CategoryNavBar>
    <Scroll class="clearfix">
      <TabMenu :categories="categories" @select=select></TabMenu>
      <TabContent></TabContent>
    </Scroll>
  </div>
</template>

<script>
import { getCategory ,getSubcategory,getCategoryDetail} from "network/category";

import Scroll from "common/scroll/Scroll";

import CategoryNavBar from "./children/CategoryNavBar";
import TabMenu from "./children/TabMenu";
import TabContent from "./children/TabContent";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      // maitKey:'',
      categoryData:{},
      currentIndex:-1
    };
  },
  components: {
    Scroll,
    CategoryNavBar,
    TabMenu,
    TabContent
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        // console.log(res);
        this.categories = res.data.category.list;
      });
    },
    getSubcategory(index){
       this.currentIndex = index;
      const maitKey=this.categories[index].maitKey;
      getSubcategory(maitKey).then(res=>{
        // console.log(res.data);
        this.categoryData[index].subcategories=res.data;
        this.categoryData={...this.categoryData};
        this.getCategoryDetail('pop')
      })
    },
    getCategoryDetail(type){
      const miniWallkey=this.categories[this.currentIndex].miniWallkey;
     getCategoryDetail(miniWallkey,type).then(res=>{
        console.log(res);
      })
    },
    select(index){
      this.getSubcategory(index),
      this.getCategoryDetail(index)
    }
  },
  created() {
    this.getCategory();
  }
};
</script>

<style scoped>
</style>