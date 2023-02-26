<script>
	import Button from "../components/Button.svelte";
	import { fade } from "svelte/transition";
	import PageTransition from "../components/PageTransitionFly.svelte";

	let headerText = [
		"Explore the rich history of our town.",
		"Discover our heritage.",
		"Travel through time with us.",
	];

	let currentOption = 0;
	setInterval(() => {
		currentOption = (currentOption + 1) % headerText.length;
	}, 10000);
</script>

<svelte:head>
	<title>Home | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Niagara-on-the-Lake History Timeline" />
</svelte:head>

<PageTransition>
	<section class="welcome">
		<h1 class="title">
			Welcome to the<br /><span style="color:var(--color-theme-1)"
				>Niagara-on-the-Lake</span> Timeline
		</h1>

		<!-- TODO add transitions between headers -->
		<h1 class="subtitle" in:fade>{headerText[currentOption]}</h1>

		<p class="subtext">
			A digital interactive timeline of the history of the Niagara-on-the-Lake
		</p>

		<Button href="/timeline" text="Explore the Timeline" />
	</section>
</PageTransition>

<style>
	.title {
		font-family: Georgia, "Times New Roman", Times, serif;
		padding: 2em 0 0 0;
		text-align: start;
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
	}

	.subtitle {
		font-family: var(--font-serif);
		padding: 1em 0 0 0;
		text-align: start;
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0;
	}

	.subtext {
		padding: 1em 0 1em 0;
		text-align: start;
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0;
		text-transform: uppercase;
	}
</style>
