<script>
	import { fly } from "svelte/transition";
	import { reduceMotionStore } from "$lib/stores/store";
	import TextSizeSelector from "$lib/components/TextSizeSelector.svelte";
	import { themeStore } from "$lib/stores/store";

	export let open;

	let reduceMotion;
	reduceMotionStore.subscribe((value) => {
		reduceMotion = value;
	});

	function toggleReduceMotion() {
		reduceMotionStore.set(!reduceMotion);
	}

	function handleClickOutside(event) {
		if (event.target.closest(".menu") || event.target.closest(".accessibility")) {
			return;
		}
		open = false;
	}
</script>

<svelte:window on:click={handleClickOutside} />

{#if open}
	<div class="menu" transition:fly={{ x: 500 }}>
		<h2 class="am-title">Accessibility Options</h2>
		<TextSizeSelector />
		<ul>
			<li class="anim" transition:fly>
				<span
					title="Reduce transition motion"
					class={reduceMotion ? "active" : ""}
					on:click={toggleReduceMotion}
					on:keydown
					><span class="material-symbols-rounded i">animation</span
					>&nbsp;&nbsp;Reduce Motion</span>
			</li>
			<li transition:fly>
				<h2 class="am-title">Theme</h2>
				<div class="btns">
					<div
						title="Light mode"
						on:keydown
						on:click={() => ($themeStore = "light-theme")}
						class={$themeStore === "light-theme"
							? "active theme-btn"
							: "theme-btn"}>
						<span class="material-symbols-rounded i">light_mode</span>
					</div>
					<div
						title="Reading mode"
						on:keydown
						on:click={() => ($themeStore = "reading-theme")}
						class={$themeStore === "reading-theme"
							? "active theme-btn"
							: "theme-btn"}>
						<span class="material-symbols-rounded i">book</span>
					</div>

					<div
						title="Dark mode"
						on:keydown
						on:click={() => ($themeStore = "dark-theme")}
						class={$themeStore === "dark-theme"
							? "active theme-btn"
							: "theme-btn"}>
						<span class="material-symbols-rounded i">dark_mode</span>
					</div>

					<div
						title="High contrast mode"
						on:keydown
						on:click={() => ($themeStore = "high-contrast-theme")}
						class={$themeStore === "high-contrast-theme"
							? "active theme-btn"
							: "theme-btn"}>
						<span class="material-symbols-rounded i">contrast</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
{/if}

<style>
	.am-title {
		font-size: var(--font-size-small);
		font-weight: 600;
		padding: 2em 1em 1em 3em;
		margin: 0;
		color: var(--color-text);
		text-decoration: none;
	}

	.menu {
		user-select: none;
		display: flex;
		flex-direction: column;
		z-index: 2;
		position: fixed;
		top: 5rem;
		left: unset;
		right: -2px;
		font-size: var(--font-size-small);
		letter-spacing: 0.1em;
		height: auto;
		background-color: var(--color-bg-1);
		backdrop-filter: blur(1em);
		box-shadow: 0 0 1em rgba(16, 13, 46, 0.2);
		border-radius: 1em 0 0 1em;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		color: var(--color-text);
		padding: 1em 0;
		transition: all 0.5s var(--curve);
	}

	.active {
		color: var(--color-theme-1);
		font-weight: 700;
	}

	li > * {
		padding: 1.5em 3em;
		margin: 0;
		color: var(--color-text);
		text-decoration: none;
	}

	.btns {
		display: flex;
		justify-content: space-between;
		padding: 1em 2em;
	}

	.theme-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3em;
		height: 3em;
		border: var(--border);
		background: var(--color-bg-1);
		border-radius: 50%;
		filter: invert(0.1);
		cursor: pointer;
		transition: all 0.5s var(--curve);
	}

	.theme-btn:hover {
		filter: invert(0.2);
	}

	.theme-btn:active {
		filter: invert(0.3);
	}

	li.anim:hover {
		cursor: pointer;
		backdrop-filter: invert(0.1);
		color: var(--color-theme-1);
	}
</style>
