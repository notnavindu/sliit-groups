<script>
	import { goto } from '$app/navigation';

	import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { auth } from '../ts/firebase';

	import FaGoogle from 'svelte-icons/fa/FaGoogle.svelte';

	const actionLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
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
	<button
		class="flex space-x-6 items-center px-12 py-4 rounded-md  bg-gradient-to-r from-sky-500 to-sky-700 hover:scale-95 transition-transform hover:duration-300 duration-500 ease-in "
		on:click={actionLogin}
	>
		<div class="h-6 w-6 ">
			<FaGoogle />
		</div>
		<p class="text-base sm:text-lg font-medium">Sign in with Google</p>
	</button>
</div>
