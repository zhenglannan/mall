<template>
  <div>
    <NavBar class="category-navbar">
      <div slot="center">
        商品分类
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "CategoryNavBar",
  data() {
    return {};
  },
  components: {
    NavBar
  },
  methods: {}
};
</script>

<style scoped>
.category-navbar{
  background: var( --color-tint);
  color: #ffffff;
  font-weight: bold;
}
</style>