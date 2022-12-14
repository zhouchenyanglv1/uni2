export default{
	namespaced:true,
	
	state:()=>({
		address: JSON.parse(uni.getStorageSync('address')|| '{}'),
		token:uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}') 
	}),
	
	mutations:{
		saveAddress(state,object){
			state.address = object
			uni.setStorageSync('address',JSON.stringify(object))
		},
		saveUserInfo(state,object){
			state.userInfo = object
			uni.setStorageSync('userInfo',JSON.stringify(object))
		},
    saveToken(state,key){
      state.token = key
      uni.setStorageSync('token',key)
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