import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

 // 创建音频实例
const innerAudioContext = uni.createInnerAudioContext()
const store = new Vuex.Store({//全局变量定义

    state: {
		play_list:[],
		play_list_count:0,
		music_url:"",
		// 歌单内容
		music_message:[],
		music_loop:true,
		music_size:0,
		music_control:false,
		music_Alldt:1,
		music_dt:0,
		time:"",
    },

    mutations: {
		setplay_list(state,value){
			state.play_list= value;
			// console.log(state.play_list);
		},
		setplay_list_count(state,value){
			state.play_list_count = value;
			console.log(state.play_list_count);
		},
		setmusic_url(state,value){
			state.music_url = value;
		},
		setmusic_message(state,value){
			state.music_message = value;
		},
		setmusic_loop(state,value){
			state.music_loop = value;
		},
		setmusic_control(state,value){
			state.music_control = value;
		},
		setdt_music(state,value){
			state.music_dt = value;
			console.log('ok');
		},
		setmusic_Alldt(state,value){
			state.music_Alldt = value;
		}
    },
	
	actions:{
		getmusic_url(){
			uni.request({
				url:uni.getStorageSync('baseUrl')+'/song/url',
				data:{
					id:this.state.play_list[this.state.play_list_count].id
				},
				success: (res) => {
					console.log(res);
					this.commit('setmusic_url',res.data.data[0].url)
					// console.log(this.state.play_list[this.state.play_list_count].id)
					console.log(this.state.music_url);
				}
			})
		},
		
		getmusic_size(){
			uni.request({
				url:uni.getStorageSync('baseUrl')+'/song/url',
				data:{
					id:this.state.play_list[this.state.play_list_count].id
				},
				success: (res) => {
					console.log(res);
					this.commit('setmusic_url',res.data.data[0].url)
					console.log(this.state.play_list[this.state.play_list_count].id)
				}
			})
		},
		
		// 后台音乐播放器
		playmusic(){
			let that = this
			that.dispatch('music')
			that.dispatch('show')
			that.commit('setmusic_Alldt',that.state.music_message[that.state.play_list_count].dt)
			console.log(that.state.music_message[that.state.play_list_count].dt);
		},
		
		show(){
			this.state.time = setTimeout(() =>{
				this.commit('setdt_music',innerAudioContext.currentTime)
				this.dispatch('show')
			},1000)
			
			let that = this
			innerAudioContext.onEnded(() =>{
				clearInterval(that.state.time)
				console.log('结束');
				// this.state.play_list_count = this.state.play_list_count+1;
				// that.dispatch('getmusic_size')
				// let _this = that
				// setTimeout(() => {wwd
				// 	_this.dispatch('playmusic')
				// },100)
			})
		},
		
		music(){
			let that = this
			setTimeout(function (){
				if(that.state.music_url!=null || that.state.music_url.length()!=0){
					innerAudioContext.autoplay = true;
					innerAudioContext.src = that.state.music_url;
					innerAudioContext.onPlay(() => {
					  console.log('开始播放');
					});
					innerAudioContext.onError((res) => {
					  console.log(res.errMsg);
					  console.log(res.errCode);
					});
				}
			},1000)
		},
		
		Play(){
			innerAudioContext.play()
			innerAudioContext.onPlay(() => {
			  console.log('开始播放');
			});
		},
		Pause(){
			innerAudioContext.pause()
			innerAudioContext.onPause(() => {
				console.log('停止播放');
			})
		},
		// 销毁当前实例
		Stop(){
			innerAudioContext.stop()
		},
		// 换歌
		next_music(){
			let that = this
			innerAudioContext.onPlay(() => {
				that.dispatch('Stop')
				that.dispatch('music')
			})
		},
		// 暂停播放
		stop_play(){
			let that = this
			setTimeout(() => {
				if(that.state.music_control){
					that.dispatch('Play')
					that.dispatch('show')
				}
				if(!that.state.music_control){
					that.dispatch('Pause')
					clearInterval(that.state.time)
				}
			},100)
		},
	},
	
	getters:{
	}

})

export default store