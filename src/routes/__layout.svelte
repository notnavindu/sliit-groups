<script>
	import '@fontsource/open-sans';
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
</script>

<svelte:head>
	<title>SLIIT Groups</title>
</svelte:head>

<div>
	<Nav />
	<div class="w-full max-w-3xl m-auto p-4 ">
		<slot />
	</div>
</div>
