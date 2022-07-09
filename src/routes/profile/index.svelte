<script>
	import { auth, firestore } from '../../ts/firebase';
	import { signOut } from 'firebase/auth';
	import { query, orderBy, collection, getDocs, where } from 'firebase/firestore';
	import { doc, deleteDoc } from 'firebase/firestore';

	import { onMount } from 'svelte';
	import Delete from '$lib/icons/delete.icon.svelte';
	import NewFab from '$lib/components/NewFab.svelte';
	import Edit from '$lib/icons/edit.icon.svelte';
	import FaArrowLeft from 'svelte-icons/fa/FaArrowLeft.svelte';
	import FaSignOutAlt from 'svelte-icons/fa/FaSignOutAlt.svelte';

	import { goto } from '$app/navigation';

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

	const logout = () => {
		signOut(auth)
			.then(() => {
				goto('/login');
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>

<div class="w-full flex justify-between mb-8">
	<div class="w-6 cursor-pointer" on:click={() => goto('/')}><FaArrowLeft /></div>
	<div class="w-6 cursor-pointer" on:click={logout} title="Log out"><FaSignOutAlt /></div>
</div>

<div class="text-2xl text-sky-500 font-bold">Hello, {auth?.currentUser?.displayName}</div>
<div class="text-lg text-white mt-8">Your Groups</div>

<div class:blur-sm={loading}>
	{#if data}
		{#if data.length === 0}
			<div class="mt-8 text-zinc-600">
				<div>You haven't created any groups</div>
				<div>You can create one <a href="/profile/new" class="text-sky-500">here.</a></div>
			</div>
		{/if}

		{#each data as item}
			<div class="w-full px-3 py-2 bg-zinc-800 mt-2 rounded-md flex gap-5 justify-between">
				<div>
					<div class="font-bold text-sky-500">
						<a href={`/${item.id}`}>{item.name}</a>
					</div>
					<div class="text-xs text-zinc-300">{item.description}</div>
				</div>
				<div class="flex gap-4">
					<div
						class="w-4 flex items-center justify-center text-white cursor-pointer"
						on:click={() => goto(`/profile/edit/${item.id}`)}
					>
						<Edit />
					</div>
					<div
						class="w-4 flex items-center justify-center text-red-500 cursor-pointer"
						on:click={() => deleteGroup(item.id)}
					>
						<Delete />
					</div>
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
