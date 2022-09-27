export default {
	namespaced: true,

	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
		checkAll: true
	}),

	mutations: {
		addToCart(state, goods) {
			const resFind = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!resFind) {
				state.cart.push(goods)
			} else {
				resFind.goods_count++
			}
		},
		saveCart(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		checkCartItem(state, id) {
			state.cart.forEach((item, index) => {
				if (item.goods_id === id) {
					item.goods_state = !item.goods_state

				}
			})
			this.commit('m_cart/saveCart')

		},
		valueCartItem(state, goods) {
			state.cart.forEach((item, index) => {
				if (item.goods_id === goods.id) {
					item.goods_count = goods.count

				}
			})
			this.commit('m_cart/saveCart')
		},
		delCartItem(state, id) {
			state.cart = state.cart.filter((item, index) => {
				return item.goods_id !== id
			})
			this.commit('m_cart/saveCart')
		},
		updateCheckedAll(state, newCheck) {
			state.cart.forEach(item => {
				item.goods_state = newCheck
			})
			state.checkAll = newCheck
		}
	},

	actions: {},

	getters: {
		total(state) {
			let count = 0
			const arr = state.cart.filter(item => item.goods_state === true)
			arr.forEach(item => count += item.goods_count)
			return count
		},
		priceTotal(state) {
			let price = 0
			const arr = state.cart.filter(item => item.goods_state === true)
			arr.forEach(item => price += item.goods_price * item.goods_count)
			return price
		},
		watchCheckAll(state){
			let check = true
			state.cart.forEach(item=>{
				if(item.goods_state === false){ return check = false }
			})
			return check 
		}

	}
}
