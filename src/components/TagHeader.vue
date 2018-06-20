<template>
	<div class="header_container">
		<header class="header">
			<!-- <button class="header_left">
				<Icon type="chevron-left"></Icon>
				返回
			</button> -->
			<h1 class="title"><slot></slot></h1>
			<button class="header_right"><slot name="right"></slot></button>
		</header>
	</div>
</template>

<script>
	export default {
		name: 'TagHeader',
	}
</script>

<style lang="scss" type="text/css" scoped>
	.header_container{
		width: 100%;
		height: 40px;
	}
	.header{
		width: 100%;
		height: 40px;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;
		background-color: #f8f8f8;
		border-bottom: 1px solid #e4e4e4;
		.title{
			width: 60%;
			margin: 0 auto; 
			font-size: 16px;
			color: #666666;
			text-align: center;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			line-height: 40px;
		}
		.header_left{
			position: absolute;
			left: 0;
			top: 0;
			width: 20%;
			height: 100%;
			color: #50aefe;
			background-color: transparent;
			text-align: left;
			padding-left: 15px;
		}
		.header_right{
			position: absolute;
			right: 0;
			top: 0;
			width: 20%;
			height: 100%;
			color: #50aefe;
			background-color: transparent;
			text-align: right;
			padding-right: 15px;
		}
	}
	
</style>