<script>
	import { scale } from 'svelte/transition';
 	import PageTransition from '../../components/PageTransition.svelte';
</script>

<svelte:head>
	<title>Timeline | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Timeline page" />
</svelte:head>

<PageTransition>
	<!-- THIS IS WHERE TIMELINE HTML WILL GO -->
	<!-- Create components in the components folder for reusability -->
	<!-- Check Svelte documentation and look at examples like Button -->

	<div class="container" >
		<h1>Timeline Page</h1>
		<p>Placeholder Page for the Timeline</p>
	</div>

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