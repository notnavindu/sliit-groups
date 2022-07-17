<script lang="ts">
	import { auth, firestore } from '../../../ts/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Group from '$lib/components/Group.svelte';
	import Button from '$lib/components/Button.svelte';

	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import { emailRegex } from '$lib/constants/regex';

	let values;

	let data;
	let error = '';
	let loading = false;

	onMount(() => {
		const docRef = doc(firestore, 'groups', $page.params.id);
		getDoc(docRef).then((snap) => {
			data = snap.data();
			values = snap.data();
		});
	});

	const save = async () => {
		error = null;
		if (
			!values.name ||
			!values.description ||
			!values.year ||
			!values.semester ||
			!values.specialization ||
			!values.batch ||
			values.max <= 0 ||
			values.available <= 0 ||
			!values.leaderName ||
			!values.leaderEmail ||
			!values.leaderPhone
		) {
			error = 'Fill all fields!';
			return;
		}

		if (values.available > values.max) {
			error = 'Available slots should be smaller than maximum';
			return;
		}

		if (String(values.leaderPhone).length !== 10) {
			error = 'Phone number must be 10 digits';
			return;
		}

		if (!String(values.leaderEmail).match(emailRegex)) {
			error = 'Invalid Email';
			return;
		}

		try {
			loading = true;

			setDoc(doc(firestore, 'groups', $page.params.id), {
				...values,
				uid: auth.currentUser.uid,
				time: serverTimestamp(),
				promoted: false
			}).then((doc) => {
				goto(`/${$page.params.id}`, { replaceState: true });
			});
		} catch (e) {
			console.error('Error adding document: ', e);
			loading = false;
		}
	};
</script>

{#if values}
	<TextInput label="Group Name" placeholder="Silicon Dealers" bind:value={values.name} />

	<label class="flex flex-col mt-8 gap-2">
		<span class="text-sky-500">Group Description</span>
		<textarea
			bind:value={values.description}
			placeholder="About, Requirements, Team Culture..."
			class="border border-gray-400 focus:outline-none focus:border-sky-500 outline-2 bg-transparent rounded-md w-full max-w-xl px-2 py-3"
		/>
	</label>

	<div class="w-full flex items-end gap-6">
		<TextInput
			label="Available Slots"
			type="number"
			placeholder="3"
			bind:value={values.available}
		/>
		<TextInput
			label="Maximum No. of members"
			type="number"
			bind:value={values.max}
			placeholder="4"
		/>
	</div>

	<div class="mt-8 text-sky-500 ">Academic Year</div>
	<select class="select focus:outline-none focus:border-sky-500" bind:value={values.year}>
		<option class="bg-black focus:bg-gray-800" value="1">Year 1</option>
		<option class="bg-black focus:bg-gray-800" value="2">Year 2</option>
		<option class="bg-black focus:bg-gray-800" value="3">Year 3</option>
		<option class="bg-black focus:bg-gray-800" value="4">Year 4</option>
	</select>

	<div class="mt-8 text-sky-500">Semester</div>
	<select class=" select focus:outline-none focus:border-sky-500" bind:value={values.semester}>
		<option class="bg-black focus:bg-gray-800" value="1">Semester 1</option>
		<option class="bg-black focus:bg-gray-800" value="2">Semester 2</option>
	</select>

	<div class="mt-8 text-sky-500">Specialization</div>
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

	<div class="mt-8 text-sky-500">Batch</div>
	<select class=" select focus:outline-none focus:border-sky-500" bind:value={values.batch}>
		<option class="bg-black focus:bg-gray-800" value="WE">Weekend</option>
		<option class="bg-black focus:bg-gray-800" value="WD">Weekday</option>
		<option class="bg-black focus:bg-gray-800" value="Mix">Mix</option>
	</select>

	<TextInput label="Your" placeholder="Sarath Semicolonsinghe" bind:value={values.leaderName} />
	<TextInput
		label="Your Phone Number"
		type="text"
		placeholder="071 234 3432"
		bind:value={values.leaderPhone}
	/>
	<TextInput label="Your Email" placeholder="semicee@gmail.com" bind:value={values.leaderEmail} />

	<div class="text-xl text-sky-500 font-bold mt-8 mb-4">Preview</div>

	<Group {values} />

	{#if error}
		<div class="mt-4 mb-2 text-red-500 w-full text-center">{error}</div>
	{/if}

	<Button {loading} on:click={save}>Save</Button>
{:else}
	<div class="w-full h-screen grid place-items-center">
		<div class="absolute w-12 h-12 bg-white rounded-full animate-ping" />
	</div>
{/if}

<style lang="postcss">
	.select {
		@apply mt-2 w-full h-11 px-3 rounded-lg bg-black border border-gray-400;
	}
</style>
