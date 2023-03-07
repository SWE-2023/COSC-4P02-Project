<script>
	import Button from "$lib/components/Button.svelte";
	import { slide } from "svelte/transition";
	import PageTransitionFly from "$lib/components/PageTransitionFly.svelte";

	let headerText = [
		"Explore the rich history of our town.",
		"Discover our heritage.",
		"Travel through time with us.",
	];

	let currentOption = 0;
	setInterval(() => {
		currentOption = (currentOption + 1) % headerText.length;
	}, 7500);
</script>

<svelte:head>
	<title>Home | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Niagara-on-the-Lake History Timeline" />
</svelte:head>

<PageTransitionFly>
	<section class="welcome">
		<h1 class="title">
			Welcome to the<br /><span style="color:var(--color-theme-1)"
				>Niagara-on-the-Lake</span> Timeline
		</h1>

		{#key headerText[currentOption]}
			<h1 class="subtitle" transition:slide>{headerText[currentOption]}</h1>
		{/key}

		<p class="subtext">
			An interactive timeline of the history of the Niagara-on-the-Lake
		</p>
		<div style="display:inline-block">
			<Button href="/timeline" text="Explore the Timeline" />
		</div>
	</section>
</PageTransitionFly>

<style>
	.title {
		font-family: Georgia, "Times New Roman", Times, serif;
		padding: 2em 0 0 0;
		text-align: start;
		font-size: var(--font-size-xxxlarge);
		font-weight: 700;
		margin: 0;
	}

	.subtitle {
		font-family: var(--font-serif);
		padding: 1em 0 0 0;
		text-align: start;
		font-size: var(--font-size-xxlarge);
		font-weight: 700;
		margin: 0;
	}

	.subtext {
		padding: 1em 0 1em 0;
		text-align: start;
		font-size: var(--font-size-medium);
		font-weight: 800;
		margin: 0;
		text-transform: uppercase;
	}

	@media (max-width: 1000px) {
		.title {
			font-size: var(--font-size-xxlarge);
		}

		.subtitle {
			font-size: var(--font-size-medium);
		}

		.subtext {
			font-size: var(--font-size-small);
		}
	}
</style>
