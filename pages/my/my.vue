<template>
  <view>
	<!-- 登录页面 -->
	<view v-if="token" >
		<my-userinfo></my-userinfo>
	</view>
  
  <!-- 未登录页面 -->
  <view v-else >
  	<my-login></my-login>
  </view>
  </view>
</template>

<script>
  import tabCart from '@/mixins/tabbar-cart-badge.js'
  import { mapState , mapMutations} from 'vuex'
  export default {
	mixins:[tabCart],
    computed:{
      ...mapState('m_user',['token'])
    },
    data() {
      return {

      };
    },
    methods:{
 
    }
  }
</script>

<style lang="scss">

</style>
