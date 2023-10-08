<template>
	<view class="Login">
		<view class="icon">
			<img class="icon_img" src="/static/Login/logo.jpeg" alt="error">
		</view>
		<view class="Login_option">
			<u-subsection :list="Login.list" :current="Login.current" @change="sectionChange"></u-subsection>
			<view class="box">
				<view v-show="Login.current==0" class="pwd">
					<uni-forms :modelValue="formData1">
						
						<uni-forms-item class="list" label="账号:" name="username">
							<uni-easyinput type="text" v-model="formData1.username" placeholder="请输入账号"></uni-easyinput>
						</uni-forms-item>
						
						<uni-forms-item  class="list" label="密码:" name="password">
							<uni-easyinput type="password" v-model="formData1.password" placeholder="请输入密码"></uni-easyinput>
						</uni-forms-item>
					</uni-forms>
					<button class="submit" @click="submitFrom(1)">登录</button>
				</view>
				<view v-show="Login.current==1" class="verify">
					<uni-forms :modelValue="formData2">
						
						<uni-forms-item class="list" label="手机号:" name="phone">
							<uni-easyinput type="text" v-model="formData2.phone" placeholder="请输入手机号"></uni-easyinput>
						</uni-forms-item>
						
						<u-toast ref="uToast"></u-toast>
						<u-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
							@change="codeChange"></u-code>
						<u-button class="getVerify_btn" @tap="getCode">{{tips}}</u-button>
						
						<uni-forms-item  class="list" label="验证码:" name="verify">
							<u-code-input v-model="formData2.verify" mode="line" borderColor="pink" :maxlength="4"></u-code-input>
						</uni-forms-item>
						
						<button class="submit" @click="submitFrom(2)">登录</button>
					</uni-forms>
				</view>
				<view v-show="Login.current==2" class="email">
					<uni-forms :modelValue="formData3">
						
						<uni-forms-item class="list" label="邮箱:" name="email">
							<uni-easyinput type="text" v-model="formData3.email" placeholder="请输入账号"></uni-easyinput>
						</uni-forms-item>
						
						<uni-forms-item  class="list" label="密码:" name="password">
							<uni-easyinput type="password" v-model="formData3.password" placeholder="请输入密码"></uni-easyinput>
						</uni-forms-item>
					</uni-forms>
					<button class="submit" @click="submitFrom(3)">登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				// refCode: null,
				seconds: 60,
				Login:{
					list:['密码登录','短信登录','邮箱登录'],
					current:0
				},
				formData1:{
					username:'',
					password:''
				},
				formData2:{
					phone:'',
					verify:''
				},
				formData3:{
					email:'',
					password:''
				}
			};
		},
		methods: {
			sectionChange(index){
				this.Login.current = index;
			},
			
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
					})
					// 请求验证码
					uni.request({
						url:uni.getStorageSync('baseUrl')+'/captcha/sent',
						method:"GET",
						data:{
							phone:this.formData2.phone
						},
						success: (res) => {
							console.log(res);
						},
						fail: (err_res) => {
							console.log(err_res);
						}
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				// uni.$u.toast('倒计时结束');
			},
			start() {
				uni.$u.toast('验证码获取成功');
			},
			
			submitFrom(item){
				switch(item){
					case 1:
						// 手机登录
						uni.request({
							url:uni.getStorageSync('baseUrl')+'/login/cellphone',
							method:"POST",
							data:{
								phone:this.formData1.username,
								password:this.formData1.password
							},
							success: (res) => {
								console.log(res);
								uni.showToast({
									title:'账号登录成功',
									duration:2000
								})
							},
							fail: (err_res) => {
								console.log(err_res);
							}
						})
					break;
					case 2:
						// 验证码登录
						uni.request({
							url:uni.getStorageSync('baseUrl')+'/login/cellphone',
							method:"POST",
							data:{
								phone:this.formData2.phone,
								captcha:this.formData2.verify
							},
							success: (res) => {
								console.log(res);
								uni.showToast({
									title:'账号登录成功',
									duration:2000
								})
							},
							fail: (err_res) => {
								console.log(err_res);
							}
						})
					break;
					case 3:
						// 邮箱登录
						uni.request({
							url:uni.getStorageSync('baseUrl')+'/login',
							method:"POST",
							data:{
								email:this.formData3.email,
								password:this.formData3.password
							},
							success: (res) => {
								console.log(res);
								uni.showToast({
									title:'邮箱登录成功',
									duration:2000
								})
							},
							fail: (err_res) => {
								console.log(err_res);
							}
						})
					break;
				}
				uni.switchTab({
					url:'/pages/discover/discover',
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.Login{
		
		.icon{
			width: 40vw;
			height: 40vw;
			margin-top: 10vh;
			margin-left: 30vw;
			.icon_img{
				width: 100%;
				height: 100%;
				border-radius: 15px;
			}
		}
		
		.Login_option{
			width: 90vw;
			height: 50vh;
			// background-color: aquamarine;
			margin: 0 auto;
			margin-top: 5vh;
			padding-top: 1vh;
			
			.box{
				width: 90vw;
				height: 45vh;
				background-color: #ffffff;
				
				.pwd{
					width: 100%;
					height: 100%;
					padding-top: 10vh;
					// background-color: aqua;
					
					.list{
						width: 90%;
						margin: 0 auto;
					}
					
					.submit{
						width: 90%;
						background-color: aqua;
						border-radius: 15px;
						margin-top: 5vh;
					}
				}
				
				.verify{
					width: 100%;
					height: 100%;
					padding-top: 7vh;
					// background-color: aqua;
					
					.list{
						width: 90%;
						margin: 0 auto;
					}
					
					.submit{
						width: 90%;
						background-color: aqua;
						border-radius: 15px;
						margin-top: 5vh;
					}
					.getVerify_btn{
						width: 30vw;
						margin-right: 5vw;
						background-color: coral;
						color: #ffffff;
					}
				}
				
				.email{
					width: 100%;
					height: 100%;
					padding-top: 10vh;
					// background-color: aqua;
					
					.list{
						width: 90%;
						margin: 0 auto;
					}
					
					.submit{
						width: 90%;
						background-color: aqua;
						border-radius: 15px;
						margin-top: 5vh;
					}
				}
			}
			
		}
	}
</style>
