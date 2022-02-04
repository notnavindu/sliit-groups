<script>
	import '../../app.css';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { auth } from '../../ts/firebase';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/stores';

	let authenticated = false;

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			if (!user) {
				goto('/login');
			} else {
				authenticated = true;
			}
		});
	});
</script>

{#if authenticated}
	<slot />
{:else}
	<div class="w-full h-full absolute top-0 left-0 grid place-content-center ">
		<div class="w-28 h-28 rounded-full bg-white animate-ping" />
	</div>
{/if}
