<script>
	import { auth, firestore } from '../../ts/firebase';
	import { query, orderBy, collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let data;

	onMount(async () => {
		const groupRef = collection(firestore, 'groups');

		const q = query(groupRef, orderBy('time', 'desc'));

		// let docSnap = await getDocs(q);

		// data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	});
</script>

<div class="text-2xl text-sky-500 font-bold">Profile {auth?.currentUser?.displayName}</div>
<div class="text-lg text-white mt-8">Your Groups</div>
