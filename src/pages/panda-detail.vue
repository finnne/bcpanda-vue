<template>
	<div class="viewport">
	    <header>
	      <x-header title="区块链熊猫详情"></x-header>
	    </header>

	    <section v-if="panda">
			<div class="bg_white">
				<div class="img_panda" :style="'background-color:#'+ panda.backColor">
					<img :src="panda.url"/>
				</div>
				<div class="info_base wrapper">
					<h6>{{panda.name}}　</h6>
		      		<p>
		      			第{{panda.generation}}代<small> |</small>
		      			<span class="price" v-if="panda.state==2">{{panda.price}}竹子</span>
		      			<span v-else>暂未定价</span>
		      		</p>
		      		<i>{{panda.degree}}</i>
				</div>
			</div>

			<div class="bg_white mt10">
				<div class="wrapper info_con">
					<h6>所有者:</h6>
					<span class="user_head">
						<img v-if="panda.headUrl" :src="panda.headUrl"/>
						<img v-else src="../assets/imgs/head_default.png"/>
					</span>
					<label class="user_name">{{panda.userName}}</label>
				</div>
				<hr class="split_line" />
				<div class="wrapper info_con">
					<h6>关于熊猫</h6>
					<p class="desc">
						每只熊猫拥有独特的256位“数字基因”，这个“数字基因”决定了熊猫的外形，超过40亿种组合，由于“基因算法”复杂，因此，每一个小时才能生成一只零代猫，限量10000只。“基因遗传算法”将随机从“父母亲”的数字基因中各抽取50%的“基因片段”，组成新的"数字基因“，从而产生新一代熊猫，这就是“繁殖”。
					</p>
				</div>
			</div>

			<div class="space_50"></div>

			<div class="btn_bar" v-if="panda.state==2">
				<button class="btn-base wrapper" @click="buyBtnClick()">立即购买</button>
			</div>
		</section>
	</div>
</template>

<script type="text/javascript">

	import { Http } from '@/class/http.js';

	export default {
		name: 'PandaDetail',
		data (){
			return {
				panda: null
			}
		},
		mounted (){
			this.panda = this.$route.params.panda;
		},
		methods:{
			buyBtnClick: function(){
				// if(!Global.loginState){
				// 	let param = {
				// 		back: {
				// 			view: 'root',
				// 			index: this.nav.root.length() - 1,
				// 		}
				// 	}
				// 	this.nav.root.push(LoginPage, param);
				// 	return;
				// }
				if (!this.panda){
					this.$vux.toast.text('熊猫不存在');
					return;
				}

				this.$vux.confirm.show({
				  title: '是否确认购买？',
				  content: '购买本只熊猫需要花费<br/><span class="colred">'+ this.panda.price +'</span> 竹子',
				  onConfirm: ()=>{
						let body = {
							"orderId": this.panda.orderId,
						};
						this.$vux.loading.show();
						Http.request({
							url: '/static/data/adopt.json',
							data: body,
							success: (dic) => {		
								this.$vux.loading.hide();
								if(dic.code==0){
									// TODO 
									// this.events.publish('updateMinePage');
									this.$router.push({ name: 'SuccessBuy', params:{ panda: this.panda } });
								}else{
									this.$vux.toast.show({text:dic.msg, type:'warn'});
								}
							},
							error: (err) =>{
								this.$vux.loading.hide();
							}
						});
					}
				});

			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.img_panda{
		&{
			width: 100%;
			padding: 1rem 0;
			background-color: #dddddd;
		}
		& > img{
			display: block;
			height: 12rem;
			margin: 0 auto;
		}
	}

	.info_base{
		&{
			padding: 10px 0;
			position: relative;
		}
		h6{
			font-size: 1.6rem;
			color: #333333;
			margin:0;
		}
		p{
			font-size: 1.3rem;
			color: #999999;
			margin: 8px 0 0 0;
		}
		p > small{
			font-size: 13px;
			font-style: normal;
			font-weight: lighter;
			margin: 0 6px;
		}
		p > .price{
			color: #ff5060;
		}
		i{
			display: inline-block;
			width: 3.8rem;
			height: 3.8rem;
			line-height: 3.8rem;
			font-size: 1.2rem;
			font-style: normal;
			color: #ffffff;
			text-align: center;
			background-color: #ffb350;
			border-radius: 50%;
			position: absolute;
			top:50%;
			right: 0;
			margin: -1.9rem 0 0 0;
		}
	}

	.info_con{
		&{
			padding: 18px 0 20px;
		}
		h6{
			font-size: 1.5rem;
			color: #333333;
			margin: 0 0 10px 0;
		}
		.user_head{
			display: inline-block;
			width: 3.6rem;
			height: 3.6rem;
			border-radius: 50%;
			overflow: hidden;
			background-color: #eeeeee;
			vertical-align: middle;
		}
		.user_head > img{
			width: 100%;
			height: 100%;
		}
		.user_name{
			font-size: 1.5rem;
			color: #333333;
			margin-left: 5px;
			vertical-align: middle;
		}
		.attribute{
			&{
				overflow: hidden;
			}
			li{
				float: left;
				width: 12.5rem;
				height: 3rem;
				background-color: #f8f8f8;
				border: 1px solid #dfdfdf;
				border-radius: 3px;
				margin: 0 15px 10px 0;
				font-size: 1.2rem;
				color: #333333;
				text-align: center;
				line-height: 3rem;
			}
		}
		.desc{
			font-size: 1.4rem;
			color: #666666;
			line-height: 1.8;
		}
	}

	.split_line{
		width: 100%;
		height: 1px;
		background-color: #e4e4e4;
	}

	.space_50{
		height: 50px;
	}

	.btn_bar {
	  width: 100%;
	  position: fixed;
	  left: 0;
	  bottom: 0;
	  padding: 10px 0;
	  background-color: #ffffff;
	  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
	}
</style>