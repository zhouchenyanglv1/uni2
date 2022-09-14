<template>
  <view class="search-container">
     <view class="search-item" @click="goToSearch">
       <icon type="search" size="12" color="#000000"></icon>
       <text class="search-text">搜索</text>
       </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods:{
      goToSearch(){
        uni.navigateTo({
          url:'/subpkg/my-search/my-search'
        })
      }
    }
  }
</script>

<style lang="scss">
.search-container{
  display: flex;
  justify-content: center;
  background-color: red;
  height: 60rpx;
  padding: 10rpx;
  text-align: center;
  line-height: 60rpx;
  .search-item{
    display: block;
    background: white;
    width: 90%;
    text-align: center;
    border-radius: 30rpx;
    text-align: center;
    line-height: 60rpx; 
    .search-text{
       margin-left: 20rpx;
    }
  }
}
</style>