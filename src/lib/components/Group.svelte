<script lang="ts">
	export let values: group;
</script>

<div class="w-full bg-zinc-800 p-3 rounded-md border border-sky-700">
	<div class="flex justify-between gap-4">
		<div class="font-bold text-lg leading-6">{values?.name || ''}</div>
	</div>

	<div class="flex flex-wrap gap-1 mt-2">
		<div class="chip bg-sky-500">Y{values?.year || ''}</div>
		<div class="chip bg-sky-600">S{values?.semester || ''}</div>
		<div class="chip bg-sky-700">{values?.specialization || ''}</div>
		<div class="chip bg-sky-800">{values?.batch || ''}</div>
	</div>

	<div class="mt-4 text-zinc-400 leading-5">
		{values?.description || ''}
	</div>

	<div class="w-full flex justify-between gap-3 leading-4 mt-4 text-sm text-zinc-300">
		<div>
			<div class="font-bold uppercase text-sky-500">Contact</div>
			<div>{values?.leaderName || ''}</div>
			<div>{values?.leaderPhone || ''}</div>
			<div>{values?.leaderEmail || ''}</div>
		</div>

		<div class="flex flex-col items-center justify-center text-red-400">
			<div class="text-4xl">{values?.available || 0}/{values?.max || 0}</div>
			<div class="text-xs">Spots Left</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.chip {
		@apply h-7 px-2 flex items-center justify-center rounded-md whitespace-nowrap text-sm font-bold;
	}
</style>
