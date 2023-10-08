<template>
	<view v-show="play_list[0] != undefined && play_list.length > 0" class="play_music">
		<img :src="music_message[play_list_count].al.picUrl" alt="error"  @click="go()">
		<view class="title">
			{{music_message[play_list_count].al.name}}--{{music_message[play_list_count].ar[0].name}}
		</view>
		<u-line-progress class="jdt" :percentage="(music_dt/music_Alldt*100000).toFixed(1)" activeColor="#ff0000"></u-line-progress>
		<view class="control">
			<img src="@/static/music_play/sys-black.png" alt="error">
			<img src="@/static/music_play/bf-black.png" v-show="!music_control" alt="error" @click='zt_bo_return()'>
			<img src="@/static/music_play/zt-black.png" v-show="music_control" alt="error" @click='zt_bo_return()'>
			<img src="@/static/music_play/xys-black.png" alt="error">
		</view>
	</view>
</template>

<script>
	import{mapState} from 'vuex'
	export default {
		name:"play_music",
		data() {
			return {
				
			};
		},
		methods:{
			go(){
				uni.navigateTo({
					url:'/pages/music/music',
				})
			},
			zt_bo_return(){
				this.$store.commit('setmusic_control',!this.music_control)
				this.$store.dispatch('stop_play')
			},
		},
		computed:mapState(['play_list','play_list_count','music_message','music_control','music_dt','music_Alldt']),
	}
</script>

<style lang="less" scoped>
	.play_music{
		width: 100vw;
		height: 7vh;
		position: fixed;
		bottom: 7vh;
		background-color: #eeeeef;
		display: flex;
		
		.title{
			position: absolute;
			left: 10vh;
		}
		
		img{
			margin-top: 1vh;
			margin-left: 1vh;
			width: 5vh;
			height: 5vh;
			border-radius: 100%;
		}
		
		.jdt{
			margin-top: 5vh;
		}
		
		.control{
			img{
				margin-top: 1vh;
				margin-left: 1vh;
				width: 5vh;
				height: 5vh;
			}
		}
	}
</style>