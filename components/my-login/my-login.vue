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
			...mapMutations('m_user',['saveUserInfo','saveToken','saveAddress']),
			getUserInfo() {
				uni.getUserProfile({
					desc: '你的授权信息',
					success: (res) => {
						// 将信息存到 vuex 中
						 console.log(res);
					     this.saveUserInfo(res.userInfo)	
               this.getToken(res)
					},
					fail: (res) => {
						return uni.$showMsg('您取消了登录授权')
					}
				})
			},
     async getToken(info){
       let query = {}
       const  [err,res] =await uni.login().catch(err=>err)
        if(err || res.errMsg!=='login:ok') return uni.$showMsg('登录失败!')
           query = {
             encryptedData: info.encryptedData,
             rawData:info.rawData,
             iv:info.iv,
             signature:info.signature,
             code:res.code
          }
       console.log(query);
       this.getRealInfo(query)
     },
     async getRealInfo(query){
        const {data} = await uni.$http.get('/api/public/v1/users/wxlogin',query)
        console.log(data);
        if(data.meta.status===404){
          const key = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
          this.saveToken( key )
          uni.$showMsg('登录成功')
        }
     },
    logout(){
       uni.showModal({
        title:'提示',
        content:'确定退出吗?',
        success: function(res){
          if(res.cancel){
             uni.$showMsg('退出操作已取消')
          }
          if(res.confirm){
              this.saveAddress({})
              this.saveToken('')
              this.saveUserInfo({})
              uni.$showMsg('您已成功退出')
          }     
        }
      })
    },
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
