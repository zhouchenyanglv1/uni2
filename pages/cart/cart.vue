<template>
	<view>
		<!-- 地址部分 -->
		<my-address></my-address>
		<!-- 购物车主体 -->
		<view class="cart-container">
			<!-- 头部标题 -->
			<view class="title">
				<uni-icons type="shop" size="20"></uni-icons>
				<view class="title-name">购物车</view>
			</view>
			<!-- 购物车列表 -->
			<item-list :searchList = cart :showRadio="true"  :showNum="true"   @check-change="radioHandler"  @value-change2="valueHandler2"  @value-change="valueHandler" @del-item = "delItem" ></item-list>
		</view>
	</view>
</template>

<script>
	import tabCart from '@/mixins/tabbar-cart-badge.js'
	import { mapMutations } from 'vuex'
	import {
		mapState
	} from 'vuex'
	export default {
		mixins: [tabCart],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				getId:0
			};
		},
		methods:{
		    ...mapMutations('m_cart',['checkCartItem','saveCart','valueCartItem','delCartItem']),
			radioHandler(item){
				this.checkCartItem(item.goods_id)
			 
			},
			valueHandler(e){
				const goods = {id:this.getId,count:e}
				this.valueCartItem(goods)
				this.setBadge() 
 
				 
			},
			valueHandler2(id){			 
				this.getId = id
			},
      delItem(){
        const id = this.getId
        this.delCartItem(id)
        
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
		.list{
			.item{
				display: flex;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				border-top: 1px solid #f7f7f7;
				.small-image{
					width: 100px;
				}
				.item-contain{
					display: flex;
					width: 100%;
					flex-direction: column;
					justify-content: space-between;
					.price-count{
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}
	}
</style>
