<script>
	import { Hamburger } from "svelte-hamburgers";
	import { countStore } from "$lib/stores/store";
	import { onMount } from "svelte";
	import { set } from "$lib/components/TextSizeSelector.svelte";
	import AccessibilityMenu from "$lib/components/AccessibilityMenu.svelte";
	import Menu from "$lib/components/Menu.svelte";

	let isAccessibilityOpen = false;
	let isMenuOpen = false;
	let scrollY = 0;
	let logoOpacity = 1;
	let isTheme = true;

	function handleThemeLogo(event) {
		isTheme = event.detail === "darkText";
	}

	function handleScroll() {
		scrollY = window.scrollY;
		logoOpacity = scrollY > 42 ? 0 : 1;
	}

	function count() {
		countStore.update((n) => Number(n) + 1);
	}

	onMount(() => {
		set();
	});
</script>

<svelte:window on:scroll={handleScroll} />

<header>
	<nav>
		<div class="left">
			<Hamburger
				bind:open={isMenuOpen}
				--color="var(--color-theme-1)"
				type="arrowalt" />
			<Menu bind:open={isMenuOpen} />
			<a href="/"
				><img
					on:click={count}
					on:keypress={count}
					src={isTheme
						? "assets/notl-museum.svg"
						: "assets/notl-museum-dark.svg"}
					alt="logo"
					class="logo"
					id="notl_logo"
					style="opacity:{logoOpacity}" /></a>
		</div>

		<div class="right">
			<span
				class="material-symbols-rounded accessibility"
				style="scale: 1.2;"
				on:click={() => (isAccessibilityOpen = !isAccessibilityOpen)}
				on:keydown={(e) => {
					if (e.key === "Enter") {
						isAccessibilityOpen = !isAccessibilityOpen;
					}
				}}>settings</span>
			<AccessibilityMenu
				bind:open={isAccessibilityOpen}
				on:themeSelect={handleThemeLogo} />
		</div>
	</nav>
</header>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		z-index: 1;
	}

	.logo {
		position: relative;
		margin: 0 0 0 1em;
		width: auto;
		height: 3.5rem;
		border-radius: 0.5rem 0.5rem 0 0;
		user-select: none;
		transition: opacity 0.33s ease-in-out, transform 0.05s ease-in-out;
	}

	.logo:active {
		transform: scale(0.95);
	}

	.left {
		display: flex;
		align-items: center;
		margin-left: 0.75em;
	}

	.right {
		display: flex;
		justify-content: flex-end;
		margin-right: 2em;
	}

	.accessibility {
		padding: 1rem;
		user-select: none;
		color: var(--color-theme-1);
		transform: rotate(0);
		transition: transform 0.33s ease-in-out;
	}

	.accessibility:hover {
		transform: rotate(180deg);
		cursor: pointer;
	}

	.accessibility:active {
		transition: transform 0.05s ease-in-out;
		transform: scale(0.95) rotate(180deg);
	}

	header {
		padding: 0.6em 0 0 0.6em;
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		z-index: 5;
	}
</style>
