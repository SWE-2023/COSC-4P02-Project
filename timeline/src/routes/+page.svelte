<script>
	import Button from '../components/Button.svelte';
	import { fade } from 'svelte/transition';
	import { Card, Toggle } from "flowbite-svelte";

	let headerText = [
  		"Explore the rich history of our museum.",
  		"Uncover the stories behind our exhibits.",
  		"Discover our heritage.",
  		"Travel through time with us.",
	];

let currentOption = 0;

setInterval(() => {currentOption = (currentOption + 1) % headerText.length;}, 10000);

</script>

<svelte:head>
	<title>Home | Niagara-on-the-Lake Museum Timeline </title>
	<meta name="description" content="Niagara-on-the-Lake Museum Timeline" />
</svelte:head>

<section in:fade>
<section class="welcome" >
	<h1 class="title">Welcome to the<br><span style="color:var(--color-theme-1)">Niagara-on-the-Lake Museum</span> Timeline</h1>
	
	<!-- TODO add transitions between headers -->
	<h1 class="subtitle" in:fade>{headerText[currentOption]}</h1>
	
	<p class="subtext">A digital interactive timeline of the history of the Niagara-on-the-Lake Museum</p>
	<Button>View Timeline</Button>

</section>

<section class="timelines">
	<h1 class="title">Timelines</h1>
	<p class="subtext">Timelines can go here</p>
</section>

</section>

<style>
	.title {
		font-family: Georgia, 'Times New Roman', Times, serif;
		padding: 2em 0 0 0;
		text-align:start;
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
		animation: fadeIn 2.5s;
	}

	.subtitle {
		font-family: Georgia, 'Times New Roman', Times, serif;
		padding: 1em 0 0 0;
		text-align:start;
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0;
		/*animation: fadeIn 2.5s;*/
	}

	.subtext {
		
		padding: 1em 0 1em 0;
		text-align:start;
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0;
		text-transform: uppercase;
		animation: fadeIn 2.5s;
	}

	@keyframes fadeIn {
		0% {opacity: 0;}
		100% {opacity: 1;}
	}


</style>
