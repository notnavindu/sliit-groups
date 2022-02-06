<script>
	export let loading;
</script>

<button
	class="w-full bg-gradient-to-r from-sky-500 to-sky-700 px-3 py-3 mb-8 mt-4 rounded-md font-bold flex justify-center items-center gap-2"
	class:bg-zinc-500={loading}
	class:pointer-events-none={loading}
	disabled={loading}
	on:click
>
	<div class="absolute w-6 h-6 bg-white rounded-full animate-ping" class:hidden={!loading} />
	<div class:opacity-0={loading}>
		<slot />
	</div>
</button>
