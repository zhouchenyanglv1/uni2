<template>
  <view>
    <my-search></my-search>
	  <view class="scroll-view-container">
		  <!-- 左侧 -->
		  <scroll-view scroll-y="true" class="scroll-view-left" :style="{height: wh+'px'}" >
		  		<view v-for="(item,index) in leftList" :key="index" class="scroll-item-left" :class="{active:active===index}" @click="clickLeftList(index)">{{item.cat_name}}</view>
		  </scroll-view>
		  <!-- 右侧 -->
		  <scroll-view scroll-y="true" class="scroll-view-right" :style="{height: wh+'px'}" :scroll-top="scrollTop" >
			  <view v-for="(item,index) in rightList" :key="index">
				  <!-- 分类标题 -->
				  <view class="right-title">
					  / {{item.cat_name}} /
				  </view>
				  <!-- 分类商品 -->
				  <view class="right-item-container">
					  <view class="right-item" v-for="(item2,i2) in item.children" :key="i2" @click="goToShopList(item2)">
					  	<image :src="item2.cat_icon" class="right-item-img"></image>
						<view class="right-item-name"> {{item2.cat_name}}</view>
					  </view>
				  </view>

			  </view>
		  </scroll-view>
	  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh:0,
		active:0,
		leftList:[],
		rightList:[],
		scrollTop:0
      };
    },
    onLoad(){
		const res =  uni.getSystemInfoSync()
		this.wh = res.windowHeight
		this.getList()
		  
	},
	methods:{
		async getList(){
			const {data}  = await uni.$http.get('/api/public/v1/categories')
			console.log(data);
			if(data.meta.status!==200) return uni.$showMsg()
			this.leftList = data.message
			this.rightList = this.leftList[0].children
		},
		clickLeftList(index){
			this.active = index
			this.rightList = this.leftList[index].children
			this.scrollTop = this.scrollTop === 0?1:0
			
		},
		goToShopList(item){
			console.log(item);
			uni.navigateTo({
				url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
			})
		}
	}
  }
  
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.scroll-view-left{
		width: 250rpx;
		.scroll-item-left{
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			background-color: #f7f7f7;
			position: relative;
			font-size: 12px;
			&.active{
				background-color: white;
				&::before{
					content: ' ';
					display: block;
					width: 3px;
					height: 60rpx;
					background-color: red;
					position: absolute;
					left: 0;
					top:50%;
					transform: translateY(-50%);
				}
			}
		}
	}
	.scroll-view-right{
		height:300rpx;
		.right-title{
 
			text-align: center;
			font-size: 18px;
			font-weight: 600;
			height: 100rpx;
			line-height: 100rpx;
			margin-top: 30rpx;
		}
		.right-item-container{
			display: flex;
			flex-wrap: wrap;
			
			
			.right-item{
				display: flex;
				width: 33.33%;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				margin-bottom: 20rpx;
				.right-item-img{
					width: 150rpx;
					height: 150rpx;
				}
				.right-item-name{
					text-align: center;
					font-size: 12px;
				}
			}
		}

	}
}
</style>
