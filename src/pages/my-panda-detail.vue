<template>
	<div class="viewport">
	    <header>
	      <x-header title="我的熊猫详情"></x-header>
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
						<img v-else src="../../static/imgs/head_default.png"/>
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

			<div class="btn_bar" :class="btnBarState | displayFilter">
				<button class="btn-base wrapper btn_space" v-if="panda.state==1" @click="saleBtnClick()">卖出</button>
				<button class="btn-hollow wrapper btn_space" v-if="panda.state==2" @click="unsaleBtnClick()">取消出售</button>
			</div>

			<div class="input_container" :class="inputContainerState | displayFilter">
				<div class="input_con">
					<label>出售价格 (竹子)</label>
					<input type="tel" v-model="txtPrice" @input="priceInputHandler" placeholder="请输入1～10000的价格"/>
				</div>
				<div class="btn_con">
					<button @click="certainPriceClose()">取消</button>
					<button class="colred" @click="certainPriceClick()">确定</button>
				</div>
			</div>

			<div class="confirm_container" :class="confirmContainerState | displayFilter">
				<i class="close_btn" @click="confirPriceClose()"></i>
				<h4>请您确认出售价格</h4>
				<div class="confirm_con">
					<p class="des">出售价格</p>
					<p class="price colred">{{txtPrice}} 竹子</p>
					<p class="tip">出售交易暂时不会收取手续费用</p>
				</div>
				<button class="btn-base wrapper" @click="confirmPriceClick()">确认</button>
			</div>
		</section>
	</div>
</template>

<script type="text/javascript">

	export default {
		name: 'PandaDetail',
		data (){
			return {
				panda: null,
				txtPrice: '',
			    btnBarState: false,
			    inputContainerState: false,
			    confirmContainerState: false,
			}
		},
		mounted (){
			this.panda = this.$route.params.panda;
			this.resetBtnBar();
		},
		filters: {
			displayFilter: function(value){
				return value ? 'active' : '';
			}
		},
		methods:{
			priceInputHandler: function (event) {
				this.txtPrice = event.target.value.replace(/[^0-9]+/g, '');
			},

			saleBtnClick: function() {
				if (!this.panda) return;
				this.txtPrice = '';
				this.btnBarState = false;
				this.inputContainerState = true;
			},

			unsaleBtnClick: function() {
				if (!this.panda) return;

				this.$vux.confirm.show({
					title: '操作提示',
					content: '确定撤销出售吗？',
					onConfirm: ()=>{
						this.unsalePanda();
					}
				});
			},

			certainPriceClick: function() {
				let price = this.txtPrice;
				if (price >= 1 && price <= 10000) {
				  this.inputContainerState = false;
				  this.confirmContainerState = true;
				}
				else {
				  this.$vux.toast.text('出售的价格区间为1至10000个竹子<br/>请合理定价');
				}

			},

			confirmPriceClick: function() {
				let price = this.txtPrice;
				if (price >= 1 && price <= 10000) {
				  let body = {
				    "orderId": this.panda.orderId,
				    "price": price,
				  };
				  this.$vux.loading.show();
				  this.$http.request({
				    // url: this.$config.domain + '/panda/publish',
				    url: this.$config.domain +'/static/data/ok.json',
				    data: body,
				    success: (dic) => {
				      this.$vux.loading.hide();
				      if (dic.code == 0) {
				        // this.events.publish('updateMyPandaList');
				        this.$vux.toast.show('发布成功');
				        setTimeout(()=>{
				          this.$router.back(-1);
				        },3000);
				      } else {
				        this.$vux.toast.show({text:dic.msg, type:'warn'});
				      }
				    },
				    error: (err) => {
				    	this.$vux.loading.hide();
				     	this.$vux.toast.show({text:err, type:'warn'});
				    }
				  });
				}
			},

			unsalePanda: function() {
				let body = {
				  "orderId": this.panda.orderId,
				};
				this.$vux.loading.show();
				this.$http.request({
				  // url: this.$config.domain + '/panda/cancel',
				  url: this.$config.domain +'/static/data/ok.json',
				  data: body,
				  success: (dic) => {
				    this.$vux.loading.hide();
				    if (dic.code == 0) {
				      // this.events.publish('updateMyPandaList');
				      this.$vux.toast.show('撤销成功', 'success', 3000);
				      setTimeout(() => {
				        this.$router.back(-1);
				      }, 3000);
				    } else {
				      this.$vux.toast.show({text:dic.msg, type:'warn'});
				    }
				  },
				  error: (err) => {
				  	this.$vux.loading.hide();
				    this.$vux.toast.show({text:err, type:'warn'});
				  }
				});
			},

			certainPriceClose: function() {
				this.inputContainerState = false;
				this.resetBtnBar();
			},

			confirPriceClose: function() {
				this.confirmContainerState = false;
				this.resetBtnBar();
			},

			resetBtnBar: function(){
				this.btnBarState = this.panda.state == 1 || this.panda.state == 2;
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
		&{
			width: 100%;
			position: fixed;
			left: 0;
			bottom: -100px;
			padding: 10px 0;
			background-color: #ffffff;
			box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
			transition: bottom 0.5s;
		}
	  	&.active{
			bottom: 0px;
		}
	}

	.input_container{
		&{
			position: fixed;
			width: 100%;
			height: 120px;
			background-color: #ffffff;
			bottom: -140px; 
			left: 0; 
			display: flex;
			border-bottom: 1px solid #e4e4e4;
			box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
			transition: bottom 0.5s;
		}
		&.active{
			bottom: 0px;
		}
		.input_con{
			flex-grow: 1;
		}
		label{
			display:inline-block;
			line-height: 30px;
			font-size: 14px;
			color: #333333;
			margin: 10px 0 4px 15px; 
		}
		input{
			width: 80%;
			height: 40px;
			padding-left: 10px;
			margin-left:15px;
			border: 1px solid #e4e4e4;
			border-radius: 3px;
		}
		.btn_con{
			width: 100px;
			height: 100%;
			border-left: 1px solid #e4e4e4;
		}
		.btn_con > button{
			width: 100%;
			height: 50%;
			font-size: 16px;
			color: #666666;
			text-align: center;
			vertical-align: middle;
			background-color: transparent;
		}
		.btn_con > button:first-child{
			border-bottom: 1px solid #e4e4e4;
		}
	}

	.confirm_container{
		&{
			position: fixed;
			width: 100%;
			height: 280px;
			background-color: #ffffff;
			bottom: -300px; 
			left: 0; 
			border-bottom: 1px solid #e4e4e4;
			box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
			transition: bottom 0.5s;
		}
		&.active{
			bottom: 0px;
		}
		h4{
			font-size: 16px;
			color: #333333;
			line-height: 50px;
			text-align: center;
		}
		.close_btn{
			display: block;
			width: 60px;
			height: 50px;
			position: absolute;
			right: 0;
			top:0;
			background: url(../../static/imgs/icon_close.png) no-repeat right 15px center;
			background-size: auto 10px;
		}
		.confirm_con{
			width: 94%;
			border-top: 1px solid #eeeeee;
			margin: 0 auto;
			text-align: center;
		}
		.des{
			font-size: 14px;
			color: #333333; 
			margin-top: 35px;
		}
		.price{
			font-size: 16px;
			margin-top: 5px;
		}
		.tip{
			font-size: 13px;
			line-height: 1em;
			color: #999999;
			display: inline-block;
			padding-left: 18px;
			background: url(../../static/imgs/icon_tip.png) no-repeat left center;
			background-size: auto 100%;
			margin-top: 35px;
		}
		button{
			margin-top: 20px;
		}
	}
</style>