<script>
	import { slide } from "svelte/transition";
	import PageTransition from "$lib/components/PageTransitionFly.svelte";
</script>

<svelte:head>
	<title>About | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Contact page" />
</svelte:head>

<PageTransition>
	<section class="page" in:slide>
		<div>
			<h1>Contact Us</h1>
			
		</div>
	</section>
	<big-gap/>
</PageTransition>

<style>
	h1 {
		text-align: center;
        font-size: 70px;
	}

	section {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}

	section p {
		flex: 1 1 50%;
		text-align: justify;
		display: flex;
		align-items: center;
		flex-flow: column;
		margin: 0 auto;
		max-width: 40rem;
	}

	img {
		flex: 1 1 50%;
		display: flex;
		margin: 0 auto;
		width: 100%;
		max-width: 30rem;
	}

	.row {
		gap: 3rem;
	}
</style>