<script>
	import ExpandButton from "$lib/components/ExpandButton.svelte";
	import { themeStore } from "$lib/stores/store";
	import { slide } from "svelte/transition";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { userStore, logout } from "$lib/authStore";
	import { setFontSize } from "$lib/components/TextSizeSelector.svelte";
	import { scrollY, mobile } from "$lib/stores/window";
	import AccessibilityMenu from "$lib/components/AccessibilityMenu.svelte";
	import { quintOut } from "svelte/easing";

	let user;
	userStore.subscribe((value) => {
		user = value;
	});

	let isAccessibilityOpen = false;
	let isMenuOpen = false;
	let shadow = 0;

	$: {
		shadow = $scrollY > 25 ? 1 : 0;
	}

	$: {
		if ($mobile) {
			isMenuOpen = false;
		} else {
			isMenuOpen = true;
		}
	}

	function handleHeader() {
		if (!$page.url.pathname.startsWith("/timeline")) {
		} else {
			shadow = 0;
		}
	}

	function handleClickOutside(event) {
		if ($mobile) {
			if (
				isMenuOpen &&
				(!event.target.closest(".menubutton") && !event.target.closest(".menu"))
			) {
				isMenuOpen = false;
			}
		}
	}

	onMount(() => {
		setFontSize();
		handleHeader();
	});
</script>

<svelte:window on:click={handleClickOutside} />

<header>
	<nav class={shadow ? "shadow" : ""}>
		<div class="left">
			<a href="/"
				><img
					src={$themeStore === "light-theme" || $themeStore === "reading-theme"
						? "assets/notl-museum.svg"
						: "assets/notl-museum-dark.svg"}
					alt="logo"
					class="logo"
					id="notl_logo" /></a>
			<div title="Toggle menu visibility" class="menubutton">
				<ExpandButton bind:open={isMenuOpen} />
			</div>
			{#if isMenuOpen}
				<ul
					transition:slide={{ axis: $mobile ? "y" : "x", easing: quintOut }}
					class="menu">
					<li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
						<a
							title="Home"
							href="/"
							on:click={() => {
								if ($mobile) isMenuOpen = false;
							}}>Home</a>
					</li>
					<li
						aria-current={$page.url.pathname === "/timeline"
							? "page"
							: undefined}>
						<a
							title="Explore the timeline"
							href="/timeline"
							on:click={() => {
								if ($mobile) isMenuOpen = false;
							}}>Explore</a>
					</li>
					<li
						aria-current={$page.url.pathname === "/contact"
							? "page"
							: undefined}>
						<a
							title="Contact us"
							href="/contact"
							on:click={() => {
								if ($mobile) isMenuOpen = false;
							}}>Contact</a>
					</li>
					<li
						aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
						<a
							title="About the project"
							href="/about"
							on:click={() => {
								if ($mobile) isMenuOpen = false;
							}}>About</a>
					</li>
					{#if user && user.email}
						<li
							aria-current={$page.url.pathname.startsWith("/login")
								? "page"
								: undefined}>
							<a
								on:click={() => {
									if ($mobile) isMenuOpen = false;
								}}
								title="Logged in as {user.email}"
								href="/"
								on:click={(event) => {
									event.preventDefault();
									logout();
								}}
								>Log Out&nbsp;
								<span class="material-symbols-rounded i">logout</span></a>
						</li>
					{:else}
						<li
							aria-current={$page.url.pathname.startsWith("/login")
								? "page"
								: undefined}>
							<a
								title="Log in"
								class="login"
								href="/login"
								on:click={() => {
									if ($mobile) isMenuOpen = false;
								}}
								>Log In&nbsp;<span class="material-symbols-rounded i"
									>login</span
								></a>
						</li>
					{/if}
				</ul>
			{/if}
		</div>

		<div class="right">
			<span
				title="Accessibility options"
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
		flex-direction: row;
		gap: clamp(0rem, 1vw, 2rem);
		list-style: none;
		padding: 0;
		border:none;
		user-select: none !important;
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
		height: 3px;
		background: var(--color-theme-1);
		border-radius: 5px;
		transform: scale(0);
		transition: all 0.5s var(--curve);
	}

	li[aria-current="page"]::after {
		transform: scale(1);
	}

	li a,
	.i {
		font-size: var(--font-size-smallish);
	}

	li a {
		display: block;
		padding: 0.5em 0.2em;
		color: var(--color-text);
		text-decoration: none;
	}

	li:active {
		transform: scale(0.95);
	}

	li a:hover {
		color: var(--color-theme-1);
	}

	.logo {
		position: relative;
		margin: 0;
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

	@media (max-width: 900px) {
		ul {
			position: fixed;
			top: 5rem;
			left: 0;
			margin: 0;
			width: 100%;
			padding: 1rem 0;
			background-color: var(--color-bg-1);
			flex-direction: column;
			gap: 0.2rem;
			justify-content: center;
			align-items: center;
			overflow-y: auto;
			overflow-x: hidden;
			z-index: 9;
			box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
			border-bottom: var(--border);
		}

		li {
			text-align: center;
		}
		li a {
			padding: 0.8rem 2rem;
			font-size: var(--font-size-base);
		}
	}
</style>
