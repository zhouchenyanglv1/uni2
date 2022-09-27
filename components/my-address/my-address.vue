<template>
  <view>
    <!-- 选择地址页面 -->
    <view class="choose-address-box" v-if="JSON.stringify(address)==='{}'">
      <button class="choose-address-button" @click="chooseAddress">请选择收货地址</button>
    </view>
    <!-- 地址渲染页面 -->
    <view class="address-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="name">姓名: {{address.userName}}</view>
        <view class="phone-arrow">
          <view class="phone">电话:{{address.telNumber}}</view>
          <uni-icons type="right" size="16"></uni-icons>
        </view>

      </view>
      <view class="row2">
        <view class="address-left">地址:</view>
        <view class="address-right">{{addressStr}}</view>
      </view>
    </view>

    <!-- 彩条 -->
    <image src="../../static/cart_border@2x.png" style="height:10rpx;width: 100%;"></image>
  </view>
</template>

<script>
import  {mapMutations,mapState ,mapGetters}   from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
	
         
      };
    },
    methods:{
	 ...mapMutations('m_user',['saveAddress']),
     async chooseAddress(){
        const [err,res] = await uni.chooseAddress().catch(err=>err)
        if(err === null && res.errMsg === 'chooseAddress:ok'){
			this.saveAddress(res)
			console.log(this.address);
		}
      }
    },
	computed:{
	    ...mapState('m_user',['address']),
		...mapGetters('m_user',['addressStr'])
	}
  }
</script>

<style lang="scss">
  .choose-address-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180rpx;

    .choose-address-button {
      background-color: #00aa7f;
      font-size: 28rpx;
      color: white;
      font-weight: 500;
    }
  }
  .address-box{
     
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 32rpx;
    margin: 20rpx;
    .row1{
      display: flex;
      justify-content: space-between;
      .phone-arrow{
        display: flex;
      }
    }
    .row2{
      display: flex;
      margin-top: 40rpx;
 
      .address-left{
        white-space: nowrap;
      }
      .address-right{
        margin-left: 10rpx;
      }
    }
  }
</style>
