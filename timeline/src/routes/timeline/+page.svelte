<script>
	import { scale } from "svelte/transition";
	import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
	import PageTransition from "../../components/PageTransition.svelte";
	import TimeLineItem from "../../components/TimeLineItem.svelte";
	import Fa from "svelte-fa/src/fa.svelte";
	import Cursor from "../../components/Cursor.svelte";

	let timeData = [
		{
			id: "1720",
			title: "War of 1720",
			picture: "War of 1720 picture",
			text: "Description about war of 1720",
			date: "random date in the year 1720",
		},
		{
			id: "1850",
			title: "War of 1850",
			picture: "War of 1850 picture",
			text: "Description about war of 1850",
			date: "random date in the year 1850",
		},
		{
			id: "1854",
			title: "War of 1854",
			picture: "War of 1854 picture",
			text: "Description about war of 1854",
			date: "random date in the year 1855",
		},
		{
			id: "1855",
			title: "War of 1855",
			picture: "War of 1855 picture",
			text: "Description about war of 1855",
			date: "random date in the year 1855",
		},
		{
			id: "1860",
			title: "War of 1860",
			picture: "War of 1860 picture",
			text: "Description about war of 1860",
			date: "random date in the year 1860",
		},
		{
			id: "1870",
			title: "War of 1870",
			picture: "War of 1870 picture",
			text: "Description about war of 1870",
			date: "random date in the year 1870",
		},
		{
			id: "1872",
			title: "War of 1872",
			picture: "War of 1872 picture",
			text: "Description about war of 1872",
			date: "random date in the year 1872",
		},
		{
			id: "1874",
			title: "War of 1874",
			picture: "War of 1874 picture",
			text: "Description about war of 1874",
			date: "random date in the year 1874",
		},
		{
			id: "1882",
			title: "War of 1882",
			picture: "War of 1882 picture",
			text: "Description about war of 1882",
			date: "random date in the year 1882",
		},
		{
			id: "1940",
			title: "War of 1940",
			picture: "War of 1940 picture",
			text: "Description about war of 1940",
			date: "random date in the year 1940",
		},
		{
			id: "1946",
			title: "War of 1946",
			picture: "War of 1946 picture",
			text: "Description about war of 1946",
			date: "random date in the year 1946",
		},
		{
			id: "1990",
			title: "War of 1990",
			picture: "War of 1990 picture",
			text: "Description about war of 1990",
			date: "random date in the year 1940",
		},
		{
			id: "2020",
			title: "War of 2020",
			picture: "War of 2020 picture",
			text: "Description about war of 2020",
			date: "random date in the year 2020",
		},
	];

	const gap = 20; // values lower than 10 will cause issues in a 1080p screen
	const timelineHeight = 80; // in vh

	const decades = [];
	const lowest = Math.floor(parseInt(timeData[0].id) / gap) * gap; // round down to nearest 20 year
	const highest =
		Math.ceil(parseInt(timeData[timeData.length - 1].id) / gap) * gap; // round up to nearest 20 year

	for (let i = lowest; i <= highest; i += gap) {
		decades.push(i);
	}

	// reworked spacing function
	function getSpacing(key) {
		const top = lowest;
		const bottom = highest;
		const current = parseInt(key);

		const percentage = (current - top) / (bottom - top);
		const spacing = percentage * (timelineHeight - 2);

		return spacing;
	}

	let title;
	let picture;
	let text;
	for (let i = 0; i < timeData.length; i++) {
		title = timeData[i].title;
		picture = timeData[i].picture;
		text = timeData[i].text;
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
				<span style="height:{timelineHeight}vh" class="line" />
				{#each timeData as td (td.id)}
					<TimeLineItem
						item={td}
						spacing={getSpacing(td.id)}
						currentTitle={title}
						currentPicture={picture}
						currentText={text} />
						
					<!-- 'decade' markers -->
				{/each}
				<ul class="timescale" style="height:{timelineHeight}vh;">
					{#each decades as decade}
						<li>{decade}</li>
					{/each}
				</ul>
			</div>
		</section>
		<section class="item-components">
			<div class="upper">
				<button class="first">
					<Fa icon={faCaretUp} />
				</button>
			</div>

			<div class="picture">
				<img alt="" src={picture} />
			</div>
			<div class="text">
				<h1>{title}</h1>
				<p>{text}</p>
			</div>

			<div class="lower">
				<button class="second">
					<Fa icon={faCaretDown} />
				</button>
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

	img {
		width: 100%;
		object-fit: cover;
		margin: 1rem 0rem;
		border-radius: 1rem;
		box-shadow: 1rem 0rem 32px 0 #00000044;
	}

	p {
		padding: 1em 0 1em 0;
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0;
		text-align: center;
		text-transform: uppercase;
	}
	
	.upper {
		display: flex; /* or grid */
		justify-content: center;
		align-items: center;
	}

	.first {
		cursor: pointer;
		background-color: none;
		border: none;
		padding: 0;
	}

	.second {
		cursor: pointer;
		background-color: transparent;
		border: none;
		padding: 0;
	}

	.lower {
		display: flex; /* or grid */
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.layout {
		display: flex;
		flex-direction: row;
	}

	.picture,
	.text {
		margin: 2rem;
	}

	.line {
		position: fixed;
		width: 4px;
		background-color: var(--color-theme-1);
		left: 41px;
	}

	.line-components {
		position: fixed;
		left: -9px;
	}

	.item-components {
		display: block;
		display: block;
		flex-direction: row;
	}

	.timescale {
		z-index: -9;
		opacity: 1;
		list-style: none;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		left: 5rem;
		padding: 0;
		transition: padding 0.5s ease;
	}

	li {
		opacity: 0.8;
		transition: color 0.5s ease;
		cursor: default;
	}

	li:hover {
		opacity: 0.9;
	}
</style>
