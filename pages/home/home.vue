<template>
	<view>
    <my-search></my-search>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :circular="true" :duration="1000" :interval="2000">
			<navigator class="swiper-item" v-for="item in swiperList" :key="item.goods_id"
				:url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
				<swiper-item>
					<image :src="item.image_src"></image>
				</swiper-item>
			</navigator>
		</swiper>
		<!-- 导航栏 -->
		<view class="nav-bar">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="goods" v-for="(item,index) in goodsList" :key="index">
			<view class="goods-title">
				<image :src="item.floor_title.image_src"></image>
			</view>

			<view class="goods-list">
				<!-- 左侧大图 -->
				<view class="goods-item-left">
					<image :src="item.product_list[0].image_src" mode="widthFix" @click="goodsListHandler(item.product_list[0])"></image>
				</view>
				<!-- 右侧小图 -->
				<view class="goods-item-right">
					<view class="right-box">
						<view class="right-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2!==0"  @click="goodsListHandler(item2)">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image> 
						</view>
					</view>
				</view>
			</view>
  

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				goodsList: []
			};
		},
		methods: {
			async getSwiperList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (data.meta.status !== 200) {
					return uni.$showMsg('获取轮播图数据失败')
				}
				this.swiperList = data.message
			},


			async getNavList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (data.meta.status !== 200) {
					return uni.$showMsg('获取导航栏数据失败')
				}
				this.navList = data.message
			},


			async getGoodsList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (data.meta.status !== 200) {
					return uni.$showMsg('获取商品数据失败')
				}
				this.goodsList = data.message
			},

			// 导航栏点击跳转事件
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}

			},
			// 楼层商品点击跳转列表事件
			goodsListHandler(item){
				const url = item.navigator_url.split('?')[1]
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?'+url
				})
			}
		},
		onLoad() {
			this.getSwiperList(),
				this.getNavList(),
				this.getGoodsList()
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item {
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.nav-bar {
		display: flex;
		margin: 20rpx;

		.nav-item {
			display: flex;
			margin-bottom: 20rpx;
			flex-direction: column;
			width: 25%;
			height: 150rpx;
			justify-content: center;
			align-items: center;
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}

	.goods {
		display: flex;
		flex-direction: column;

		.goods-title {
			display: block;

			image {
				width: 100%;
				height: 60rpx;
			}

		}

		.goods-list {
			display: flex;
			width: 100%;
			.goods-item-left {
				margin: 1%;
				image{
					width: 232rpx;
				}
				
			}
			.goods-item-right{
				width: 100%;
				margin: 1%;
				.right-box{
					 display: flex;
					 flex-wrap: wrap;
					  justify-content: space-around;
					.right-item{
					 
					}
				}
			}


		}
	}
</style>
