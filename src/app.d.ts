/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare namespace App {
	interface Locals {}

	interface Platform {}

	interface Session {}

	interface Stuff {}
}

interface group {
	name: string;
	description: string;
	year: 1 | 2 | 3 | 4;
	semester: 1 | 2;
	specialization: string;
	batch: 'WE' | 'WD' | 'Mix';
	max: number;
	available: number;
	leaderName: string;
	leaderPhone: number;
	leaderEmail: string;
}
