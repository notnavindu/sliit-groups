<script>
	import { goto } from '$app/navigation';
	import { analytics } from '../ts/firebase';

	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import { logEvent } from 'firebase/analytics';
	import { onMount } from 'svelte';
	import { auth } from '../ts/firebase';

	const actionLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then(() => {
			logEvent(analytics, 'login');
		});
	};

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				goto('/');
			}
		});
	});
</script>

<div class="w-full flex justify-center my-12 ">
	<button class=" w-full max-w-[200px]" on:click={actionLogin}>
		<img alt="google sign in" src="/google-signin.png" />
	</button>
</div>
