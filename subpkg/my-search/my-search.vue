<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search-box">
			<uni-search-bar placeholder="请输入搜索内容" focus v-model="searchValue"  @input="input"
				@cancel="cancel" @clear="clear" radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 历史记录 -->
		<view class="history-title-box" v-if="searchValue.length===0 && historyList.length>=1">
			<view class="history-title" >历史记录</view>
			<uni-icons type="trash" size="20" @click="delHistory"></uni-icons>
		</view>
		<view class="history" v-if="searchValue.length===0">
			<view class="history-item" v-for="(item,index) in historyList" :key="index" @click="inputHistory(item)">
				{{item}}
			</view>
		</view>
		<!-- 搜索列表 -->
		<scroll-view class="search-list" @scrolltolower="refresh" scroll-y="true" :style="{height: wh+'px'}">
			<view class="search-item" v-for="(item,index) in searchList" :key="index" @click="goToGoodsDetail(item)">
				<text class="search-text">{{item.goods_name}}</text>
				<uni-icons type="forward" size="20" class="search-icon"></uni-icons>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				page: {
					pagenum: 1,
					pagesize: 20
				},
				timer: null,
				searchList: [],
				wh: 0,
				historyList: []
			};
		},
		methods: {
 
			input() {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.getList()
				}, 500)
			},
			clear() {
				this.page.pagenum = 1
				this.searchList = []
			},
			async getList() {
				if (this.searchValue.length === 0) {
					this.searchList = []
					return
				}
				const {
					data
				} = await uni.$http.get('/api/public/v1/goods/search', {
					query: this.searchValue,
					...this.page
				})
				if (data.meta.status !== 200) {
					uni.$showMsg()
				}



				this.searchList = data.message.goods
				this.historyList.forEach(item => {
					if (item === this.searchValue) {
						const index = this.historyList.findIndex(item => item === this.searchValue)
						this.historyList.splice(index, 1)
					}
				})
				this.historyList.unshift(this.searchValue)
				uni.setStorageSync('historyList',JSON.stringify(this.historyList))

			},
			async refresh() {
				this.page.pagenum += 1
				const {
					data
				} = await uni.$http.get('/api/public/v1/goods/search', {
					query: this.searchValue,
					...this.page
				})
				if (data.meta.status !== 200) {
					uni.$showMsg()
				}
				this.searchList.push(...data.message.goods)
				
 
			},
			goToGoodsDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			inputHistory(item) {
				this.searchValue = item
			},
			delHistory(){
				this.historyList = []
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync()
			this.wh = res.windowHeight
			this.historyList = JSON.parse(uni.getStorageSync('historyList') || '[]' )
		}
	}
</script>

<style lang="scss">
	.search-box {
		width: 100%;
		position: fixed;
		top: 0;
		background-color: #ff0000;
		z-index: 100;

	}
.history-title-box{
	display: flex;
	justify-content: space-between;
	margin-top: 120rpx;
	.history-title {
		display: block;
		margin-left: 30rpx;
		font-size: 32rpx;
	}
}
	

	.history {
		display: flex;
		padding: 30rpx;
		flex-wrap: wrap;

		.history-item {
			font-size: 26rpx;
			margin: 10rpx 16rpx;
			padding: 10rpx 16rpx;
			background-color: #f6f6f6;
		}
	}

	.search-list {
		margin-top: 120rpx;

		.search-item {
			position: relative;
			width: 100%;
			display: flex;
			line-height: 80rpx;
			height: 80rpx;
			border-top: 1px solid #d9d9d9;

			.search-icon {
				position: absolute;
				right: 0;
			}

			.search-text {
				width: 95%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.search-item:last-child {
			border-bottom: 1px solid #d9d9d9;
		}
	}
</style>
