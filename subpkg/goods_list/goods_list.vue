<template>
	<view>
		<view class="search-scroll"  >
			<view class="search-item-box" v-for="(item,index) in searchList" :key="index" @click="goToDetails(item)">
				<view class="search-image">
					<image class="search-image-big" :src="item.goods_big_logo" mode="widthFix"></image>
					<image class="search-image-small"></image>
				</view>
				<view class="search-item-contain">
					<view class="search-item-title">{{item.goods_name}}</view>
					<view class="search-item-price">￥ {{priceFilter(item.goods_price) }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchList: [],
				searchValue: '',
				page: {
					pagenum: 1,
					pagesize: 10
				},
				hw: 0,
				isFinished: false
			};
		},
		methods: {
			onReachBottom(){
				if (this.isFinished === true) {
					uni.hideLoading()
					uni.$showMsg('没有更多了...')
					return  
				}
				this.page.pagenum += 1
				this.getGoodsList()


			},
			priceFilter(price) {
				const newPrice = parseFloat(price).toFixed(2)
				return newPrice
			},
			async getGoodsList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/goods/search', {
					...this.searchValue,
					...this.page
				})
				if (data.meta.status !== 200) return uni.$showMsg()
				console.log(data.message);
				this.searchList.push(...data.message.goods)
				if (data.message.total === this.searchList.length) {
					this.isFinished = true
				}
			},
			goToDetails(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			}
		},

		onLoad: function(option) {
			const res = uni.getSystemInfoSync()
			this.wh = res.windowHeight
			this.searchValue = option
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.isFinished = false
			this.searchList = []
			this.page.pagenum = 1
			this.getGoodsList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},

	}
</script>

<style lang="scss">
	.search-scroll {
		.search-item-box {
			display: flex;
			height: 260rpx;
			border-top: 1px solid #f6f6f6;
			padding-top: 20rpx;

			.search-image {
				width: 30%;
				height: 100%;

				.search-image-big {
					width: 100%;
				}
			}

			.search-item-contain {
				padding-left: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.search-item-title {
					font-size: 26rpx;
					font-weight: 550;
				}

				.search-item-price {
					margin-bottom: 30rpx;
					color: red;
				}
			}
		}

		.search-item-box:last-child {
			border-bottom: 1px solid #f6f6f6;
		}
	}
</style>
