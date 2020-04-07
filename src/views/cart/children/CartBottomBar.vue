<template>
  <div id="CartBottomBar">
    <div class="selectAll">
      <CheckButton class="checkbtn" :checked="isSelectAll" @click.native="checkAll"></CheckButton>
      <span>全选</span>
    </div>
    <div class="cartMoney">合计:¥{{totalprice}}</div>
    <div class="calu" @click="calu">
      <span>去计算({{getLength}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";

import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  methods: {
    // 点击全选按钮
    checkAll() {
      // 利用计算属性
      if (this.isSelectAll) {
        this.isSelectAll = !this.isSelectAll;
        // this.getCartList.map(item => (item.checked = false));
        this.getCartList.forEach(item => (item.checked = false));
      } else {
        this.isSelectAll = !this.isSelectAll;
        this.getCartList.forEach(item => (item.checked = true));
      }
      //  this.getCartList.forEach(item => (item.checked = !this.isSelectAll));
    },
    calu(){
      if(this.getLength===0){
        this.$toast.show("未选中商品")
      }
    }
  },
  computed: {
    // 映射
    ...mapGetters(["getCartList", "getLength"]),
    // 选中的item的数量
    getLength() {
      return this.getCartList.filter(item => item.checked).length;
    },
    // 购物车列表价格
    totalprice() {
      return this.getCartList
        .filter(item => item.checked)
        .reduce((pre, item) => pre + item.price * item.count, 0)
        .toFixed(2);
    },
    // 全选按钮状态改变
    isSelectAll() {
        // 根据不选中的item的数量决定状态
      if (this.getLength === 0) {
        return false;
      } else {
        return !this.getCartList.filter(item => !item.checked).length;
        //  return !this.getCartList.find(item =>!item.checked)
      }
    }
  }
};
</script>

<style scoped>
#CartBottomBar {
  display: flex;

  height: 40px;
  line-height: 40px;
  /* width: 100%; */
  background: #eee;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
}
.selectAll {
  width: 20%;
  display: flex;
  justify-content: center;
  /* padding-top: 10px; */
  align-items: center;
  top: 0;
  bottom: 0;
}
.selectAll .checkbtn {
  /*line-height会继承，所以设为一半 */
  line-height: 20px;
  margin-right: 5px;
}
.cartMoney {
  margin-left: 15px;
}
.calu {
  position: absolute;
  background: #ff5200;
  color: #fff;
  width: 90px;
  text-align: center;
  right: 0;
  font-size: 13px;
}
</style>