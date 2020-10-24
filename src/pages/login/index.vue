<template>
    <view>
        <text>登陆页面----{{msg}}</text>
    </view>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
    data() {
        return {
            msg: "login"
        }
    }
})
</script>