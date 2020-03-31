<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {};
  },
  components: {
    // TabBarItem
  },
  methods: {}
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* flex-flow: nowrap; */
  background: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
}
</style>