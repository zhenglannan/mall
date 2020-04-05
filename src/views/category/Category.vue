<template>
  <div id="category" class="clearfix">
    <CategoryNavBar></CategoryNavBar>

    <TabMenu :categories="categories" @select="select" class="left"></TabMenu>
    <Scroll class="wrapper">
      <TabContent>
        <TabContentCategory :subcategories="showSubcategories"></TabContentCategory>
        <TabControl :title="['流行','新款','精选']" @tabbtn="tabClick"></TabControl>
        <TabContentDetail :categoryDetail="showCategoriesDetail"></TabContentDetail>
      </TabContent>
    </Scroll>
  </div>
</template>

<script>
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";

import Scroll from "common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";

import CategoryNavBar from "./children/CategoryNavBar";
import TabMenu from "./children/TabMenu";
import TabContent from "./children/TabContent";
import TabContentCategory from "./children/TabContentCategory";
import TabContentDetail from "./children/TabContentDetail";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      // maitKey:'',
      categoryData: {},
      currentIndex: -1,
      currentType: "pop"
    };
  },
  components: {
    Scroll,
    CategoryNavBar,
    TabMenu,
    TabContent,
    TabContentCategory,
    TabContentDetail,
    TabControl
  },
  computed: {
    showSubcategories() {
      if (this.currentIndex === -1) {
        return {};
      } else {
        return this.categoryData[this.currentIndex].subcategories;
      }
    },
    showCategoriesDetail() {
      if (this.currentIndex === -1) {
        return {};
      } else {
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      }
    }
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        // console.log(res);
        // 1.获取左列分类名字
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              "pop": [],
              "new": [],
              "sell": []
            }
          };
        }
        // 3.请求第一个分类的数据
        this.getSubcategory(0);
      });
    },
    // 请求右边（上）数据
    getSubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      // 获取右边分类数据（上）
      getSubcategory(maitKey).then(res => {
        // console.log(res.data);
        this.categoryData[index].subcategories = res.data.list;
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetail("pop");
        this.getCategoryDetail("new");
        this.getCategoryDetail("sell");
      });
    },
    // 获取右边详细的分类数据（下）
    getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        console.log(res);

        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        // ??
        this.categoryData = { ...this.categoryData };
      });
    },
    select(index) {
      this.getSubcategory(index);
    },
    tabClick(index) {
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
    }
  },
  created() {
    this.getCategory();
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.wrapper {
  height: 84%;
  overflow: hidden;
}
</style>