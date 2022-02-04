<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { auth } from '../ts/firebase';
	import Nav from '$lib/components/Nav.svelte';
</script>

<div>
	<Nav />
	<div class="w-full max-w-3xl m-auto p-4 ">
		<slot />
	</div>
</div>
