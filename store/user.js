export default{
	namespaced:true,
	
	state:()=>({
		address: JSON.parse(uni.getStorageSync('address')|| '{}'),
		token:''
	}),
	
	mutations:{
		saveAddress(state,object){
			state.address = object
			uni.setStorageSync('address',JSON.stringify(object))
		}
		
	},
	
	actions:{},
	
	getters:{
		addressStr(state){
			if(!state.address.provinceName&&!state.address.cityName ) return ''
			if(!state.address.provinceName&&state.address.cityName ) return  state.address.cityName+state.address.countyName+state.address.detailInfo
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
			}
	}
}