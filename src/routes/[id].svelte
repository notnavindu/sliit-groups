<script>
	import { firestore } from '../ts/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

	let data;

	onMount(() => {
		const docRef = doc(firestore, 'groups', $page.params.id);
		getDoc(docRef).then((snap) => {
			data = snap.data();
			console.log(snap.data());
		});
	});
</script>

{#if data}
	<div class="text-2xl text-sky-500 font-bold">{data.name}</div>
	<div class="mt-4">{data.description}</div>

	<!-- TODO: This page needs a redesign-->
{:else}
	<div class="w-full h-screen grid place-items-center">
		<div class="absolute w-12 h-12 bg-white rounded-full animate-ping" />
	</div>
{/if}
