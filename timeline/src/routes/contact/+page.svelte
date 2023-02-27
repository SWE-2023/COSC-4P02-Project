<script>
	import { fade } from 'svelte/transition';
	import PageTransition from '../../components/PageTransition.svelte';
</script>

<svelte:head>
	<title>Contact | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Contact page" />
</svelte:head>

<PageTransition>
	<section in:fade>
		<h1 id="text">Contact the Museum</h1>
		<p id="text">
			Visit the <a href="https://www.notlmuseum.ca"
				>Niagara-on-the-Lake Museum</a
			>.
		</p>
	</section>
</PageTransition>

<style>
	h1 {
		font-family: var(--font-serif);
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

