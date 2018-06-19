<template>
    <router-view/>
</template>

<script>

export default {
  name: 'App'
}

</script>

<style lang="scss" type="text/css">
// ======================= clear style =================

	*{margin:0; padding:0; border:none;}
	h1,h2,h3,h4,h5,h6{font-weight:normal;margin: 0;}
	ol,ul,li,dl,dt,dd{list-style-type:none;}
	a {text-decoration:none;outline: none;}
	input,button{font-family: inherit;}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {-webkit-appearance: none !important;  margin: 0; }


// ======================= iview style =================
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .ivu-spin-fix{
    	background-color: rgba(0, 0, 0, 0.7);
    }

// ======================= public style =================

	body {
	  background-color: #f8f8f8;
	  font-size: "Helvetica Neue",Roboto,sans-serif;
	  color: #666666; 
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

	.colred{
	  color: #ff5060 !important;
	}
	.colblue{
	  color: #5eb3fd !important;
	}
	.colgray{
	  color: #999999 !important;
	}
</style>
