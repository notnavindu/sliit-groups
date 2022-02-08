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
		loading = false;
	});

	const getGroups = async () => {
		loading = true;

		const groupRef = collection(firestore, 'groups');
		const q = query(
			groupRef,
			orderBy('time', 'desc'),
			where('year', '==', values.year),
			where('semester', '==', values.semester),
			where('specialization', '==', values.specialization),
			where('batch', '==', values.batch)
		);
		getDocs(q).then((docSnap) => {
			loading = false;
			data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		});
	};
</script>

<div class="text-lg">
	Looking for a <span class="text-sky-200">project group</span> <br /> or a
	<span class="text-sky-200">research group?</span> <br /> Start here.
</div>

<!-- Filters -->
<div class="grid grid-cols-2 w-full gap-4">
	<div>
		<div class="mt-8 text-sky-500 ">Academic Year</div>
		<select class="select focus:outline-none focus:border-sky-500" bind:value={values.year}>
			<option class="bg-black focus:bg-gray-800" value="1">Year 1</option>
			<option class="bg-black focus:bg-gray-800" value="2">Year 2</option>
			<option class="bg-black focus:bg-gray-800" value="3">Year 3</option>
			<option class="bg-black focus:bg-gray-800" value="4">Year 4</option>
		</select>
	</div>

	<div>
		<div class="mt-8 text-sky-500">Semester</div>
		<select class=" select focus:outline-none focus:border-sky-500" bind:value={values.semester}>
			<option class="bg-black focus:bg-gray-800" value="1">Semester 1</option>
			<option class="bg-black focus:bg-gray-800" value="2">Semester 2</option>
		</select>
	</div>
</div>

<div class="grid grid-cols-2 w-full gap-4 mt-4 mb-8">
	<div>
		<div class=" text-sky-500">Specialization</div>
		<select
			class=" select focus:outline-none focus:border-sky-500"
			bind:value={values.specialization}
		>
			<option class="bg-black focus:bg-gray-800" value="IT">IT</option>
			<option class="bg-black focus:bg-gray-800" value="ISE">ISE</option>
			<option class="bg-black focus:bg-gray-800" value="SE">SE</option>
			<option class="bg-black focus:bg-gray-800" value="IM">IM</option>
			<option class="bg-black focus:bg-gray-800" value="CS">CS</option>
			<option class="bg-black focus:bg-gray-800" value="DS">DS</option>
			<option class="bg-black focus:bg-gray-800" value="CSNE">CSNE</option>
		</select>
	</div>

	<div>
		<div class=" text-sky-500">Batch</div>
		<select class=" select focus:outline-none focus:border-sky-500" bind:value={values.batch}>
			<option class="bg-black focus:bg-gray-800" value="WE">Weekend</option>
			<option class="bg-black focus:bg-gray-800" value="WD">Weekday</option>
			<option class="bg-black focus:bg-gray-800" value="Mix">Mix</option>
		</select>
	</div>
</div>

<Button {loading} on:click={getGroups}>Search</Button>

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
