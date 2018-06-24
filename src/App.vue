<template>
	<transition :name="transitionName">	
		<keep-alive :include="keepView">	
			<router-view></router-view>
		</keep-alive>
    </transition>
</template>

<script>

export default {
  name: 'App',
  data(){
      return {
          transitionName:'',
          keepView: ['TabHome', 'TabMine', 'MyPandaList'],
      }
  },


  watch: {//使用watch 监听$router的变化
    $route(to, from) {  	
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index == 0 && from.meta.index == 0){
        this.transitionName = '';
      }
      else if(to.meta.index > from.meta.index){
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
}

</script>

<style lang="scss" type="text/css">
// ======================= clear style =================

	*{margin:0; padding:0; border:none;}
	h1,h2,h3,h4,h5,h6{font-weight:normal;margin: 0;}
	ol,ul,li,dl,dt,dd{list-style-type:none;}
	a {text-decoration:none;outline: none;}
	input,button{font-family: inherit; outline: none;}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {-webkit-appearance: none !important;  margin: 0; }

//======================== scss define style=========================


	$lightBlue: #5eb3fd;


// ======================= override style =================

	.slide-right-enter-active,
	.slide-right-leave-active,
	.slide-left-enter-active,
	.slide-left-leave-active {
	  will-change: transform;
	  transition: all 200ms;
	  position: absolute;
	}
	.slide-right-enter {
	  transform: translate3d(-100%, 0, 0);
	}
	.slide-right-leave-active {
	  transform: translate3d(100%, 0, 0);
	}
	.slide-left-enter {
	  transform: translate3d(100%, 0, 0);
	}
	.slide-left-leave-active {
	  transform: translate3d(-100%, 0, 0);
	}

// ======================= vux override style =================
	 

	body {
		.vux-header{
			width: 100%; 
			height: 40px;
			position: absolute; 
			left: 0px; 
			top: 0px; 
			z-index: 100;
			background-color: #f8f8f8;
			padding: 0;
			border-bottom: 1px solid #e4e4e4;

			.vux-header-title{
				font-size: 16px;
				color: #666666;
			}
			.vux-header-left{
				height: 20px;
				top: 0;
				bottom:0;
				margin: auto;
			}
			.vux-header-left > a,
			.vux-header-right{
				color: $lightBlue;
			}
			.vux-header-left .left-arrow:before{
				border-color: $lightBlue;
			}
		}
	}


// ======================= public style =================
	.colred{
	  color: #ff5060 !important;
	}
	.colblue{
	  color: #5eb3fd !important;
	}
	.colgray{
	  color: #999999 !important;
	}
	html,body{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	body {
	  background-color: #f8f8f8;
	  font-size: "Helvetica Neue",Roboto,sans-serif;
	  color: #666666; 
	}
	.viewport{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		& > header{
			width: 100%;
			height: 40px;
		}
		& > section{
			position: relative;
			flex-grow: 1;
			overflow: auto;
			&::-webkit-scrollbar {display:none}
		}
		& > footer{
			width: 100%;
			height: 50px;
		}
	}
	.full{
	  width: 100%;
	  height: 100%;
	}

	.wrapper{
	  display: block;
	  width: 94%;
	  margin: 0 auto;
	}

	.btn-base{
	  height: 5rem;
	  font-size: 1.6rem;
	  font-weight: bold;
	  color: #ffffff;
	  background-color: #ff5060;
	  border-radius: 5px;
	  padding-left: 1em;
	  padding-right: 1em;
	}
	.btn-hollow{
	  height: 5rem;
	  font-size: 1.6rem;
	  font-weight: bold;
	  border-radius: 5px;
	  padding-left: 1em;
	  padding-right: 1em;
	  color: #ff5060;
	  background-color: #ffffff;
	  border: 1px solid #ff5060;
	}

	.border-box{
	  box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  -webkit-box-sizing: border-box;
	  -o-box-sizing: border-box;
	  -ms-box-sizing: border-box;
	}
	.middle-box:before{
	  content: '';
	  display: inline-block;
	  width: 0;
	  height: 100%;
	  vertical-align: middle;
	}

	.flex-center{
	  width: 100%;
	  height: 100%;
	  display: flex !important; 
	  align-items: center; 
	  justify-content: center;
	  flex-direction: row;
	}
	.flex-middle{
	    width: 100%;
	    height: 100%;
	    display: flex !important; 
	    align-items: center; 
	    justify-content: center;
	    flex-direction: column;
	}

	.text-center{
		text-align: center;
	}

	.clearfix{zoom:1;}
	.clearfix:before,.clearfix:after{display:table;content:" "}
	.clearfix:after{clear:both}


	.toolbar-title{
	  font-size: 18px !important;
	  color: #333333 !important;
	  text-align: center;
	}

	.bg_white{
	  background-color: #ffffff;
	}
	.mt10{
	  margin-top: 10px;
	}
	.split_line{
	  width: 100%;
	  height: 1px;
	  background-color: #e4e4e4;
	}

	

	
</style>
