<script>
	// import '@fontsource/open-sans';
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>SLIIT Groups</title>
</svelte:head>

<div>
	<div class="min-h-screen">
		<Nav />
		<div class="w-full max-w-3xl m-auto p-4 ">
			<slot />
		</div>
	</div>
	<div>
		<Footer />
	</div>
</div>
