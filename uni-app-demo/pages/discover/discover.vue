<template>
	<view class="discover">
		<view class="title">
			<view>
				<img class="icon" src="/static/main/menu.png" alt="error">
			</view>
			<view>
				<u-search class="input" :placeholder="input_text" v-model="search_text" :showAction="false" @click="search_btn"></u-search>
			</view>
			<view>
				<img class="icon" src="/static/main/listen_music.png" alt="error">
			</view>
		</view>
		<view class="nav_box">
			<swiper class="nav_swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true" :duration="1000">
				<swiper-item>
					<view class="swiper-item"><img :src="nav_images_list[0].pic" alt="error"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><img :src="nav_images_list[1].pic" alt="error"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><img :src="nav_images_list[2].pic" alt="error"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><img :src="nav_images_list[3].pic" alt="error"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><img :src="nav_images_list[4].pic" alt="error"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><img :src="nav_images_list[5].pic" alt="error"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><img :src="nav_images_list[6].pic" alt="error"></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="moddle">
			<scroll-view class="scroll" scroll-y="true">
				<view class="main">
					<view class="icon_list">
						<u-scroll-list>
							<view class="list" v-for="(item, index) in icon_list" :key="index">
								<view class="tp">
									<img :src="item.thumb" alt="error">
								</view>
								<p>{{item.text}}</p>
							</view>
						</u-scroll-list>
					</view>
					<view class="music_paper">
						<view class="title">
							<p><strong>推荐歌单</strong></p>
							<span>更多></span>
						</view>
						<u-scroll-list>
							<view class="music_paper_item" v-for="(item,index) in music_pages_list" :key="index">
								<view class="tp">
									<span><img class='icon' src="@/static/main/bf.png" alt="error"><p>{{playcount(item.playCount)}}</p></span>
									<img :src="item.coverImgUrl" alt="error">
								</view>
								<p>{{item.name}}</p>
							</view>
						</u-scroll-list>
					</view>
					
					<view class="music_list">
						<view class="title">
							<view class="img_box" @click='img_updata()'>
								<img src="@/static/main/update.png" alt="error">
							</view>
							<p>让你单曲循环的热歌</p>
							<span><img class='bf_btn' src="@/static/main/bf-black.png" alt="error">播放</span>
						</view>
						<view class="list">
							<swiper style="height: 100%;" :indicator-dots="true">
								<swiper-item>
									<view class="swiper-item">
										<u-list height="100%">
											<u-list-item v-for="(item, index) in music_urls.slice(0,3)":key="index">
												<u-cell :title="item.al.name" @click='go_play(0,index)'>
													<u-avatar
														slot="icon"
														shape="square"
														size="50"
														:src="item.al.picUrl"
														customStyle="margin: -3px 5px -3px 0"
													></u-avatar>
												</u-cell>
											</u-list-item>
										</u-list>
									</view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item">
										<u-list height="100%">
											<u-list-item v-for="(item, index) in music_urls.slice(3,6)":key="index">
												<u-cell :title="item.al.name" @click='go_play(1,index)'>
													<u-avatar
														slot="icon"
														shape="square"
														size="50"
														:src="item.al.picUrl"
														customStyle="margin: -3px 5px -3px 0"
													></u-avatar>
												</u-cell>
											</u-list-item>
										</u-list>
									</view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item">
										<u-list height="100%">
											<u-list-item v-for="(item, index) in music_urls.slice(6,9)":key="index">
												<u-cell :title="item.al.name" @click='go_play(2,index)'>
													<u-avatar
														slot="icon"
														shape="square"
														size="50"
														:src="item.al.picUrl"
														customStyle="margin: -3px 5px -3px 0"
													></u-avatar>
												</u-cell>
											</u-list-item>
										</u-list>
									</view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item">
										<u-list height="100%">
											<u-list-item v-for="(item, index) in music_urls.slice(9,12)":key="index">
												<u-cell :title="item.al.name" @click='go_play(3,index)'>
													<u-avatar
														slot="icon"
														shape="square"
														size="50"
														:src="item.al.picUrl"
														customStyle="margin: -3px 5px -3px 0"
													></u-avatar>
												</u-cell>
											</u-list-item>
										</u-list>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<play-music></play-music>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				input_text:'请输入关键字',
				search_text:'',
				icon_list:[
					{
						thumb:'/static/main/ranking.png',
						text:'排行榜'
					},
					{
						thumb:'/static/main/daily_recommendation.png',
						text:'每日推荐'
					},
					{
						thumb:'/static/main/FM.png',
						text:'私人FM'
					},
					{
						thumb:'/static/main/music_list.png',
						text:'歌单'
					},
					{
						thumb:'/static/main/listen_book.png',
						text:'有声书'
					},
					{
						thumb:'/static/main/album.png',
						text:'数字专辑'
					},
					{
						thumb:'/static/main/live.png',
						text:'直播'
					},
					{
						thumb:'/static/main/attention_music.png',
						text:'关注新歌'
					},
					{
						thumb:'/static/main/music_home.png',
						text:'歌房'
					},
					{
						thumb:'/static/main/game.png',
						text:'游戏专区'
					},
				],
				// 定义轮播图片集合
				nav_images_list:[],
				// 定义歌单图片集合
				music_pages_list:[],
				// 定义华语歌曲list
				music_urls:[],
				// 定义歌曲id数组
				music_id:[]
			}
		},
		methods: {
			playcount(num) {
				let change_num = 0;
				change_num = (num/10000).toFixed(2);
				return change_num+'万' 
			},
			
			img_updata(){
				setTimeout(function(){
					// 获取歌单
					uni.request({
						url:uni.getStorageSync('baseUrl')+'/toplist',
						success: (phb_res) => {
							console.log(phb_res);
							uni.request({
								url:uni.getStorageSync('baseUrl')+'/playlist/detail',
								data:{
									id:phb_res.data.list[3].id,
								},
								success: (music_list_res) => {
									console.log(music_list_res);
									this.music_urls = music_list_res.data.playlist.tracks;
									// console.log(this.music_urls);
								},
								fail: (err_res) => {
									// console.log(err_res);
								}
							})
						}
					})
				},1000)
			},
			
			go_play(a,item){
				switch(a){
					case 0:
					this.$store.commit('setplay_list',this.music_id)
					this.$store.commit('setplay_list_count',item)
					this.$store.dispatch('getmusic_url')
					this.$store.commit('setmusic_message',this.music_urls)
					this.$store.dispatch('playmusic')
					this.$store.commit('setmusic_control',true)
					break;
					case 1:
					this.$store.commit('setplay_list',this.music_id)
					this.$store.commit('setplay_list_count',item+3)
					this.$store.dispatch('getmusic_url')
					this.$store.commit('setmusic_message',this.music_urls)
					this.$store.dispatch('playmusic')
					this.$store.commit('setmusic_control',true)
					break;
					case 2:
					this.$store.commit('setplay_list',this.music_id)
					this.$store.commit('setplay_list_count',item+6)
					this.$store.dispatch('getmusic_url')
					this.$store.commit('setmusic_message',this.music_urls)
					this.$store.dispatch('playmusic')
					this.$store.commit('setmusic_control',true)
					break;
					case 3:
					this.$store.commit('setplay_list',this.music_id)
					this.$store.commit('setplay_list_count',item+9)
					this.$store.dispatch('getmusic_url')
					this.$store.commit('setmusic_message',this.music_urls)
					this.$store.dispatch('playmusic')
					this.$store.commit('setmusic_control',true)
					break;
				}
			},
			search_btn(){
				
			}
			
		},
		mounted() {
			// 在挂载时获取轮播图片
			uni.request({
				url:uni.getStorageSync('baseUrl')+'/banner',
				method:"GET",
				data:{
					type:1
				},
				success: (res) => {
					// console.log(res);
					this.nav_images_list = res.data.banners;
					// console.log(this.nav_images_list);
				}
			})
			
			// 获取推荐歌单
			uni.request({
				url:uni.getStorageSync('baseUrl')+'/top/playlist',
				data:{
					limit:6,
					order:'hot'
				},
				success: (res) => {
					// console.log(res);
					this.music_pages_list = res.data.playlists;
				}
			})
			
			// 获取热门歌曲
			uni.request({
				url:uni.getStorageSync('baseUrl')+'/toplist',
				success: (phb_res) => {
					console.log(phb_res);
					uni.request({
						url:uni.getStorageSync('baseUrl')+'/playlist/detail',
						data:{
							id:phb_res.data.list[3].id,
							
						},
						success: (music_list_res) => {
							console.log(music_list_res);
							this.music_urls = music_list_res.data.playlist.tracks;
							this.music_id = music_list_res.data.playlist.trackIds;
							// console.log(this.music_urls);
							// console.log(this.music_id);
						},
						fail: (err_res) => {
							// console.log(err_res);
						}
					})
				}
			})
		},
	}
