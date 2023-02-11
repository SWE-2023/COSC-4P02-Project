<script>
	import { fade } from 'svelte/transition';
	import PageTransition from '../../components/PageTransition.svelte';
</script>

<PageTransition>
<section in:fade>
	<h1>About</h1>
	<p>Sample Text</p>
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