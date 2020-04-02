<template>
  <div class="toast" v-show="isShow">
    <span class="text">{{message}}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    // ES6可以直接给参数设置默认值
    show(message, duration=2000) {
      this.isShow = true;
      this.message = message;
      // 显示时间
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  z-index: 10;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* text-align: center; */
  width: 58%;
  height: 6%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 6%;
}
</style>