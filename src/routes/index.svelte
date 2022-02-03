<script>
	import Group from '$lib/components/Group.svelte';
	import NewFab from '$lib/components/NewFab.svelte';
</script>

<div class="flex flex-col gap-2">
	{#each Array(5) as a}
		<Group />
	{/each}
</div>

<NewFab />
