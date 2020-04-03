<template>
  <div id="tabcontent" class="left">
    <Scroll class>
      <TabContentCategory></TabContentCategory>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import TabContentCategory from "./TabContentCategory";

export default {
  name: "TabContent",
  data() {
    return {};
  },
  components: {
    Scroll,
    TabContentCategory
  },
  methods: {}
};
</script>

<style scoped>
#tabcontent {
  height: 100vh;
  padding-bottom: 87px;
  width: 70%;
  text-align: center;
  background: #ffffff;
  font-size: 15px;
}
</style>