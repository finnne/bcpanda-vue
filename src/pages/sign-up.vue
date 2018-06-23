<template>
	<div class="viewport">
	    <header>
	      <x-header title="注册"></x-header>
	    </header>

	    <section>
			<ul class="reg_form">
				<li>
					<label>手机号码</label>
					<input class="textInput" type="tel" maxLength="11" v-model="txtTel" @input="telInputHandler" placeholder="请输入手机号码" />
				</li>
				<li>
					<label>短信验证码</label>
					<input class="textInput" type="text" v-model="txtSmsCode" placeholder="请输入短信验证码" />
					<button id="smsBtn" class="sms_btn" data-time="120" data-text="发送验证码" @click="smsBtnClick()">发送验证码</button>
					<div class="image_vcode_layer" v-show="imageCodePopState">
						<div class="flex-middle">
							<div class="panel">
								<h3>图片验证码</h3>
								<input type="text" id="txtImageCode" v-model="txtImageCode" placeholder="点击右图换验证码"/>
								<img :src="imageCodeSrc" @click="refreshImageCode()"/>
								<div class="btns">
									<button @click="popImageCodeLayer(false)">关闭</button>
									<button @click="imageCodeBtnClick()">提交</button>
								</div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<label>密码</label>
					<input class="textInput" :type="pwdSwitch ? 'text' : 'password'" v-model="txtPwd" maxLength="20" placeholder="请输入登录密码" />
					<inline-x-switch class="pwd_switch" v-model="pwdSwitch"></inline-x-switch>
				</li>
			</ul>

			<div class="agree">
				<i class="check_btn" :checked="agreeState" @click="agreeState=!agreeState"></i>
				<span>同意《<a @click="navToAgreement()">用户服务协议</a>》</span>
			</div>

			<div class="wrapper text-center">
				<button class="btn-base full reg_btn" @click="registerClick()">注册</button>
			</div>

			<div class="link_con">
				<a class="login_link" @click="backToLogin()">已有账户，立即登录</a>
			</div>
		</section>
	</div>
</template>

