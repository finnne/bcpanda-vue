<template>
	<div class="viewport">
	    <header>
	      <x-header title="登录"></x-header>
	    </header>

	    <section>
	    	<TagSignIn></TagSignIn>
		</section>
	</div>
</template>

<script type="text/javascript">
	
	import TagSignIn from '@/components/TagSignIn.vue';

	export default {
		name: 'SignIn',
		components: { TagSignIn },
	}

	
</script>
