<template>
	<div class="viewport">
	    <header>
	      <x-header title="登录"></x-header>
	    </header>

	    <section>
			<ul class="reg_form">
				<li>
					<label>手机号码</label>
					<input class="textInput" type="tel" maxLength="11" v-model="txtTel" @input="telInputHandler" placeholder="请输入手机号码" />
				</li>
				<li>
					<label>密码</label>
					<input class="textInput" :type="pwdSwitch ? 'text' : 'password'" v-model="txtPwd" maxLength="20" placeholder="请输入登录密码" />
					<inline-x-switch class="pwd_switch" v-model="pwdSwitch"></inline-x-switch>
				</li>
			</ul>

			<div class="wrapper text-center clearfix">
				<button class="btn-base full reg_btn" @click="loginClick()">登录</button>
				<p class="tip">
					<img src="/static/imgs/tip_icon.png">
					<span>随手借用户可直接登录区块链熊猫</span>
				</p>
			</div>

			<div class="link_con">
				<a class="login_link" @click="registerLinkClick()">注册新用户</a>
			</div>
		</section>
	</div>
</template>

<script type="text/javascript">

	import { InlineXSwitch } from 'vux'
	import { Common } from '@/class/common.js';
	import JSEncrypt from '../../static/js/encrypt.min.js';

	export default {
		name: 'SignIn',
		components: { InlineXSwitch },
		data(){
			return{
				txtTel: '12342342343',
				txtPwd: 'fadsfasdfasdf',
				pwdSwitch: false,
			}
		},

		methods: {
			telInputHandler: function (event) {
				this.txtTel = event.target.value.replace(/[^0-9]+/g, '');
			},

			checkForm: function() {
				if(Common.verify.isEmpty(this.txtTel)){
					this.$vux.toast.text('手机号码不能为空');
					return false;
				}
				if(!Common.verify.mobile(this.txtTel)){
					this.$vux.toast.text('手机号码格式有误');
					return false;
				}
				if(!Common.verify.password(this.txtPwd)){
					this.$vux.toast.text('密码格式有误');
					return false;
				}
				return true;
			},

			registerLinkClick:function(){
				this.$router.push({ name:'SignUp' });
			},

			loginClick: function() {
				if(!this.checkForm()) return;

				try{
					this.$vux.loading.show();
					(async ()=>{
						let publickey = await this.getPublicKey();
						let login = await this.doSignIn(publickey);
						this.$vux.loading.hide();
					})();
				}catch(e){
					this.$vux.loading.hide();
					this.$vux.toast.show({text:e, type:'warn'});
				}
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

			doSignIn: function(publicKey){
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
				    	url: '/static/data/pandaLogin.json', 
				    	// url: this.$config.domain +'/app/security/pandaLogin', 
				    	// method: 'POST',
				    	data: data,
				    	success: (dic) => {
							if(dic.code==0){	
								resolve(true);			
								this.$store.commit("setLoginState",dic.result);
								this.$router.back(-1);
							}else{
								reject(dic.msg);
							}
						},
						error: (err) =>{
							reject(err);
						}
				    });
				});
			}
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

	.tip{
		&{
			display: inline-block;
			font-size: 1.4rem;
			color: #ff5060;
			padding: 6px 35px 10px 35px; 
			margin-top: 10px;
			border-width:16px 2px 2px 2px;
			border-style: solid;
			border-color: transparent;
			border-image:url(/static/imgs/tip_border.png) 32 4 4 4 round;
			-webkit-border-image:url(/static/imgs/tip_border.png) 32 4 4 4 round;
		}
		img{
			height: 1.5rem;
			vertical-align: middle;
		}
		span{
			vertical-align: middle;
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