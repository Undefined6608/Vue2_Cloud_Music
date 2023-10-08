let that = this
const saveToken = uni.getStorageSync('first_falg');
if(saveToken){
	uni.reLaunch({
		url:'./pages/discover/discover'
	})
}