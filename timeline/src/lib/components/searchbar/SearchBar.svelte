<script>
	import { currentSizeStore } from "./../../stores/store.js";
	import { createEventDispatcher } from "svelte";
	import DropDownItem from "$lib/components/searchbar/DropDownItem.svelte";

	export let selection;
	export let titles;

	let filtered = [];
	let search = "";
	let clicked = false;
	let screenWidth;

	const dispatch = createEventDispatcher();
	const notify = () => dispatch("selection");

	const findTitles = () => {
		const keywords = search.toLowerCase().split(" ");
		filtered = titles
			.filter((title) => {
				return keywords.every((keyword) =>
					title.toLowerCase().includes(keyword)
				);
			})
			.slice(0, 10); // max 10
	};

	function handleClickOutside(event) {
		if (event.target.closest(".search-container")) return;
		clicked = true;
	}
</script>

<svelte:window bind:innerWidth={screenWidth} on:click={handleClickOutside} />

<div class="search-container">
	<div class="bar">
		<input
			type="text"
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
	{#if search && !clicked && filtered.length}
		<div class="results">
			{#each filtered as title}
				<DropDownItem
					bind:selectedTitle={selection}
					itemTitle={title}
					on:selection={notify}
					on:selection={() => (clicked = true)} />
			{/each}
		</div>
	{:else}
		<div class="results" style="pointer-events:none;">
			<DropDownItem color=grey
				bind:selectedTitle={selection}
				itemTitle="No results." 
				/>
		</div>
	{/if}
</div>

<style>
	:root {
		--width: calc(20 * var(--font-size-base));
		--height: calc(2 * var(--font-size-base));
	}

	.search-container {
		position: fixed;
		top: calc(1.85rem + (var(--font-size-xsmall) * -1));
		right: calc(5rem + var(--font-size-base));
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		width: clamp(1rem, 33vw, 30rem);
		z-index: 99999;
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
		border: 2px solid  var(--color-bg-2);
		padding: 0.1rem 0 0.1rem 1.5rem;
		border-radius: var(--font-size-small);
		font-size: var(--font-size-small);
		background: var(--color-bg-1);
		transition: all 0.15s ease-in-out;
	}

	.search-box:focus {
		outline: none;
		border: 2px solid var(--color-theme-1);
		border-bottom: none;
	}

	.has-results:focus {
		border-radius: var(--font-size-small) var(--font-size-small) 0 0;
	}

	.search-container:focus-within > .results {
		opacity: 1;
		height: auto;
	}

	.results {
		opacity: 0;
		height: -100px;
		width: calc(100% - 4px);
		overflow: hidden;
		background: var(--color-bg-1);
		border-left: 2px solid var(--color-theme-1);
		border-right: 2px solid var(--color-theme-1);
		border-bottom: 2px solid var(--color-theme-1);
		border-radius: 0 0 var(--font-size-small) var(--font-size-small);
		transition: all 0.15s ease-in-out;
	}

	.i {
		user-select: none;
		position: absolute;
		right: calc(0.75 * var(--font-size-base));
		font-size: var(--font-size-base);
		color: var(--color-text);
	}
</style>
