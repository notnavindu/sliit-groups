<script>
	import { firestore, analytics } from '../ts/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { logEvent } from 'firebase/analytics';
	import { page } from '$app/stores';
	import Group from '$lib/components/Group.svelte';
	import FaArrowLeft from 'svelte-icons/fa/FaArrowLeft.svelte';

	import MdCall from 'svelte-icons/md/MdCall.svelte';
	import MdEmail from 'svelte-icons/md/MdEmail.svelte';
	import MdShare from 'svelte-icons/md/MdShare.svelte';

	import { onMount } from 'svelte';
	import { copyToClipboard } from '../ts/utils';

	let data;

	onMount(() => {
		logEvent(analytics, 'home');
		const docRef = doc(firestore, 'groups', $page.params.id);
		getDoc(docRef).then((snap) => {
			data = snap.data();
			console.log(snap.data());
		});
	});
</script>

{#if data}
	<div class="w-full flex justify-between mb-8 ">
		<div class="w-6 cursor-pointer" on:click={() => window.history.back()}><FaArrowLeft /></div>
	</div>

	<Group values={data} />
	<div class="w-full flex items-center justify-center mt-6 gap-4">
		<!-- Call btn -->
		<a href={`tel:${data.leaderPhone}`}>
			<div
				class="w-16 h-16 bg-sky-500 hover:scale-105 transition-all rounded-full flex items-center justify-center"
			>
				<div class="w-8 h-8 ">
					<MdCall />
				</div>
			</div>
		</a>

		<!-- Email -->
		<a href={`mailto:${data.leaderEmail}`}>
			<div
				class="w-16 h-16 bg-sky-500 hover:scale-105 transition-all rounded-full flex items-center justify-center"
			>
				<div class="w-8 h-8 ">
					<MdEmail />
				</div>
			</div>
		</a>

		<!-- Share -->
		<button on:click={() => copyToClipboard(window.location.href)}>
			<div
				class="w-16 h-16 bg-sky-500 hover:scale-105 transition-all rounded-full flex items-center justify-center"
			>
				<div class="w-8 h-8 ">
					<MdShare />
				</div>
			</div>
		</button>
	</div>
{:else}
	<div class="w-full h-screen grid place-items-center">
		<div class="absolute w-12 h-12 bg-white rounded-full animate-ping" />
	</div>
{/if}
