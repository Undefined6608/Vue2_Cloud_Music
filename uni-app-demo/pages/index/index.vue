<template>
	<view class="container">
		<swiper class="swiper" :indicator-dots="true">
			<swiper-item class="list">
				<view class="swiper-item"><img :src="imgList[0]" alt="error"></view>
				<view class="title">
					<p class='title_py'>1 6 3&nbsp;&nbsp;M u s i c</p>
					<p class='title_text'>网易云音乐</p>
				</view>
			</swiper-item>
			<swiper-item class="list">
				<view class="swiper-item"><img :src="imgList[1]" alt="error"></view>
			</swiper-item>
			<swiper-item class="list">
				<view class="swiper-item"><img :src="imgList[2]" alt="error"></view>
			</swiper-item>
			<swiper-item class="list">
				<view class="swiper-item"><img :src="imgList[3]" alt="error"></view>
			</swiper-item>
			<swiper-item class="list">
				<view class="swiper-item"><img :src="imgList[4]" alt="error"></view>
			</swiper-item>
			<swiper-item class="list">
				<view class="swiper-item"><img :src="imgList[5]" alt="error"></view>
				<button class="btn" @click="Login_btn">立即体验</button>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:['/static/index/1.jpeg','/static/index/2.jpeg','/static/index/3.jpeg'
						,'/static/index/4.jpeg','/static/index/5.jpeg','/static/index/6.jpeg']
			}
		},
		methods: {
			Login_btn(){
				uni.navigateTo({
					url:'../Login/Login'
				})
				uni.setStorageSync('first_falg',true)
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100vw;
		height: 100vh;
		.swiper{
			width: 100vw;
			height: 100vh;
			
			.title{
				width: 100vw;
				height: 20vh;
				position: absolute;
				top: 40vh;
				left:0;
				
				p{
					text-align: center;
				}
				
				.title_py{
					font-size: 3vh;
					color: crimson;
					letter-spacing: 3px;
				}
				
				.title_text{
					margin-top: 3vh;
					font-size: 5vh;
					color: darkred;
					font-weight: bold;
					letter-spacing: 20px;
				}
			}
			
			img{
				width: 100%;
				height: 100vh;
			}
			
			.btn{
				position: absolute;
				bottom: 10vh;
				left: 40vw;
				background: linear-gradient(120deg,pink,skyblue) no-repeat;
				font-size: 3vh;
				color: red;
			}
		}
	}
</style>
