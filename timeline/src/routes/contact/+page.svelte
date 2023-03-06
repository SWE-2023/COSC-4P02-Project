<script>
	import { fade } from "svelte/transition";
	import PageTransition from "../../components/PageTransitionFly.svelte";
</script>

<svelte:head>
	<title>Contact | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Contact page" />
</svelte:head>

<PageTransition>
	<section class="page" in:fade>
		<h1>Contact the Museum</h1>
		<p>
			Visit the <a href="https://www.notlmuseum.ca"
				>Niagara-on-the-Lake Museum</a
			>.
		</p>
	</section>
</PageTransition>
