<template>
  <view>
    <!-- 未登录页面 -->
	<view v-if="!token">
		<my-login></my-login>
	</view>
	<!-- 登录页面 -->
	<view v-else>
		<my-userinfo></my-userinfo>
	</view>
  </view>
</template>

<script>
  import tabCart from '@/mixins/tabbar-cart-badge.js'
  import { mapState } from 'vuex'
  export default {
	mixins:[tabCart],
    data() {
      return {
        ...mapState('m_user',['token'])
      };
    }
  }
</script>

<style lang="scss">

</style>
