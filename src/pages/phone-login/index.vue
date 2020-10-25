<template>
  <view class="phone-login-container">
    <text class="phone-validate">手机号验证</text>
    <text class="subtitle">用于即时获取课程最新信息</text>
    <view class="content">
      <input
        class="phone"
        v-model="phone"
        placeholder="请输入您的手机号"
        type="number"
      />
      <view
        @click="getVcode"
        class="get_vcode"
        :style="{ color: isCountDown ? '#a8a8a8' : 'black' }"
        >{{ tipName }}</view
      >
      <input
        class="vcode"
        v-model="vcode"
        placeholder="请输入验证码"
        type="number"
      />
    </view>
    <view class="phone-login">
      <image
        @click="phoneLogin"
        src="/static/images/phone_login@2x.png"
        alt=""
      />
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { fetch } from "../../utils/fetch";
export default Vue.extend({
  data() {
    return {
      phone: "15179742801",
      vcode: "",
      tipName: "获取验证码",
      count: 10, // 倒计时秒数
      isCountDown: false, // 是否正在倒计时
      timer: -1, // 计时器
    };
  },
  methods: {
    async getVcode() {
      //  1.非空和正则校验
      if (this.phone.trim().length === 0) {
        uni.showToast({
          title: "手机号不能为空",
          icon: "none",
          duration: 500,
        });

        return;
      }

      var reg = /^1[3456789][0-9]{9}$/;
      if (!reg.test(this.phone)) {
        uni.showToast({
          title: "手机号不合法",
          icon: "none",
          duration: 500,
        });

        return;
      }

      //   2、倒计时
      //   如果上一次正在倒计时没有结束的话，则直接返回
      if (this.isCountDown) return;

      this.tipName = `${this.count}`;
      this.isCountDown = true; // 开始倒计时

      this.timer = setInterval(() => {
        if (this.count <= 1) {
          clearInterval(this.timer);
          this.count = 10;
          this.isCountDown = false;
          this.tipName = "获取验证码";

          return;
        }

        this.count--;
        this.tipName = `${this.count}`;
      }, 1000);

      //   3.发送请求获取验证码
      const result = await fetch({
        url: "user/vcode",
        data: {
          phone: this.phone,
        },
        tips: "获取验证码",
        isNeedAuth: false,
      });

      if (result.data.status === 0) {
        uni.showToast({
          title: result.data.vcode + "",
          icon: "none",
          duration: 1000,
        });
      }
    },
    async phoneLogin() {
      const result = await fetch({
        url: "user/login",
        method: "POST",
        data: {
          phone: this.phone,
          vcode: this.vcode,
        },
        tips: "手机号登录中...",
        isNeedAuth: false,
      });

      if (result.data.status === 0) {
        //   1、提示
        uni.showToast({
          title: result.data.message,
          icon: "none",
          duration: 1000,
        });

        // 2、保存Token到本地
        uni.setStorageSync("my_token", result.data.token);

        // 3、跳转到首页
        uni.reLaunch({
          url: "/pages/home/index",
        });
      } else {
        uni.showToast({
          title: result.data.message,
          icon: "none",
          duration: 1000,
        });
      }
    },
  },
});
</script>

<style lang="less" scoped>
.phone-login-container {
  padding: 20rpx 68rpx;
}

.phone-login-container .phone-validate {
  margin-top: 150rpx;
  color: #393939;
  font-size: 40px;
}

.phone-login-container .subtitle {
  margin-top: 30rpx;
  color: #a8a8a8;
  font-size: 30rpx;
  display: inline-block;
}

.phone-login-container .content {
  margin-top: 150rpx;
  height: 250rpx;
  position: relative;
}

.phone-login-container .content .phone {
  height: 100rpx;
  font-size: 15px;
  position: relative;
}

.phone-login-container .content .get_vcode {
  position: absolute;
  right: 0;
  top: 20rpx;
  width: 164rpx;
  height: 56rpx;
  text-align: center;
  line-height: 56rpx;
  font-size: 24rpx;
  color: #a8a8a8;
  border: 1px solid rgba(168, 168, 168, 1);
  border-radius: 20px;
  z-index: 2;
}

.phone-login-container .content .vcode {
  margin-top: 30px;
  height: 100rpx;
  font-size: 15px;
  position: relative;
}

.phone-login-container .content .vcode::after {
  content: "";
  position: absolute;
  background-color: #e9e9e9;
  left: 0;
  right: 0;
  height: 1px;
  bottom: 1px;
}

.phone-login-container .content .phone::after {
  content: "";
  position: absolute;
  background-color: #e9e9e9;
  left: 0;
  right: 0;
  height: 1px;
  bottom: 1px;
}

.phone-login-container .phone-login {
  margin-top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-login-container .phone-login image {
  width: 568rpx;
  height: 98rpx;
}
</style>