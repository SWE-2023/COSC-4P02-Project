<script>
	import { scale } from 'svelte/transition';
 	import PageTransition from '../../components/PageTransition.svelte';
	import TimeLineItem from "../../components/TimeLineItem.svelte";

	let timeData = [
		{
			id: '1850',
			title:'War of 1850'
			//page:
		},
		{
			id: '1854',
			title:'War of 1854'
			//page:
		},
		{
			id: '1855',
			title:'War of 1855'
			//page:
		},
		{
			id: '1870',
			title:'War of 1870'
			//page:
		},
		{
			id: '1872',
			title:'War of 1872'
			//page:
		},
		{
			id: '1874',
			title:'War of 1874'
			//page:
		},
		{
			id: '1882',
			title:'War of 1882'
			//page: 
		},
		{
			id: '1940',
			title:'War of 1940'
			//page:
		},
		{
			id: '1946',
			title:'War of 1946'
			//page:
		},
		{
			id: '1990',
			title:'War of 1990'
			//page:
		},	
	]

	let lineHeight = window.innerHeight*0.75; // set line height to 75% of screen height
	function getSpacing(key){
		let top = timeData[0].id;
		let button = timeData[timeData.length-1].id; 
		
		if(key == top){ 
			return 0;
		}else if(key == button){
			return lineHeight;
		}else{
			return parseInt(key)/parseInt(button); //needs improvement 
		}
	}
	
	
</script>

<svelte:head>
	<title>Timeline | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Timeline page" />
</svelte:head>

<PageTransition>
	<section class="layout">
		<section class="line-components">
			<div class="timeElements">
				<span style="height: {lineHeight}px" class="line"></span>
				{#each timeData as td(td.id)}	<TimeLineItem item={td} spacing={getSpacing(td.id)}/>   
					<!-- <TimeLineItem item={td} spacing={10}/>  -->
				{/each}
			</div>  		 
		</section>
		<section class="item-components">
			<div class="picture" >
				<h1>pic goes here</h1>
			</div>
			<div class="text">
				<h1>text</h1>
				<p>text goes here</p>
			</div>
		</section>
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

	.layout {
		display: flex;
		flex-direction: row;
		height: 100%;
	}
	
	.picture, .text {
		margin: 5rem;	
	}
	
	.line {
		content: " ";
		position :absolute;
		width: 5px;
		background-color: brown;
	}

	.line-components {
		position: relative;
		right: 150px;
		padding: 3rem;
	}
	
	.item-components {
		display: flex;
		flex-direction: row;
	}

</style>