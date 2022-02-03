<script>
	import { goto } from '$app/navigation';

	import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { auth } from '../ts/firebase';

	const actionLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	};

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				goto('/');
			}
		});
	});
</script>

<div>
	<button on:click={actionLogin}>login</button>
</div>
