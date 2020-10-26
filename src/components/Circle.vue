<template>
  <view class="mp-circle-container">
    <canvas
      class="mp-circle"
      :style="{ width: width + 'px', height: height + 'px' }"
      :canvas-id="'canvasId' + canvasId"
    ></canvas>
  </view>
</template>

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
  mounted() {
    this.drawCircle();
  },
  methods: {
    drawCircle() {
      // 1.根据canvas-id拿到canvas上下文
      const ctx = uni.createCanvasContext("canvasId" + this.canvasId, this);

      //   2.绘制背景的圆环
      // 设置颜色
      ctx.strokeStyle = this.backgroundColor;
      // 设置线宽
      ctx.lineWidth = this.lineWidth;

      //   绘制圆形
      ctx.arc(
        this.width / 2,
        this.height / 2,
        this.width / 2 - this.lineWidth,
        0,
        2 * Math.PI,
        false
      );

      ctx.stroke();

      //   这里才能完成绘制图形的功能
      ctx.draw();
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