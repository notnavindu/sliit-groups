<script>
	import FaRegUserCircle from 'svelte-icons/fa/FaRegUserCircle.svelte';
</script>

<div class="w-full py-4 px-4 shadow-lg bg-zinc-800">
	<div class="w-full max-w-3xl m-auto flex justify-between items-center">
		<div class="flex items-center gap-2 font-bold leading-4 tracking-wide">
			<a href="/">
				<div class="w-full h-full flex text-center justify-center">
					<div class="w-8 h-8 bg-sky-800 rounded-full animate-pulse delay-500" />
					<div class="absolute w-8 h-8 flex items-center justify-center">
						<div class="h-6 w-6 bg-sky-500 rounded-full animate-pulse delay-75" />
					</div>
					<div class="absolute w-8 h-8 flex items-center justify-center">
						<div class="h-4 w-4 bg-sky-300 rounded-full" />
					</div>
				</div>
			</a>

			<div>SLIIT<br />Groups</div>
		</div>

		<a href="/profile">
			<div class="w-6">
				<FaRegUserCircle />
			</div>
		</a>
	</div>
</div>
