<script>
	import { scale } from "svelte/transition";
	import PageTransition from "../../components/PageTransition.svelte";
	import TimeLineItem from "../../components/TimeLineItem.svelte";
	import Arrow from "../../components/Arrow.svelte";
	import ItemComponents from "../../components/ItemComponents.svelte";

	let timeData = [
		{
			id: "1720",
			creation_date: "",
			title: "The Battle for the Throne of 1720",
			image: "War of 1720 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "March 15, 1720",
		},
		{
			id: "1850",
			creation_date: "",
			title: "The Great War of 1850",
			image: "War of 1850 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "September 28, 1850",
		},
		{
			id: "1854",
			creation_date: "",
			title: "The Battle for Freedom of 1854",
			image: "War of 1854 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "June 2, 1854",
		},
		{
			id: "1855",
			creation_date: "",
			title: "The Battle for Independence of 1855",
			image: "War of 1855 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "December 11, 1855",
		},
		{
			id: "1860",
			creation_date: "",
			title: "The War for the Crown of 1860",
			image: "War of 1860 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "August 3, 1860",
		},
		{
			id: "1870",
			creation_date: "",
			title: "The Battle for Territory of 1870",
			image: "War of 1870 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "July 9, 1870",
		},
		{
			id: "1872",
			creation_date: "",
			title: "The Siege of the Capital of 1872",
			image: "War of 1872 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "November 6, 1872",
		},
		{
			id: "1874",
			creation_date: "",
			title: "The Battle for Unity of 1874",
			image: "War of 1874 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "May 18, 1874",
		},
		{
			id: "1882",
			creation_date: "",
			title: "The War for Resources of 1882",
			image: "War of 1882 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "April 27, 1882",
		},
		{
			id: "1940",
			creation_date: "",
			title: "The World War of 1940",
			image: "War of 1940 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "November 29, 1940",
		},
		{
			id: "1946",
			creation_date: "",
			title: "The Cold War of 1946",
			image: "War of 1946 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "July 16, 1946",
		},
		{
			id: "1990",
			creation_date: "",
			title: "The War for Equality of 1990",
			image: "War of 1990 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "February 1, 1990",
		},
		{
			id: "2020",
			creation_date: "",
			title: "The Cyber War of 2020",
			image: "War of 2020 picture",
			image_credit: "https://placeholder.com/",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, nisl ut maximus faucibus, nisi mi luctus mauris, ac auctor elit elit eu tortor. Sed aliquam sapien sed eros finibus feugiat. Sed elementum magna quis tortor tristique, at congue libero hendrerit. Duis rutrum ipsum eu enim ullamcorper, nec mattis orci efficitur. Nullam quis urna vel eros pretium suscipit. Sed viverra, nisi vel rutrum finibus, orci urna ullamcorper elit, non bibendum dolor elit euismod lacus. Praesent eget felis dui. Suspendisse ut nisl in nisi ornare vulputate. Praesent vel ipsum euismod, molestie quam a, auctor turpis.",
			start_date: "October 22, 2020",
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

	let selectedItem = timeData[0];
	let currentTitle = timeData[0].title;
	let currentImage = "assets/placeholder.jpg"; //placeholder
	let currentImage_credit = timeData[0].image_credit;
	let currentBody = timeData[0].body;
	let currentStart_date = timeData[0].start_date;

	function setComponenets() {
		currentTitle = selectedItem.title;
		currentImage = "assets/placeholder.jpg"; //placeholder
		currentImage_credit = selectedItem.image_credit;
		currentBody = selectedItem.body;
		currentStart_date = selectedItem.start_date;
	}

	let atFirst = true;
	let atLast = false;
	let currentIndex = 0;

	function updateIndex() {
		for (let i = 0; i < timeData.length; i++) {
			if (selectedItem == timeData[i]) {
				currentIndex = i;
				console.log("returned" + i);
			}
		}
	}

	function pageUp() {
		if (!atFirst) {
			selectedItem = timeData[currentIndex - 1];
			console.log(currentIndex);
		}
	}

	function pageDown() {
		if (!atLast) {
			selectedItem = timeData[currentIndex + 1];
			console.log(currentIndex);
		}
	}

	function updateAtFirst() {
		if (selectedItem == timeData[0]) {
			atFirst = true;
		} else {
			atFirst = false;
		}
	}

	function updateAtLast() {
		if (selectedItem == timeData[timeData.length - 1]) {
			atLast = true;
		} else {
			atLast = false;
		}
	}

</script>

<svelte:head>
	<title>Timeline | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Timeline page" />
</svelte:head>

<PageTransition>
	<Arrow
		alt={false}
		upFunction={pageUp}
		downFunction={pageDown}
		on:moveUp={updateAtFirst}
		on:moveUp={setComponenets}
		on:moveUp={updateIndex} />
		<span style="height:{timelineHeight}vh" class="line" />
		<section class="line-components">
			<div class="timeElements">
				{#each timeData as td (td.id)}
				<TimeLineItem
				item={td}
				spacing={getSpacing(td.id)}
				bind:currentItem={selectedItem}
				on:change={setComponenets}
				on:change={updateAtFirst}
				on:change={updateAtLast}
				on:change={updateIndex} />
				{/each}
				<ul class="timescale" style="height:{timelineHeight}vh;">
					{#each decades as decade}
					<li>{decade}</li>
					{/each}
				</ul>
			</div>
		</section>
		<section class="layout">
			<ItemComponents
				title={currentTitle}
				image={currentImage}
				image_credit={currentImage_credit}
				body={currentBody}
				start_date={currentStart_date} />
		</section>
		<Arrow
		alt={true}
		upFunction={pageUp}
		downFunction={pageDown}
		on:moveDown={updateAtLast}
		on:moveDown={setComponenets}
		on:moveDown={updateIndex} />
</PageTransition>

<style>
	.layout {
  		min-height: 72vh;
		display: flex;
		justify-content: center;
		align-items: center;
    
   
	}

	.line {
		position: fixed;
		width: 4px;
		background-color: var(--color-theme-1);
		left: 40px;
		transition: left 0.5s ease-in-out;
    
		

	}

	@media (max-width: 1000px) {
		.line {
			left: -2px;
		}
	}

	.line-components {
		position: fixed;
		left: 34px;
		transition: left 0.5s ease-in-out;
	}

	@media (max-width: 1000px) {
		.line-components {
			left: -9px;
		}
	}

	.timescale {
		user-select: none;
		z-index: -9;
		opacity: 1;
		list-style: none;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		left: 2.5rem;
		padding: 0;
		transition: left 0.5s ease-in-out;
	}

	@media (max-width: 1000px) {
		.timescale {
			left: 1.5rem;
		}
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
