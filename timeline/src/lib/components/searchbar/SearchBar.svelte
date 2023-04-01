<script>
// @ts-nocheck

	import { createEventDispatcher } from "svelte";
	import DropDownItem from "$lib/components/searchbar/DropDownItem.svelte";

	export let selection;
	export let data;
	export let lock;

	let filtered = [];
	let search = "";
	let clicked = false;
	let screenWidth;

	const dispatch = createEventDispatcher();
	const notify = () => dispatch("selection");

	const findTitles = () => {
		const keywords = search.toLowerCase().split(" ");
		filtered = data
			.filter((item) => {
				return keywords.every((keyword) =>
					(item.title.toLowerCase() + " " + item.year).includes(keyword)
				);
			})
			.slice(0, 10); // max 10
	};

	function handleClickOutside(event) {
		if (event.target.closest(".search-container")) return;
		clicked = true;
	}

	function handleShortcut(event) {
		if (event.key == "/" && !event.target.closest("input")) {
			event.preventDefault();
			document.querySelector("html").scrollTo(0, 0);
			document.querySelector("input").focus();
		}
	}
</script>

<svelte:window
	bind:innerWidth={screenWidth}
	on:click={handleClickOutside}
	on:keydown={handleShortcut} />

<div class="search-container" style={lock ? `top:-10rem !important;` : ``}>
	<div class="bar">
		<input
			type="text"
			disabled={lock}
			placeholder="Search"
			class={clicked && filtered.length == 0 && !search
				? "search-box"
				: "search-box has-results"}
			bind:value={search}
			on:click={() => (clicked = false)}
			on:input={() => {
				findTitles();
				clicked = false;
			}} />
		{#if search}
			<span
				class="material-symbols-rounded i"
				on:keydown
				on:click={() => (search = "")}>
				close
			</span>
		{:else}
			<span class="material-symbols-rounded i"> search </span>
		{/if}
	</div>
	{#if search && !clicked && filtered.length > 0}
		<div class="results">
			{#each filtered as data}
				<DropDownItem
					bind:selectedTitle={selection}
					item={data}
					on:selection={notify}
					on:selection={() => (clicked = true)} />
			{/each}
		</div>
	{:else}
		<div class="results" style="pointer-events:none;">
			<DropDownItem
				color="grey"
				bind:selectedTitle={selection}
				item="No Results" />
		</div>
	{/if}
</div>

<style>
	:root {
		--width: calc(20 * var(--font-size-base));
		--height: calc(2 * var(--font-size-base));
	}

	.search-container {
		position: absolute;
		top: calc(1.85rem + (var(--font-size-xsmall) * -1));
		right: calc(5rem + var(--font-size-base));
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		border:2px solid transparent;
		border-radius: var(--font-size-xsmall);
		width: clamp(1rem, 33vw, 30rem);
		z-index: 999;
		transition: opacity 0.22s var(--curve), transform 0.3s var(--curve),
			top 0.22s var(--curve);
	}

	.search-container:focus-within {
		border:2px solid var(--color-theme-1);
	}

	.bar {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.search-box {
		color: var(--color-text);
		height: var(--height);
		width: 100%;
		border:none;
		box-shadow: 0 0 0 2px var(--color-theme-1);
		padding: 0.1rem 0 0.1rem 1.5rem;
		border-radius: var(--font-size-xsmall);
		font-size: var(--font-size-small);
		background: var(--color-bg-1);
		transition: all 0.3s var(--curve);
	}

	.search-box:focus {
		outline: none;
		box-shadow: 0 0 0 0px var(--color-theme-1);
		border-bottom: none;
	}

	.has-results:focus {
		border-radius: var(--font-size-xsmall) var(--font-size-xsmall) 0 0;
	}

	.search-container:focus-within > .results {
		opacity: 1;
		height: auto;
	}

	.results {
		opacity: 0;
		height: -100px;
		width: 100%;
		overflow: hidden;
		background: var(--color-bg-1);
		border-radius: 0 0 var(--font-size-xsmall) var(--font-size-xsmall);
		transition: all 0.3s var(--curve);
	}

	.i {
		user-select: none;
		position: absolute;
		right: calc(0.75 * var(--font-size-base));
		font-size: var(--font-size-base);
		color: var(--color-text);
	}
</style>