<script type="text/javascript">

	import { InlineXSwitch, Checklist } from 'vux'
	import { Common } from '@/class/common.js';
	import JSEncrypt from '../../static/js/encrypt.min.js';

	export default {
		name: 'SignUp',
		components: { InlineXSwitch, Checklist },
		data(){
			return{
				txtTel: '12342342343',
				txtPwd: 'fadsfasdfasdf',
				pwdSwitch: false,
				txtSmsCode: '',
				txtImageCode: '',
				imageCodeSwitch: '1',
				imageCodeSrc: '',
				imageCodePopState: false,
				pwdSwitch: false,
				agreeState: true,
			}
		},
		mounted(){
			this.getImageCodeSwitch();
		},

		methods: {
			telInputHandler: function (event) {
				this.txtTel = event.target.value.replace(/[^0-9]+/g, '');
			},

			// 返回登录页面
			backToLogin: function(){
				this.$router.back();
			},

			navToAgreement: function(){
				this.$router.push({ name: 'Agreement' });
			},

			// 获取图片验证码开关配置
			getImageCodeSwitch: function(){
				this.$http.request({
					url: '/static/data/getAllParams.json',
					// url: this.$config.domain +'/app/common/getAllParams',
					success: (dic) => {
						if(dic.code==0){
							this.imageCodeSwitch = dic.result['register_imagecode_switch'];
						}else{
							this.$vux.toast.text(dic.msg);
						}
					}
				});
			},

			// 短信验证码按钮事件
			smsBtnClick: function(){
				if(Common.verify.isEmpty(this.txtTel)){
					this.$vux.toast.text('手机号码不能为空');
					return;
				}
				if(!Common.verify.mobile(this.txtTel)){
					this.$vux.toast.text('手机号码格式有误');
					return;
				}

				this.$http.request({
					url: '/static/data/ok.json',
					// url: Global.domain +'/app/security/validatePhone/'+this.txtTel,
					success: (dic) => {    	
						if(dic.code==0){
							if(this.imageCodeSwitch=='1'){
								this.popImageCodeLayer(true);
							}else{
								let callbackFoo = (dic)=>{
									if(dic.code==0){
										this.$vux.toast.text('短信验证码已发送');
										Common.foo.btnCountdown('smsBtn');
									}else{
										this.$vux.toast.text(dic.msg);
									}
								}
								this.sendSmsCode(this.txtTel, '-1', callbackFoo);
							}
						}
						else{
							this.$vux.toast.text(dic.msg);
						}
					}
				});

				
			},


			// 发送短信验证码
			sendSmsCode: function(telNum, imgCode, callback){
				this.$http.request({
					url: '/static/data/ok.json',
					// url: Global.domain +'/app/common/sendAuthCode/new/'+ telNum +'/1/'+ imgCode,
					success: (dic) => {    	
						callback && callback(dic);
					}
				});
			},

			// 图片验证码层弹出
			popImageCodeLayer: function(flag){
				if(flag){
					this.refreshImageCode();
					this.imageCodePopState = true;
				}
				else{
					this.imageCodePopState = false;
				}
			},

			// 图片验证码刷新
			refreshImageCode: function(){
				var r = new Date().getTime();
				var imgPath = this.$config.domain +'/app/common/getSendAuthCodeImageCode?r='+r ;
				this.imageCodeSrc = imgPath;
			},

			// 图片验证码提交事件
			imageCodeBtnClick: function(){
			    if(Common.verify.isEmpty(this.txtImageCode)){
					this.$vux.toast.text('请输入图片验证码');
					return;
				}
				let callbackFoo = (dic)=>{
					if(dic.code==0){
						this.popImageCodeLayer(false);
						this.$vux.toast.text('短信验证码已发送');
						Common.foo.btnCountdown('smsBtn');
					}
					else if(dic.code == 2202){
						this.$vux.toast.text('图片验证码错误');
						this.refreshImageCode();
						this.txtImageCode = '';
					}else{
						this.$vux.toast.text(dic.msg);
						this.refreshImageCode();
						this.txtImageCode = '';
					}
				}
				this.sendSmsCode(this.txtTel, this.txtImageCode, callbackFoo);
			},

			
			// 表单验证
			checkForm: function(){
				if(Common.verify.isEmpty(this.txtTel)){
					this.$vux.toast.text('手机号码不能为空');
					return false;
				}
				if(!Common.verify.mobile(this.txtTel)){
					this.$vux.toast.text('手机号码格式有误');
					return false;
				}
				if(Common.verify.isEmpty(this.txtSmsCode)){
					this.$vux.toast.text('请输入短信验证码');
					return false;
				}
				if(!Common.verify.password(this.txtPwd)){
					this.$vux.toast.text('密码格式有误');
					return false;
				}
				if(!this.agreeState){
					this.$vux.toast.text('请先同意《用户服务协议》');
					return false;
				}
				return true;
			},

			getPublicKey: function(){
				return new Promise((resolve, reject)=>{
					this.$http.request({
						url: '/static/data/getPublicKey.json',
						success: (dic) => {  
							if(dic.code==0){
								resolve(dic.result);
								console.log('resolve',dic.result)
							}else{
								reject(dic.msg);
							}
						},
						error:(err) => {
							reject(err);
						}
					});
				});
			},

			doSignUp: function(publicKey){
				return new Promise((resolve,reject)=>{
					let encrypt = new JSEncrypt();
					encrypt.setPublicKey(publicKey);
					let ecPwd = encrypt.encrypt(this.txtPwd);

				    let data = {
				        "userName": this.txtTel,
				        "password" : ecPwd,
				        "appType" : this.$config.appType,
						"deviceName": this.$config.channel,
						"deviceModel": this.$config.channel,
						"deviceId": this.$config.channel,
						"osName": this.$config.channel,
						"osVersion": this.$config.channel,
						"appVersion": this.$config.channel,
				    };
				    
				    this.$http.request({
				    	url: '/static/data/ok.json', 
				    	// url: this.$config.domain +'/app/security/register', 
				    	// method: 'POST',
				    	data: data,
				    	success: (dic) => {
							if(dic.code==0){	
								resolve(true);			
							}else{
								reject(dic.msg);
							}
						},
						error: (err) =>{
							reject(err);
						}
				    });
				});
			},

			// 注册后自动登录
			autoLogin: function(publicKey){
				let encrypt = new JSEncrypt();
				encrypt.setPublicKey(publicKey);
				let ecPwd = encrypt.encrypt(this.txtPwd);	
				let params = {
			        "userName": this.txtTel,
			        "password" : ecPwd,
			        "appType" : this.$config.appType,
					"deviceName": this.$config.channel,
					"deviceModel": this.$config.channel,
					"deviceId": this.$config.channel,
					"osName": this.$config.channel,
					"osVersion": this.$config.channel,
					"appVersion": this.$config.channel,
				};
				this.$http.request({
					url: '/static/data/pandaLogin.json', 
					// url: this.$config.domain +'/app/security/pandaLogin',
					// method: 'POST',
					data: params,
					success: (dic) => {	
						if(dic.code==0){
							this.$store.commit("setLoginState",token);
							setTimeout(()=>{
								this.$router.back(-3);
							}, 3000);
						}else{
							setTimeout(()=>{
								this.$router.back(-1);
							}, 3000);
						}
					},
					error: (err)=>{
						setTimeout(()=>{
							this.$router.back(-1);
						}, 3000);
					}
				});
			},


			// 注册按钮事件
			registerClick: function() {
				if(!this.checkForm()) return;
				try{
					this.$vux.loading.show();
					(async ()=>{
						let publicKey = await this.getPublicKey();
						let register = await this.doSignUp(publicKey);
						this.$vux.loading.hide();
						this.$vux.toast.show({ text:'注册成功' });
						this.autoLogin(publicKey);
						
					})();
				}catch(e){
					this.$vux.loading.hide();
					this.$vux.toast.show({text:e, type:'warn'});
				}	
			},

			

			
		}
	}

	
