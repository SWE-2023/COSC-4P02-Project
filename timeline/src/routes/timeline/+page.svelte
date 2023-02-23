<script>
	import { scale } from 'svelte/transition';
 	import PageTransition from '../../components/PageTransition.svelte';
	import TimeLineItem from "../../components/TimeLineItem.svelte";

	let timeData = [
		{
			id: '1850',
			title:'War of 1850',
			picture: 'War of 1850 picture',
			text: 'Description about war of 1850'

		},
		{
			id: '1854',
			title:'War of 1854',
			picture: 'War of 1854 picture',
			text: 'Description about war of 1854'
		},
		{
			id: '1855',
			title:'War of 1855',
			picture: 'War of 1855 picture',
			text: 'Description about war of 1855'
		},
		{
			id: '1860',
			title:'War of 1860',
			picture: 'War of 1860 picture',
			text: 'Description about war of 1860'
		},
		{
			id: '1870',
			title:'War of 1870',
			picture: 'War of 1870 picture',
			text: 'Description about war of 1870'
		},
		{
			id: '1872',
			title:'War of 1872',
			picture: 'War of 1872 picture',
			text: 'Description about war of 1872'
		},
		{
			id: '1874',
			title:'War of 1874',
			picture: 'War of 1874 picture',
			text: 'Description about war of 1874'
		},
		{
			id: '1882',
			title:'War of 1882',
			picture: 'War of 1882 picture',
			text: 'Description about war of 1882' 
		},
		{
			id: '1940',
			title:'War of 1940',
			picture: 'War of 1940 picture',
			text: 'Description about war of 1940'
		},
		{
			id: '1946',
			title:'War of 1946',
			picture: 'War of 1946 picture',
			text: 'Description about war of 1946'
		},
		{
			id: '1990',
			title:'War of 1990',
			picture: 'War of 1990 picture',
			text: 'Description about war of 199 0'
		},	
	]


	let lineHeight = window.innerHeight*0.75; // set line height to 75% of screen height
	function getSpacing(key){
		let top = timeData[0].id;
		let buttom = timeData[timeData.length-1].id; 
		
		if(key == top){ 
			return 0;
		}else if(key == buttom){
			return lineHeight;
		}else{
			return findHeight(key); 
		}
	}	

	function findHeight(key){
		let total = 0;
		let point = 0;
		for(let i=0; i<timeData.length; i++){
			if(timeData[i].id == key){
				point = i;
			}
		}
		
		while(point > 0){
			total += (parseInt(timeData[point].id) - parseInt(timeData[point-1].id));
			point--;
		}

		return total;
	}
	
	let title = timeData[0].title;
	let picture = timeData[0].picture;
	let text = timeData[0].text;

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
				{#each timeData as td(td.id)}	
					<TimeLineItem item={td} spacing={getSpacing(td.id)} currentTitle={title} currentPicture={picture} currentText={text}/>   
					<!-- <TimeLineItem item={td} spacing={10}/>  -->
				{/each}
			</div>  		 
		</section>
		<section class="item-components">
			<div class="picture" >
				<h1>{picture}</h1>
			</div>
			<div class="text">
				<h1>{title}</h1>
				<p>{text}</p>
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