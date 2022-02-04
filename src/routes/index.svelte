<script>
	import Group from '$lib/components/Group.svelte';
	import NewFab from '$lib/components/NewFab.svelte';

	import { firestore } from '../ts/firebase';
	import { query, orderBy, collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let data;

	onMount(async () => {
		const groupRef = collection(firestore, 'groups');

		const q = query(groupRef, orderBy('time', 'desc'));

		let docSnap = await getDocs(q);

		data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	});
</script>

<div class="flex flex-col gap-2 pb-16">
	{#if data}
		{#each data as item}
			<Group values={item} />
		{/each}
	{:else}
		<div class="w-full h-full absolute top-0 left-0 grid place-content-center ">
			<div class="w-28 h-28 rounded-full bg-white animate-ping" />
		</div>
	{/if}
</div>

<NewFab />
