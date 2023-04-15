<script>
	import { Hamburger } from "svelte-hamburgers";
	import { countStore, themeStore } from "$lib/stores/store";
	import { slide } from "svelte/transition";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { userStore, logout } from "$lib/authStore";
	import { setFontSize } from "$lib/components/TextSizeSelector.svelte";
	import { scrollY, windowWidth } from "$lib/stores/window";
	import { searchbarVisible } from "$lib/stores/store";
	import AccessibilityMenu from "$lib/components/AccessibilityMenu.svelte";

	let user;
	userStore.subscribe((value) => {
		user = value;
	});

	let isAccessibilityOpen = false;
	let isMenuOpen = false;
	let shadow = 0;

	$: {
		shadow = $scrollY > 70 ? 1 : 0;
	}

	$: {
		isMenuOpen = $searchbarVisible;
	}

	function checkVisibility() {
		if ($windowWidth < 1000) {
			isMenuOpen = false;
			searchbarVisible.set(true);
		} else {
			isMenuOpen = true;
			searchbarVisible.set(true);
		}
	}

	function handleHeader() {
		if (!$page.url.pathname.startsWith("/timeline")) {
		} else {
			shadow = 0;
		}
	}

	function searchSwitch() {
		if ($windowWidth < 1000) {
			searchbarVisible.set(!$searchbarVisible);
		}
	}

	function count() {
		countStore.update((n) => Number(n) + 1);
	}

	onMount(() => {
		setFontSize();
		handleHeader();
		checkVisibility();
	});
</script>

<svelte:window on:resize={checkVisibility} />

<header>
	<nav class={shadow ? "shadow" : ""}>
		<div class="left">
			{#if !($windowWidth < 1000)}
				<a href="/" style="margin-right:1rem;"
					><img
						on:click={count}
						on:keypress={count}
						src={$themeStore === "light-theme" ||
						$themeStore === "reading-theme"
							? "assets/notl-museum.svg"
							: "assets/notl-museum-dark.svg"}
						alt="logo"
						class="logo"
						id="notl_logo" /></a>
			{/if}
			{#if $page.url.pathname.startsWith("/timeline")}
				<div transition:slide={{ axis: "x" }}>
					<Hamburger
						on:click={searchSwitch}
						bind:open={isMenuOpen}
						--color="var(--color-theme-1)"
						type="arrowalt" />
				</div>
			{/if}
			{#if isMenuOpen || !$page.url.pathname.startsWith("/timeline")}
				<ul
					style={!$page.url.pathname.startsWith("/timeline")
						? "margin-left:1rem;"
						: "margin-left:0"}>
					<li
						aria-current={$page.url.pathname === "/" ? "page" : undefined}
						transition:slide={{ axis: "x" }}>
						<a href="/">Home</a>
					</li>
					<li
						aria-current={$page.url.pathname === "/about" ? "page" : undefined}
						transition:slide={{ axis: "x" }}>
						<a href="/about">About</a>
					</li>
					<li
						aria-current={$page.url.pathname === "/timeline"
							? "page"
							: undefined}
						transition:slide={{ axis: "x" }}>
						<a href="/timeline">Explore</a>
					</li>
					{#if user && user.email}
						<li
							aria-current={$page.url.pathname.startsWith("/login")
								? "page"
								: undefined}
							transition:slide={{ axis: "x" }}>
							<a
								title="Signed in as {user.email}"
								href="/"
								on:click={(event) => {
									event.preventDefault();
									logout();
								}}>
								Log Out</a>
						</li>
					{:else}
						<li
							aria-current={$page.url.pathname.startsWith("/login")
								? "page"
								: undefined}
							transition:slide={{ axis: "x" }}>
							<a class="login" href="/login">Log In</a>
						</li>
					{/if}
				</ul>
			{/if}
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
			<AccessibilityMenu bind:open={isAccessibilityOpen} />
		</div>
	</nav>
</header>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		background-color: var(--nav-color);
		backdrop-filter: blur(10px);
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		z-index: 1;
		transition: all 0.2s var(--curve);
	}

	nav.shadow {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
	}

	ul {
		display: flex;
		align-items: baseline;
		gap: clamp(0.25rem, 1vw, 2rem);
		list-style: none;
		padding: 0;
	}

	li {
		white-space: nowrap;
	}

	li[aria-current="page"] a {
		color: var(--color-theme-1);
	}

	li::after {
		content: "";
		display: block;
		width: 100%;
		height: 2px;
		background: var(--color-theme-1);
		border-radius: 5px;
		transform: scaleX(0);
		transition: all 0.5s var(--curve);
	}

	li[aria-current="page"]::after {
		content: "";
		display: block;
		width: 100%;
		height: 3px;
		transform: scaleX(1);
		background: var(--color-theme-1);
		border-radius: 5px;
	}

	li a {
		font-size:clamp(var(--font-size-xsmall), 3vw, var(--font-size-small));
		display: block;
		padding: 0.5em 0.5em;
		color: var(--color-text);
		text-decoration: none;
	}

	li a:hover {
		color: var(--color-theme-1);
	}

	.logo {
		position: relative;
		margin: 0 0 0 1em;
		width: auto;
		height: 3.5rem;
		border-radius: 0.5rem 0.5rem 0 0;
		user-select: none;
		transition: opacity 0.5s var(--curve), transform 0.2s var(--curve);
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
		transition: transform 0.5s var(--curve);
	}

	.accessibility:hover {
		transform: rotate(180deg);
		cursor: pointer;
	}

	.accessibility:active {
		transition: transform 0.2s var(--curve);
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
