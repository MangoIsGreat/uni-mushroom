<template>
  <view>
    <text>课程详情 --- id is {{ id }}</text>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { fetch } from "../../utils/fetch";
export default Vue.extend({
  data() {
    return {
      id: null, // 课程Id
      course_detail: null, // 课程详情
    };
  },
  onLoad(options) {
    this.id = options.id;

    // 发送请求,获取课程详情数据
    this.getCourseDetailData();
  },
  methods: {
    async getCourseDetailData() {
      const result = await fetch({ url: `course/${this.id}` });

      if (result.data.status === 0) {
        this.course_detail = result.data.message;
      }
    },
  },
});
</script>