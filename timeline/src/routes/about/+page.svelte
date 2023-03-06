<script>
	import { fade } from "svelte/transition";
	import PageTransition from "../../components/PageTransitionFly.svelte";
</script>

<svelte:head>
	<title>About | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="About page" />
</svelte:head>

<PageTransition>
	<section class="page" in:fade>
		<h1>About</h1>
		<p>Sample Text</p>
	</section>
</PageTransition>

<style>
</style>
