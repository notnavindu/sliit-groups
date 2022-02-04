<script>
	import { auth, firestore } from '../../ts/firebase';
	import { query, orderBy, collection, getDocs, where } from 'firebase/firestore';
	import { doc, deleteDoc } from 'firebase/firestore';

	import { onMount } from 'svelte';
	import Delete from '$lib/icons/delete.icon.svelte';
	import NewFab from '$lib/components/NewFab.svelte';

	let data;
	let loading = true;

	onMount(async () => {
		getData();
	});

	const getData = async () => {
		const groupRef = collection(firestore, 'groups');
		const q = query(groupRef, where('uid', '==', auth.currentUser.uid));
		let docSnap = await getDocs(q);
		data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		loading = false;
	};

	const deleteGroup = (id) => {
		loading = true;
		if (confirm('Are you sure you want to delete this group?')) {
			deleteDoc(doc(firestore, 'groups', id)).then(() => {
				getData();
			});
		}
	};
</script>

<div class="text-2xl text-sky-500 font-bold">Hello {auth?.currentUser?.displayName}</div>
<div class="text-lg text-white mt-8">Your Groups</div>

<div class:blur-sm={loading}>
	{#if data}
		{#each data as item}
			<div class="w-full px-3 py-2 bg-zinc-800 mt-2 rounded-md flex gap-5 justify-between">
				<div>
					<div class="font-bold text-sky-500">
						{item.name}
					</div>
					<div class="text-xs text-zinc-300">{item.description}</div>
				</div>
				<div
					class="w-4 flex items-center justify-center text-red-500 cursor-pointer"
					on:click={() => deleteGroup(item.id)}
				>
					<Delete />
				</div>
			</div>
		{/each}
	{:else}
		<div class="w-full h-full absolute top-0 left-0 grid place-content-center ">
			<div class="w-114 h-14 rounded-full bg-white animate-ping" />
		</div>
	{/if}
</div>

<NewFab />
