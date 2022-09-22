<template>
	<view>
		<view class="search-scroll">
			<uni-swipe-action class="swiper-action">
			<view class="search-item-box" v-for="(item,index) in searchList" :key="index" >			 
			 <uni-swipe-action-item class="swiper-action-item" :right-options="options" :left-options="options" @click="onClick"  > 
				<view class="search-image" @click="click(item)" >
					<radio :checked="item.goods_state" color="#ff0000" style="margin-left: 5rpx;"  v-if="showRadio" ></radio>
					<!-- 	<image class="search-image-big" :src="item.goods_small_logo" mode="widthFix"></image> -->
					<image class="search-image-small" :src="item.goods_small_logo" mode="widthFix"></image>
				</view>
				<view class="search-item-contain">
					<view class="search-item-title">{{item.goods_name}}</view>
					<view class="search-item-price-box">
						<view class="search-item-price">￥ {{priceFilter(item.goods_price) }}</view>
						<uni-number-box :value="item.goods_count" @change="clickValue(item.goods_id);changeValue()"   :min="1"  v-if="showNum" />
					</view>
				</view>	
			  </uni-swipe-action-item>
			</view>	
			</uni-swipe-action>
		</view>
	</view>
</template>

<script>

	export default {
		name: "item-list",
		data() {
			return {
				options:[
				        {
				            text: '取消',
				            style: {
				                backgroundColor: '#007aff'
				            }
				        }, {
				            text: '确认',
				            style: {
				                backgroundColor: '#dd524d'
				            }
				        }
				      ]
			};
		},
		props: {
			searchList: {
				type: Array,
				default: []
			},
			showRadio:{
				type:Boolean,
				default: false
			},
			showNum:{
				type:Boolean,
				default: false
			}
		},
		methods: {
			priceFilter(price) {
				const newPrice = parseFloat(price).toFixed(2)
				return newPrice
			},
			click(item){
				this.$emit('checkChange',item)
			},
			changeValue(e){
				 this.$emit('value-change',e)
			},
			clickValue(id){
				 this.$emit('value-change2',id)
			},
			onClick(e){
			      console.log('点击了'+(e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
			    }, 
			swipeChange(e,index){
			      console.log('当前状态：'+ e +'，下标：' + index)
			    }
			  
		}
	}
</script>

<style lang="scss">
	.search-scroll {
	   .swiper-action{
		   .search-item-box {
				overflow: hidden;
			   
			.swiper-action-item{
				display: flex;
				height: 200rpx;
				border-top: 1px solid #f6f6f6;
				padding-top: 20rpx;
			 
				.search-image {
					display: flex;
					width: 30%;
					justify-content: center;
					align-items: center;
						   
					.search-image-big {
						width: 100%;
					}
						   
					.search-image-small {
						width: 100%;
					}
						   
				}
						   
						   
				.search-item-contain {
					flex: 1;
					padding-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
						   
					.search-item-title {
						font-size: 26rpx;
					}
					.search-item-price-box{
						display: flex;
						justify-content: space-between;
						margin-bottom: 15rpx;
						.search-item-price {	
							color: red;
						}
					}
						   
				}
			}

		   }
	   }
		

		.search-item-box:last-child {
			border-bottom: 1px solid #f6f6f6;
		}

	}
.uni-swipe{
	.uni-swipe_box{
		.uni-swipe_text--center{
			display: flex;
		}
	}
}
</style>
