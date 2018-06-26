<template>
	<div class="viewport">
	    <header>
	      <x-header title="领取成功"></x-header>
	    </header>

	    <section v-if="panda">
			<div class="sec_success" :style="'background-color:#'+ panda.backColor">
				<span class="img_panda">
					<img :src="panda.url"/>
					<i>{{panda.degree}}</i>
				</span>
				<h5>区块链熊猫领养成功</h5>
		      	<p>您可以在账户中查看区块链熊猫详情</p>
			</div>

			<div class="wrapper sec_bottom">
				<button class="btn-base full" @click="enterMineBtnClick()">进入我的账户</button>
			</div>
		</section>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'SuccessReceive',
		data(){
			return{
				panda: null
			}
		},

		mounted(){
			this.panda = this.$route.params.panda;
		},

		methods: {
			enterMineBtnClick: function(){
				// this.$store.commit('selectTabIndex', 2);
				this.$store.commit('setTabIndex', 2);
				this.$router.push({ name: 'TabMine' });
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.sec_success{
		&{
			width: 94%;
			margin: 10px auto 0 auto;
			padding: 3.5rem 0;
			border-radius: 5px;
			background-color: #dddddd;
		}
		.img_panda{
			&{
				display: block;
				width: 12rem;
				height: 12rem; 
				margin: 0 auto;
				position: relative;
			}
			img{
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
			}
			i{
				font-size: 1.2rem;
				color: #ffffff;
				position: absolute;
				top: 0px;
				right: -20px;
				font-style: normal;
				padding: 6px 6px 10px 6px;
				background: url('../../static/imgs/tag_bg.png') no-repeat center center;
				background-size: 100% 100%;
			}

		}
		h5{
			font-size: 2rem;
			color: #333333;
			text-align: center;
			margin: 1rem auto 0 auto;
		}
		p{
			font-size: 1.4rem;
			color: #333333;
			text-align: center;
			margin: 1rem auto 0 auto;
		}
	}

	.sec_bottom{
		padding: 2rem 0 4rem 0;
	}
</style>