<template>
	<view>
		<view class="login-box">
			<view class="image">
				<image src='../../static/tab_icons/my.png'></image>
			</view>
			<view class="button">
				<button type="warn" @click="getUserInfo">一键登录</button>
			</view>
			<text>登陆后尽享更多权益</text>
		</view>
		<view class="round-box">
			<view class="round"></view>
		</view>
	</view>
</template>

<script>
	import {mapMutations   } from 'vuex'
 	export default {
		name: "my-login",
 
		data() {
			return {

			};
		},
		methods: {
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
	.login-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 200rpx;
		background-color: #fafafa;
		overflow: hidden;
		height: 100%;
		position: relative;

		.image {
			display: flex;
			justify-content: center;
			border: 1px solid black;
			border-radius: 40px;
			padding: 10px;
			margin-bottom: 60rpx;

			image {
				width: 60px;
			 height: 60px;
			}
		}

		.button {
			width: 600rpx;

			button {
				border-radius: 50rpx;
			}
		}

		text {
			font-size: 26rpx;
			margin-top: 20rpx;
			color: #5a5a5a;
		}

	}

	.round-box {
		display: flex;
		width: 100%;
		height: 200px;
		justify-content: center;
		overflow: hidden;
		position: relative;
		background-color: #fafafa;

		.round {
			margin-top: 30rpx;
			width: 2000px;
			height: 2000px;
			background-color: white;
			border-radius: 1000px;
			position: absolute;
			top: 100rpx;


		}
	}
</style>
