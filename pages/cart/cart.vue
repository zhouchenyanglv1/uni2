<template>
	<view>
		
		<!-- 购物车主体 -->
		<view class="cart-container" :style="{height: wh+'px'}" v-if="cart.length!==0">
			<!-- 结算栏 -->
			<view class="check-box">
				<view class="left">
					<radio color="red" :checked="watchCheckAll" @click="clickCheckAll"></radio>
					<view>全选</view>
				</view>
				<view class="center">
					<view>合计:￥</view>
					<view>{{priceTotal}}</view>
				</view>
				<view class="right">
					<view class="pay" @click="pay">结算({{total}})</view>
				</view>
			</view>
			<!-- 地址部分 -->
			<my-address></my-address>
			<!-- 头部标题 -->
			<view class="title">
				<uni-icons type="shop" size="20"></uni-icons>
				<view class="title-name">购物车</view>
			</view>
			<!-- 购物车列表 -->
			<view class="list-box">
				<item-list :searchList=cart :showRadio="true" :showNum="true" @check-change="radioHandler"
					@value-change2="valueHandler2" @value-change="valueHandler" @del-item="delItem"></item-list>
			</view>

		</view>
		<!-- 购物车空的页面 -->
		<view class="empty-cart" :style="{height: wh+'px'}" v-else >
			<image src="../../static/empty-cart.jpg" @click="goToHome"></image>
		</view>
	</view>
</template>

<script>
	import tabCart from '@/mixins/tabbar-cart-badge.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		mixins: [tabCart],
		computed: {
			...mapState('m_cart', ['cart']),
			...mapState('m_user',['token']),
			...mapGetters('m_cart', ['priceTotal', 'total', 'watchCheckAll']),
			...mapGetters('m_user',['addressStr'])
		},
		data() {
			return {
				getId: 0,
				wh:0,
        second:3,
        timer:null
			};
		},
		onLoad(){
			const res =  uni.getSystemInfoSync()
			this.wh = res.windowHeight
		},
		methods: {
			...mapMutations('m_cart', ['checkCartItem', 'saveCart', 'valueCartItem', 'delCartItem', 'updateCheckedAll']),
			radioHandler(item) {
				this.checkCartItem(item.goods_id)

			},
			valueHandler(e) {
				const goods = {
					id: this.getId,
					count: e
				}
				this.valueCartItem(goods)
				this.setBadge()


			},
			valueHandler2(id) {
				this.getId = id
			},

			delItem() {
				const id = this.getId
				this.delCartItem(id)

			},
			clickCheckAll() {
				if (this.watchCheckAll === true) {
					this.updateCheckedAll(false)
				} else {
					this.updateCheckedAll(true)
				}
			},
			goToHome(){
				uni.switchTab({
					url:'/pages/home/home'
				})
			},
			pay(){
				if(this.total===0) return uni.$showMsg('请勾选要结算的商品')
				if(!this.addressStr) return uni.$showMsg('请选择送货地址')
				if(!this.token)  {
          this.delayToLogin()
          return
        } 
        this.payOrder()
				
			},
     async payOrder(){
        const order = {
          order_price: 0.01,
          consignee_addr:  this.addressStr,
          goods: this.cart.filter(item=>item.goods_state).map(item=>({ goods_id:item.goods_id,  goods_number:item.goods_count , goods_price:item.goods_price}))
        }
        const res = await uni.$http.post('/api/public/v1/my/orders/create',order)
        if(res.statusCode !== 200) return uni.$showMsg('创建支付订单失败,请重试')
        console.log(res.data.message.order_number);
        const payId = {order_number:res.data.message.order_number }
        const res2 = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',payId)
        if(res2.statusCode !==200) return uni.$showMsg('创建预付订单失败,请重试')
        console.log(res2.data.message.pay);
        const payInfo = res2.data.message.pay
        const  [err ,res3] = await uni.requestPayment(payInfo)
        if(err) return uni.$showMsg('订单未支付')
        console.log(res3);
},
      showTips(n){
        uni.showToast({
          title:'请登录再结算'+n+'秒后将自动跳转',
          icon:'none',
          mask:true,
          duration:1500
        })
      },
      delayToLogin(){
        this.showTips(this.second)
       this.timer =  setInterval(()=>{
            if(this.second<=1){
              clearInterval(this.timer)
              uni.switchTab({
                url:'/pages/my/my',
              })
              this.second = 3
              return
            }
            this.second --
            this.showTips(this.second)
        },1000)
      }
		}

	}
</script>

<style lang="scss">
	.cart-container {

		.title {
			display: flex;
			align-items: center;
			vertical-align: middle;

			.title-name {
				margin-left: 20rpx;
				font-size: 30rpx;
			}
		}

		.list-box {
			padding-bottom: 100rpx;
		}

		.check-box {
			position: fixed;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			width: 100%;
			border-top: 1px solid #f6f6f6;
			bottom:0rpx;
			left: 0;
			z-index: 999;
			background-color: white;
			.left {
				display: flex;
			}

			.center {
				display: flex;
				color: red;
			}

			.right {
				width: 25%;
				height: 100%;

				.pay {
					height: 99%;
					background-color: #ff0000;
					border-radius: 2px;
					color: white;
					font-size: 36rpx;
					font-weight: 500;
					text-align: center;
					line-height: 100rpx;
				}
			}
		}
	}

 
	.empty-cart{
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 360rpx;
			height: 300rpx;
		}
	}
</style>
