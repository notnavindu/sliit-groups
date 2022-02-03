<script lang="ts">
	export let label = '';
	export let placeholder = '';
	export let value;
	export let type: 'text' | 'number' = 'text';
</script>

{#if type === 'text'}
	<label class=" flex flex-col mt-8 gap-2">
		<span class="text-sky-500">{label}</span>

		<input
			type="text"
			{placeholder}
			bind:value
			class="border border-gray-400 focus:outline-none focus:border-sky-500 outline-2 bg-transparent rounded-md w-full px-2 py-3"
		/>
	</label>
{/if}

{#if type === 'number'}
	<label class=" flex flex-col mt-8 gap-2">
		<span class="text-sky-500">{label}</span>

		<input
			type="number"
			{placeholder}
			bind:value
			class="border border-gray-400 focus:outline-none focus:border-sky-500 outline-2 bg-transparent rounded-md w-full px-2 py-3"
		/>
	</label>
{/if}
