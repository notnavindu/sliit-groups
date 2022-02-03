<script lang="ts">
	import Group from '$lib/components/Group.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let values: group = {
		name: '',
		description: null,
		year: null,
		semester: null,
		specialization: null,
		batch: null,
		max: 0,
		available: 0,
		leaderName: null,
		leaderPhone: null,
		leaderEamil: null
	};
</script>

<div class="text-2xl text-sky-500 font-bold">Add your group</div>

<TextInput label="Group Name" placeholder="Silicon Dealers" bind:value={values.name} />

<label class="flex flex-col mt-8 gap-2">
	<span class="text-sky-500">Group Description</span>
	<!-- TODO: length check-->
	<textarea
		bind:value={values.description}
		placeholder="About, Requirements, Team Culture..."
		class="border border-gray-400 focus:outline-none focus:border-sky-500 outline-2 bg-transparent rounded-md w-full max-w-xl px-2 py-3"
	/>
</label>

<div class="w-full flex items-end gap-6">
	<TextInput label="Maximum No. of members" type="number" bind:value={values.max} placeholder="4" />
	<TextInput label="Available Slots" type="number" placeholder="3" bind:value={values.available} />
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
<select class=" select focus:outline-none focus:border-sky-500" bind:value={values.specialization}>
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

<TextInput
	label="Team Leader"
	placeholder="Sarath Semicolonsinghe"
	bind:value={values.leaderName}
/>
<TextInput
	label="Team Leader Phone Number"
	placeholder="071 234 3432"
	bind:value={values.leaderPhone}
/>
<TextInput
	label="Team Leader Email"
	placeholder="semicee@gmail.com"
	bind:value={values.leaderEamil}
/>

<div class="text-xl text-sky-500 font-bold mt-8 mb-4">Preview</div>

<Group {values} />

<style lang="postcss">
	.select {
		@apply mt-2 w-full max-w-sm h-11 px-3 rounded-lg bg-black border border-gray-400;
	}
</style>