</script>

<style lang="less" scoped>
	.discover{
		width: 100%;
		height: 100%;
		padding-top: 2vh;
		background: linear-gradient(180deg,papayawhip,white) no-repeat;
		
		.title{
			width: 100%;
			height: 3vh;
			display: flex;
			justify-content: space-around;
			
			.icon{
				width: 3vh;
				height: 3vh;
			}
			
			.input{
				width: 75vw;
				height: 3vh;
			}
		}
		
		.nav_box{
			width: 100vw;
			height: 20vh;
			margin-top: 3vh;
			
			.nav_swiper{
				width: 100%;
				height: 100%;
				
				.swiper-item{
					width: 95%;
					height: 20vh;
					margin: 0 auto;
					
					img{
						width: 100%;
						height: 100%;
						border-radius: 10px;
					}
				}
			}
		}
		
		.moddle{
			width: 100vw;
			height: 95vh;
			padding-top: 2vh;
			
			.main{
				width: 100%;
				height: 100%;
				
				.icon_list{
					width: 100%;
					height: 12vh;
					border-bottom:solid 1px lightgrey ;
					
					.list{
						width: 5vh;
						height: 7vh;
						border-radius: 100%;
						margin: 1vh 3vh;
						.tp{
							background-color: pink;
							border-radius: 100%;
							width: 5vh;
							height: 5vh;
							text-align: center;
							img{
								margin-top: 1.5vh;
								width: 3vh;
								height: 3vh;
							}
						}
						
						p{
							text-align: center;
							color: #515151;
							font-size: 5px;
						}
					}
				}
				
				.music_paper{
					width: 100%;
					height: 30vh;
					border: 1px #e4e0d9 solid;
					
					.title{
						width: 100%;
						height: 5vh;
						text-align: left;
						
						p{
							width: 80%;
							height: 3vh;
							font-size: 3vh;
							margin-top: 1vh;
							padding-left: 1.5vh;
							display: inline-block;
						}
						
						span{
							margin: 0;
							width: 15%;
							height: 3vh;
							margin-top: 1vh;
							font-size: 2vh;
							border: 1px solid #959595;
							text-align: center;
							border-radius: 30px;
						}
					}
					
					.music_paper_item{
						width: 22vh;
						height: 22vh;
						margin: 0 1vh;
						
						.tp{
							width: 15vh;
							height: 15vh;
							text-align: center;
							padding: 0;
							
							span{
								position: absolute;
								height: 3vh;
								top: 2vh;
								border-radius: 10px;
								background-color: rgba(255, 255, 255, 0.3);
								text-align: left;
								float: left;
								.icon{
									margin: 0;
									width: 3vh;
									height: 3vh;
								}
								p{
									margin: 0;
									display: inline-block;
								}
							}
							
							img{
								margin-top: 1.5vh;
								width: 15vh;
								height: 15vh;
								border-radius: 10px;
							}
						}
						
						p{
							margin-top: 1vh;
							font-size: 5px;
						}
					}
				}
				
				.music_list{
					width: 100%;
					height: 35vh;
					margin-top: 1vh;
					.title{
						width: 100%;
						height: 5vh;
						padding-left: 1vh;
						.img_box{
							img{
								margin-top: 1vh;
								width: 3vh;
								height: 3vh;
								transition: All 1s ease-in-out;
								-webkit-transition: All 1s ease-in-out;
								-moz-transition: All 1s ease-in-out;
								-o-transition: All 1s ease-in-out;
							}
							
							.img_transition{
								transform: rotate(360deg);
								-webkit-transform: rotate(360deg);
								-moz-transform: rotate(360deg);
								-o-transform: rotate(360deg);
								-ms-transform: rotate(360deg);
							}
						}
												
						p{
							width: 70%;
							font-size: 2.5vh;
							font-weight: bold;
							margin-top: 1vh;
							letter-spacing: 2px;
						}
						
						span{
							font-size: 2vh;
							line-height: 3vh;
							width: 10vh;
							height: 3vh;
							border: 1px solid #aeaca8;
							border-radius: 20px;
							margin-right: 2vh;
							
							img{
								margin-top: 0;
								margin-left: 2vh;
								width: 2vh;
								height: 2vh;
							}
						}
					}
					
					.list{
						width: 100vw;
						height: 30vh;
						.swiper-item{
							width: 100%;
							height: 30vh;
						}
					}
				}
				
			}
		}
	}
</style>
