<template>
	<view>
		<text>user</text>
	</view>
</template>

<script>
		import {mapMutations   } from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['saveUserInfo']),
		getUserInfo() {
			uni.getUserProfile({
				desc: '你的授权信息',
				success: (res) => {
					// 将信息存到 vuex 中
					console.log(res);
					this.saveUserInfo(res.userInfo)	
				},
				fail: (res) => {
					return uni.$showMsg('您取消了登录授权')
				}
			})
		}
	  }
	}
</script>

<style lang="scss">

</style>