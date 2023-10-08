<template>
	<view class="music">
		<view class="music_play">
			<view class="line">
				<u-line-progress class="jdt" :percentage="(music_dt/music_Alldt*100000).toFixed(1)" activeColor="#ff0000"></u-line-progress>
			</view>
			 <view class="control">
				<img src="@/static/music_play/sys-black.png" alt="error">
				<img src="@/static/music_play/bf-black.png" v-show="!music_control" alt="error" @click='zt_bo_return()'>
				<img src="@/static/music_play/zt-black.png" v-show="music_control" alt="error" @click='zt_bo_return()'>
				<img src="@/static/music_play/xys-black.png" alt="error">
			 </view>
		</view>
	</view>
</template>

<script>
	import{mapState} from 'vuex'
	export default {
		data() {
			return {
				audioAction:{
					method:'pause'
				},
			}
		},
		methods: {
			zt_bo_return(){
				this.$store.commit('setmusic_control',!this.music_control)
				this.$store.dispatch('stop_play')
			},
		},
		computed:mapState(['music_url','music_message','play_list_count','music_loop','music_control','music_dt','music_Alldt'])
	}
</script>

<style lang="less" scoped>
	.music{
		width: 100vw;
		height: 100vh;
		
		.music_play{
			width: 100vw;
			height: 12vh;
			background-color: aqua;
			text-align: center;
			padding-top: 1vh;
			position: absolute;
			bottom: 1vh;
			display: flex;
			
			.control{
				width: 100vw;
				height: 10vh;
				
				img{
					margin-top: 1vh;
					margin-left: 5vh;
					width: 5vh;
					height: 5vh;
				}
			}
			.line{
				width: 100vw;
				height: 2vh;
				position: absolute;
				bottom: 0;
			}
		}
		
	}
</style>
