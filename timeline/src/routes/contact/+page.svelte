<script>
	import { fade } from 'svelte/transition';
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<section in:fade>
	<h1>Contact the Museum</h1>
	<p>Visit the <a href="https://www.notlmuseum.ca">Niagara-on-the-Lake Museum</a>.</p>
</section>

<style>
	h1 {
		font-family: Georgia, 'Times New Roman', Times, serif;
		padding: 2em 0 0 0;
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
	}
	p {
		padding: 1em 0 1em 0;
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0;
		text-align: center;
		text-transform: uppercase;
	}
</style>