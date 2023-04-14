<script>
	import { Hamburger } from "svelte-hamburgers";
	import { countStore } from "$lib/stores/store";
	import { fly, slide } from "svelte/transition";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { userStore, logout } from "$lib/authStore";
	import { set } from "$lib/components/TextSizeSelector.svelte";
	import AccessibilityMenu from "$lib/components/AccessibilityMenu.svelte";
	import Menu from "$lib/components/Menu.svelte";

	let user;
	userStore.subscribe((value) => {
		user = value;
	});

	let isAccessibilityOpen = false;
	let isMenuOpen = false;
	let scrollY = 0;
	let shadow = 0;
	let bg = 1;
	let isTheme = true;

	function handleThemeLogo(event) {
		isTheme = event.detail === "darkText";
	}

	function handleHeader() {
		if (!$page.url.pathname.startsWith("/timeline")) {
			bg = 1;
		} else {
			shadow = 0;
			bg = 0;
		}
	}

	function handleScroll() {
		if (!$page.url.pathname.startsWith("/timeline")) {
			scrollY = window.scrollY;
			shadow = scrollY > 60 ? 1 : 0;
			bg = 1;
		} else {
			shadow = 0;
			bg = 0;
		}
	}

	handleHeader();

	function count() {
		countStore.update((n) => Number(n) + 1);
	}

	onMount(() => {
		set();
	});
</script>

<svelte:window on:scroll={handleScroll} />

<header>
	<nav
		class={shadow ? "shadow" : ""}
		style={bg ? "background: var(--color-bg-1);" : ""}>
		<div class="left">
			{#if $page.url.pathname.startsWith("/timeline")}
				<a href="/"
					><img
						on:click={count}
						on:keypress={count}
						src={isTheme
							? "assets/notl-museum.svg"
							: "assets/notl-museum-dark.svg"}
						alt="logo"
						class="logo"
						id="notl_logo" /></a>
				<div style="margin-left:1rem;" in:slide={{ axis: "x" }}>
					<Hamburger
						bind:open={isMenuOpen}
						--color="var(--color-theme-1)"
						type="arrowalt" />
				</div>
				<Menu bind:open={isMenuOpen} />
			{:else}
				<a href="/"
					><img
						on:click={count}
						on:keypress={count}
						src={isTheme
							? "assets/notl-museum.svg"
							: "assets/notl-museum-dark.svg"}
						alt="logo"
						class="logo"
						id="notl_logo" /></a>
				<ul>
					<li
						aria-current={$page.url.pathname === "/" ? "page" : undefined}
						in:slide>
						<a href="/">Home</a>
					</li>
					<li
					aria-current={$page.url.pathname === "/about" ? "page" : undefined}
					in:slide>
					<a href="/about">About</a>
				</li>
				<li
					aria-current={$page.url.pathname === "/timeline" ? "page" : undefined}
					in:slide>
					<a href="/timeline">Explore</a>
				</li>
					{#if user && user.email}
						<li
							aria-current={$page.url.pathname.startsWith("/login")
								? "page"
								: undefined}
							in:slide>
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
							in:slide>
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
		transition: all 1s var(--curve);
	}

	nav.shadow {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
	}

	ul {
		display: flex;
		align-items: baseline;
		gap: clamp(0.25rem, 1vw, 2rem);
		margin-left: 3rem;
		width: calc(20 * var(--font-size-base));
		list-style: none;
		padding: 0;
	}

	li {
		color: #0d0d0d;
		cursor: pointer;
		padding: 0;
		transition: all 0.5s var(--curve), color 0.5s var(--curve);
	}

	li a:hover {
		color: var(--color-theme-1);
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
