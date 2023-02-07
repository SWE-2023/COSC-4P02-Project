<script>
	import Button from '../components/Button.svelte';
	/* import TimeLineItem from "../components/TimeLineItem.svelte"; //for exporting timeline data to TimeLineItem.svelte*/
	import { fade } from 'svelte/transition';
	import { Card, Toggle } from "flowbite-svelte";

	
	let headerText = [
  		"Explore the rich history of our museum.",
  		"Uncover the stories behind our exhibits.",
  		"Discover our heritage.",
  		"Travel through time with us.",
	];

	const placeholder = new URL('../lib/images/placeholder.jpg',import.meta.url).href

	/*for testing time data placement 
	let timeData = [
		{
			id: '1882',
			title:'War of 1882'
			//page: 
		},
		{
			id: '1990',
			title:'War of 1990'
			//page:
		},
		{
			id: '1872',
			title:'War of 1872'
			//page:
		},
		{
			id: '1946',
			title:'War of 1946'
			//page:
		},
		{
			id: '1874',
			title:'War of 1874'
			//page:
		},
		{
			id: '1850',
			title:'War of 1850'
			//page:
		}
		
	]
	*/

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
	<div class="card">
		<img src={placeholder} alt="Image is temporarily unavaliable!"/>
		<div class="subtitle">Interactive Timline Tour </div>
		<div class = text> View the history of Niagara-on-the-Lake by exploring the interactive timeline. Clicking the button below to begin your journey.</div>
		<div class="button-container">
			<Button>Timeline</Button>
		</div>
	</div>
</section>

</section>

<!-- for testing time data placement
<section class=fakeTimeline>
	<div class="timeIcons">
		<div class="zoom"></div>
		<div class="unzoom"></div>
	</div>
	<div class="lineComponents">
		<div class="reactiveElements">
			<div class="timeElements">
				{#each timeData as td(td.id)}
   					<TimeLineItem item={td} />
				{/each}
				<span class = "line"></span>
			</div>  
		</div>	
		<div class = "navigation"> 
			<div class="leftButton"></div>
			<div class="rightButton"></div>
		</div>
	</div>	
</section> -->


<style>
	.title {
		font-family: Georgia, 'Times New Roman', Times, serif;
		padding: 2em 0 0 0;
		text-align:start;
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
	}

	.subtitle {
		font-family: Georgia, 'Times New Roman', Times, serif;
		padding: 1em 0 0 0;
		text-align:start;
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0;
	}

	.subtext {
		padding: 1em 0 1em 0;
		text-align:start;
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0;
		text-transform: uppercase;
	}

	.card {
		width: 500px;
		height: 630px;
		display: flex;
		flex-direction: column;
		border: 0.5rem;
		background-color: white;
		border-radius: 0.5rem;
	}

	.card .subtitle { 
		font-weight: 700;
		font-size: 30px;
		display: flex;
		width: 400px;
		padding-bottom: 20px;
		padding-left: 1em;
	}

	.card .text{
		font-weight: 600;
		padding-left: 2em;
		width: 400px;
	}

	.card img {
		border-top-left-radius: 0.5rem;
    	border-top-right-radius: 0.5rem;
		width:auto;
		height:380px;
	}

	.card .button-container {
		padding-top: 1em;
		padding-left: 2em;
	}

</style>
