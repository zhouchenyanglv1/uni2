<template>
	<view>
		<view class="login-box">
			<view class="image">
				<image src='../../static/tab_icons/my.png'></image>
			</view>
			<view class="button">
				<button type="warn" @click="login">一键登录</button> 
			</view>
			<text>登陆后尽享更多权益</text>
			<view class="round"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
		async login(){
				const res = await uni.login()
				console.log(res);
			}
		}
	}
</script>

<style lang="scss">
.login-box{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 200rpx;
	background-color: #fafafa;
	overflow: hidden;
	.image{
		display: flex;
		justify-content: center;
		border: 1px solid black;
		border-radius: 40px;
		padding: 10px;
		margin-bottom: 60rpx;
		image{
			 width: 60px;
			 height: 60px;
		}
	}
	.button{
		width: 600rpx;
		button{
			border-radius: 50rpx;
		}
	}
	text{
		font-size: 26rpx;
		margin-top: 20rpx;
		color: #5a5a5a;
	}
	.round{
		margin-top: 30rpx;
		width: 2000px;
		height: 2000px;
		background-color: white;
		border-radius: 1000px;
	}
}
</style>