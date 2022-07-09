<script lang="ts">
	import Group from '$lib/components/Group.svelte';
	import NewFab from '$lib/components/NewFab.svelte';

	import { firestore } from '../ts/firebase';
	import { query, orderBy, collection, getDocs, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	let data;
	let values: any = {};
	let loading = true;

	onMount(async () => {
		getGroups();
	});

	const getGroups = async () => {
		loading = true;

		const groupRef = collection(firestore, 'groups');
		const q = query(groupRef, orderBy('time', 'desc'));
		getDocs(q).then((docSnap) => {
			loading = false;
			data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		});
	};
</script>

<div class="flex flex-col gap-4 pb-16">
	{#if data}
		{#if data.length === 0}
			<div>No groups found</div>
			<div>You can create one <a href="/profile/new" class="text-sky-500">here.</a></div>
		{/if}

		{#each data as item}
			<Group values={item} />
		{/each}
	{/if}
</div>

<NewFab />

<style lang="postcss">
	.select {
		@apply mt-2 w-full h-11 px-3 rounded-lg bg-black border border-gray-400;
	}
</style>
