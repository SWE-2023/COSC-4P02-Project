<script>
	import { Hamburger } from "svelte-hamburgers";
	import AccessibilityMenu from "./AccessibilityMenu.svelte";
	import Menu from "./Menu.svelte";

	let isAccessibilityOpen = false;
	let isMenuOpen = false;
	

	let isTheme = true;
	function handleThemeSelect(event) {
    	isTheme = event.detail === 'darkText';
		console.log('test');
  }
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,500,0,200" />

<header>
	<nav>
		<div class="left">
			<Hamburger
				bind:open={isMenuOpen}
				--color="var(--color-theme-1)"
				type="arrowalt" />
			<Menu bind:open={isMenuOpen} />
			<a href="/"
				><img src={isTheme ? 'assets/notl-museum.svg' : 'assets/notl-museum-dark.svg'} alt="logo" class="logo" id="notl_logo" /></a>
		</div>

		<div class="right">
			<span
				class="material-symbols-outlined accessibility"
				style="scale: 1.2;"
				on:click={() => (isAccessibilityOpen = !isAccessibilityOpen)}
				on:keydown={(e) => {
					if (e.key === "Enter") {
						isAccessibilityOpen = !isAccessibilityOpen;
					}
				}}>settings</span>
			<AccessibilityMenu bind:open={isAccessibilityOpen} on:themeSelect={handleThemeSelect}/>
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
		z-index: 100;
	}

	.logo {
		position: relative;
		margin: 0 0 0 1em;
		width: auto;
		height: 3.5rem;
		border-radius: 0.5rem 0.5rem 0 0;
		user-select: none;
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
		padding:1rem 1rem 1rem 1rem;
		user-select: none;
		color: var(--color-theme-1);
		transform: rotate(0);
		transition: transform 0.33s ease-out;
	}

	.accessibility:hover {
		transform: rotate(180deg);
		cursor: pointer;
	}

	header {
		padding: 0.6em 0 0 0.6em;
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		z-index: 100;
	}
</style>