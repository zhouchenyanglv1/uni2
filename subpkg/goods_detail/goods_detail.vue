<template>
	<view>
		<!-- 轮播图 -->
		<swiper class="swiper-box" :indicator-dots="true" :duration="1000" :circular="true" :interval="2000">
			<swiper-item class="swiper-item" v-for="(item,index) in goodsInfo.pics" :key="index"
				@click="preview(index)">
				<image :src="item.pics_big" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<!-- 价格 -->
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<!-- 标题以及收藏 -->
			<view class="title-box">
				<view class="title">{{goodsInfo.goods_name}}</view>
				<view class="collect">
					<uni-icons type="star" size="26" class="icons"></uni-icons>
					<view class="text">收藏</view>
				</view>
			</view>
			<!-- 商品详情 -->
			<view class="goods-contain">
				<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
			</view>
			<!-- 底部导航 -->
			<view class="goods-buttom-nav">
				<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
					@buttonClick="buttonClick" />
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState , mapMutations , mapGetters} from 'vuex'
	export default {
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['total'])
		},
		data() {
			return {
				goodsInfo: {},
				goodsId: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		methods: {
			...mapMutations('m_cart',['addToCart','saveCart']),
			async getGoodsInfo() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					...this.goodsId
				})
				if (data.meta.status !== 200) return uni.$showMsg()
				const res = data.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
				this.goodsInfo = data.message
				this.goodsInfo.goods_introduce = res


			},
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goodsInfo.pics.map(item => item.pics_big)
				})
			},

			onClick(e) {
				if(e.content.text==='购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if(e.content.text==='加入购物车'){
					const goods = {
						goods_id: this.goodsInfo.goods_id,
						goods_name: this.goodsInfo.goods_name,
						goods_price: this.goodsInfo.goods_price,
						goods_count: 1 ,
						goods_small_logo: this.goodsInfo.goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
					this.saveCart()
				}
				
			}

		},
		onLoad(option) {
			this.goodsId = option
			this.getGoodsInfo()
		},
		watch:{
		   total:{
			  handler(newVal){
				  const res = this.options.find(item=>item.text==='购物车')
				   if(res){
				  	 res.info = newVal
				   }
		   },
		immediate:true 
		} 
	   }
	}
</script>

<style lang="scss">
	.swiper-box {
		height: 750rpx;

		.swiper-item {
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.goods-info-box {
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-bottom: 50px;

		.price {
			display: block;
			font-size: 42rpx;
			font-weight: 520;
			color: red;
			margin: 30rpx 0 0 10rpx;
		}

		.title-box {
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;

			.title {

				font-size: 26rpx;
				height: 80rpx;
				overflow: hidden;

			}

			.collect {
				display: flex;
				flex-direction: column;
				width: 60px;
				align-items: center;
				text-align: center;
				border-left: 1px solid #f6f6f6;
				padding: 0 30rpx;
				color: #222222;

				.icons {
					display: flex;
					align-items: center;
					text-align: center;

				}

				.text {
					font-size: 22rpx;

				}
			}


		}

		.goods-contain {
			width: 100%;
			margin-top: 30rpx;

			image: {
				width: 100%;
			}
		}

		.goods-buttom-nav {
			display: flex;
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
