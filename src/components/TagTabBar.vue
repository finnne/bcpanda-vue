<template>
	<tabbar @on-index-change="tabOnChange"><!--   -->
	    <tabbar-item :selected="selectedIndex==1"><!--  @on-item-click="selectTab(1)" -->
	      <i class="tab-icon" slot="icon"></i>
	      <span slot="label">首页</span>
	    </tabbar-item>
	    <tabbar-item :selected="selectedIndex==2">
	      <i class="tab-icon" slot="icon"></i>
	      <span slot="label">我的</span>
	    </tabbar-item>
  	</tabbar>
</template>

<script type="text/javascript">
	
	import { Tabbar, TabbarItem } from 'vux';
	
	export default{
		name: 'TagTabBar',
		components: { Tabbar, TabbarItem },
		// props: [ 'selectedIndex' ],

		computed:{
			selectedIndex: function(){
				return this.$store.state.tabIndex;
			}
		},

		watch: {
			selectedIndex: function(index, prev){
				switch(index){
					case 1:
						this.$router.push({ name: 'TabHome' });
						break;
					case 2:
						this.$router.push({ name: 'TabMine' });
						break;
				}
			}
		},
		
		methods: {
			tabOnChange: function (i) {
				this.$store.commit('setTabIndex', i+1);
			},
			// selectTab: function (i) {
			// 	console.log('i',i)
			// 	console.log('selectedIndex',this.selectedIndex)
			// 	if(i==this.selectedIndex) return;
			// 	let page;
			// 	switch(i){
			// 		case 1:
			// 			page = 'TabHome';
			// 			break;
			// 		case 2:
			// 			page = 'TabMine';
			// 			break;
			// 	}
			// 	if(page){
			// 		this.$router.push({ name:page });
			// 	}
			// }
		}

	}
	
</script>

<style type="text/css" lang="scss">
	body{
		.weui-tabbar{
			&{
				width: 100%;
				height: 100%;
				position: relative;
			}
			.weui-bar__item_on .weui-tabbar__label{
				color: #ff5060;
			}
			.weui-tabbar__icon{
				width: 24px;
				height: 24px;
			}
			.tab-icon{
				display: block;
				width: 100%;
				height: 100%;
				background: no-repeat center center;
				background-size: auto 100%;
			}


			
		}

		@for $i from 1 through 2{
			.weui-tabbar > a:nth-child(#{$i}) .tab-icon{
				background-image: url(../assets/icon/tabs/tab-#{$i}-off.png);
			}
			.weui-tabbar > a.weui-bar__item_on:nth-child(#{$i}) .tab-icon{
				background-image: url(../assets/icon/tabs/tab-#{$i}-on.png);
			}
		}
	}
</style>