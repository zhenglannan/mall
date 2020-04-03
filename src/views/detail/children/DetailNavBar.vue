<template>
  <div>
    <NavBar>
      <!-- <div class="left"> -->
      <div slot="left" class="leftsign" @click="backbtn"></div>
      <!-- </div> -->
      <div slot="center" class="centerblock">
        <div
          v-for="(item,index) in title"
          :key="item.id"
          class="flexitem"
          @click="itemclick(index)"
          :class="{active:currentIndex===index}"
        >{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    backbtn() {
      this.$router.back();
    },
    itemclick(index) {
      this.currentIndex = index;
      this.$emit('itemclick',index)
    }
  }
};
</script>

<style scoped>
.leftsign {
  width: 12px;
  height: 12px;
  border-top: 2px solid;
  border-left: 2px solid;
  transform: rotate(-45deg);
  position: absolute;
  /* left: 6%;
  top: 3%; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.centerblock {
  display: flex;
}
.flexitem {
  font-size: 15px;
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>