</script>

<style type="text/css" lang="scss" scoped>
	.reg_form{
		&{
			margin: 20px 0 0 0;
			background-color: #ffffff;
		}
		li{
			border-top: 1px solid #eeeeee;
			padding: 32px 0 10px 0;
			position: relative;
		}
		li:first-child{
			border: none;
		}
		li > label{
			font-size: 1.2rem;
			color: #b6b6b6;
			padding-left: 2.8rem;
		}
		li > .textInput{
			display: block;
			width: 60%;
			height: 2.5rem;
			padding-left: 2.8rem;
			border:none;
			background-color: none;
		}
		.pwd_switch{
			position: absolute;
			right: 15px;
			bottom: 14px;
		}

	}

	.sms_btn{
		position: absolute;
		height: 3rem;
		line-height: 3rem;
		right: 15px;
		bottom: 14px;
		font-size: 1.4rem;
		color: #50aefe;
		padding:0 10px;
		background-color: transparent;
		border: 1px solid #50aefe;
		border-radius: 1.5rem;
	}
	.image_vcode_layer{
		&{
			position: fixed;
			left: 0;
			top:0;
			z-index: 9;
			width:100%;
			height: 100%;
			background-color: rgba(0,0,0,0.3);
		}
		.panel{
			&{
				width: 260px;
				background-color: #f8f8f8;
				border-radius: 5px;
				text-align: center;
				overflow: hidden;
			}
			h3{
				font-size: 16px;
				text-align: center;
				margin: 20px 0;
			}
			input{
				width: 150px;
				height: 36px;
				border: 1px solid #eee;
				border-radius: 3px;
				vertical-align: middle;
				padding-left: 10px;
				background-color: #fff;
			}
			img{
				width: 60px;
				height: 36px;
				background-color: #eee;
				margin: 0 0 0 2%;
				vertical-align: middle;
				border: none;
			}
			.btns{
				border-top: 1px solid #ddd;
				margin-top: 20px;
				font-size: 0;
				button{
					display: inline-block;
					vertical-align: top;
					width: 50%;
					height: 40px;
					font-size: 16px;
					color: #4e8ef7;
					background-color: transparent;
				}
				button:first-child{
					border-right: 1px solid #ddd;
				}
			}
		
		}
	}
	.agree{
		&{
			margin-top: 10px;
			padding-left: 2.8rem;
		}
		.check_btn{
			display: inline-block;
			font-family: "weui";
			font-style: normal;
			vertical-align: middle;
			padding: 0.5rem;
			margin-left: -0.5rem;
			&:before{
				content: '\EA01';
				display: inline-block;
				font-size: 2rem;
				color:#999999;
			}
			&[checked="checked"]:before{
				content: '\EA06';
				color: #09BB07;
			}

		}
		span{
			font-size: 1.2rem;
			vertical-align: middle;
			color: #666666;
		}
		a{
			color: #50aefe;
		}
	}
	.reg_btn{
		margin: 2rem 0 0 0;
	}
	.link_con{
		&{
			margin-top:4rem; 
			width: 100%;
			text-align: center;
		}
		.login_link{
			font-size: 1.5rem;
			color: #50aefe;
		}
	}
</style>