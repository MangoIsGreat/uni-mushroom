<template></template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    canvasId: Number,
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },
    lineWidth: {
      type: Number,
      default: 5,
    },
    backgroundColor: {
      type: String,
      default: "#f3f3f3",
    },
    foregroundColor: {
      type: String,
      default: "#b4d66e",
    },
  },
});
</script>

<style scoped>
.mp-circle-container {
  position: relative;
}
.mp-circle {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
</style>