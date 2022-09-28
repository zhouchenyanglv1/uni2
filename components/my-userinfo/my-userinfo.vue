<template>
	<view >
    <view class="page-box">
          <view class="profile-image">
             <image :src=userInfo.avatarUrl></image>
             <text>用户名</text>
          </view>
          <view class="contain-box">
            <view class="tab1">
              <view class="tab-item">
                 <view>收藏的店铺</view>
                 <view>333</view>
              </view>
              <view class="tab-item">
                 <view>收藏的商品</view>
                 <view>373</view>
              </view>
              <view class="tab-item">
                 <view>关注的商品</view>
                 <view>33</view>
              </view>
              <view class="tab-item">
                 <view>足迹</view>
                 <view>313</view>
              </view>
            </view>
            <view class="tab2">
              <view class="title">我的订单</view>
              <view class="tab1">
                <view class="tab-item">
                  <image src='../../static/my-icons/icon1.png'></image>
                  <view>待付款</view>
                </view>
                <view class="tab-item">
                  <image src='../../static/my-icons/icon2.png'></image>
                  <view>待收货</view>
                </view>
                <view class="tab-item">
                  <image src='../../static/my-icons/icon3.png'></image>
                  <view>退款/退货</view>
                </view>
                <view class="tab-item">
                  <image src='../../static/my-icons/icon4.png'></image>
                  <view>全部订单</view>
                </view>
              </view>
            </view>
            <view class="tab3">
              <view class="line-tab">
                <view>收货地址</view>
                <uni-icons type="right" size="16"></uni-icons>
              </view>
              <view class="line-tab">
                <view>联系客服</view>
                <uni-icons type="right" size="16"></uni-icons>
              </view>
              <view class="line-tab" @click="logout">
                <view >退出登录</view>
                <uni-icons type="right" size="16"></uni-icons>
              </view>
            </view>
          </view>
    </view>

	</view>
</template>

<script>
		import {mapMutations  ,mapState } from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
    computed:{
      ...mapState('m_user',['userInfo'])
    },
    onLoad(){

    },
		methods:{
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
         }.bind(this)
       })
     },
	  }
	}
</script>

<style lang="scss">
 .page-box{
   display: flex;
   flex-direction: column;
   background-color: #f6f6f6;
   height: 1110rpx;
   position: relative;
   .profile-image{
      height: 400rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: red;
      image{
        width: 200rpx;
        height: 200rpx;
        border-radius: 100rpx;
        border: 1px solid black;
        background-color: white;
        margin-bottom: 20rpx;
      }
   }
   .contain-box{
      margin: 0  5%  20rpx 5%;
      position: absolute;
      top: 380rpx;
      left: 0;
      width: 90%;
     .tab1{
        display:flex;
        justify-content: space-around;
        background-color: white;
        padding: 12rpx 0;
        .tab-item{
          display: flex;
          align-items: center;
          flex-direction: column;
          image{
            width: 100rpx;
            height: 100rpx;
          }
        }
     }
     .tab2{
        display: flex;
        flex-direction: column;
        margin-top: 30rpx;
        background-color: white;
        padding: 12rpx 0;
        .title{
           margin-bottom: 10rpx;
           padding-left: 12rpx;
        }
     }
     .tab3{
       width: 100%;
       margin-top: 30rpx;
       background-color: white;
       padding: 12rpx 0;
        .line-tab{
          display: flex;
          justify-content: space-between;
          padding: 12rpx 12rpx;
          align-items: center;
          
          
        }
       
     }
   }
 }
</style>