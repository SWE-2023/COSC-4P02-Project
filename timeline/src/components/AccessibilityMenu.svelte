<script>
	import { fly } from "svelte/transition";
	import { createEventDispatcher } from "svelte";

	export let open;
	let nextTheme = "Dark Mode";
	const dispatcher = createEventDispatcher();

	function toggleLightorDark() {
		const root = document.documentElement;

		if (nextTheme == "Light Mode") {
			console.log("light");
			root.style.setProperty("--color-theme-1", "var(--light-color-theme-1)");
			root.style.setProperty(
				"--color-theme-1-light",
				"var(--light-color-theme-1-light)"
			);
			root.style.setProperty("--color-theme-2", "var(--light-color-theme-2)");
			root.style.setProperty(
				"--color-theme-2-light",
				"var(--light-color-theme-2-light)"
			);
			root.style.setProperty("--color-bg-1", "var(--light-color-bg-1)");
			root.style.setProperty("--color-bg-2", "var(--light-color-bg-2)");
			root.style.setProperty(
				"--background-gradient",
				"linear-gradient(90deg, var(--light-color-bg-1) 0%, (-light-color-bg-2) 100%)"
			);
			root.style.setProperty("--color-text", "var(--light-color-text)");
			root.style.setProperty("--menu-border", "0px solid white");
			location.reload();
			dispatcher("themeSelect", "darkText");
			nextTheme = "Dark Mode";
		} else {
			console.log("dark");
			root.style.setProperty("--color-theme-1", "var(--dark-color-theme-1)");
			root.style.setProperty(
				"--color-theme-1-light",
				"var(--dark-color-theme-1-light)"
			);
			root.style.setProperty("--color-theme-2", "var(--dark-color-theme-2)");
			root.style.setProperty(
				"--color-theme-2-light",
				"var(--dark-color-theme-2-light)"
			);
			root.style.setProperty("--color-bg-1", "var(--dark-color-bg-1)");
			root.style.setProperty("--color-bg-2", "var(--dark-color-bg-2)");
			root.style.setProperty("--background-gradient", "var(--dark-color-bg-1)");
			root.style.setProperty("--color-text", "var(--dark-color-text)");
			root.style.setProperty("--button-color", "#ffffff");
			root.style.setProperty("--button-hover-color", "#000000");
			root.style.setProperty("--button-active-background", "#ffffff");
			root.style.setProperty("--menu-border", "1px solid white");
			dispatcher("themeSelect", "lightText");
			nextTheme = "Light Mode";
		}
		open = false;
	}
	function toggleContrast() {
		const root = document.documentElement;
		open = false;
		console.log("contrast");
		root.style.setProperty("--color-theme-1", "var(--hc-color-theme-1)");
		root.style.setProperty(
			"--color-theme-1-light",
			"var(--hc-color-theme-1-light)"
		);
		root.style.setProperty("--color-theme-2", "var(--hc-color-theme-2)");
		root.style.setProperty(
			"--color-theme-2-light",
			"var(--hc-color-theme-2-light)"
		);
		root.style.setProperty("--color-bg-1", "var(--hc-color-bg-1)");
		root.style.setProperty("--color-bg-2", "var(--hc-color-bg-2)");
		root.style.setProperty("--background-gradient", "var(--hc-color-bg-1)");
		root.style.setProperty("--color-text", "var(--hc-color-text)");
		root.style.setProperty("--button-color", "#ffffff");
		root.style.setProperty("--button-hover-color", "#000000");
		root.style.setProperty("--button-active-background", "#ffffff");
		root.style.setProperty("--menu-border", "1px solid white");
		dispatcher("themeSelect", "light");
	}
</script>

{#if open}
	<div class="menu" transition:fly={{ x: 100 }}>
		<div class="am-title">Accesibility Options</div>
		<ul>
			<li transition:fly={{ x: 24, delay: 50 }}>
				<span
					id="light_dark_theme"
					on:click={toggleLightorDark}
					on:keypress={toggleLightorDark}>{nextTheme}</span>
			</li>
			<li transition:fly={{ x: 24, delay: 100 }}>
				<span on:click={toggleContrast} on:keydown={toggleContrast}
					>High Constrast</span>
			</li>
		</ul>
	</div>
{/if}

<style>
	.am-title {
		font-size: 1em;
		font-weight: 600;
		padding: 2em 1em 1em 3em;
		margin: 0;
		color: var(--color-text);
		text-decoration: none;
	}
	.menu {
		z-index: 1;
		position: fixed;
		top: 5rem;
		left: unset;
		right: -2px;
		font-size: 1.15em;
		letter-spacing: 0.1em;
		width: 20rem;
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
		cursor: pointer;
		padding: 1.5em 0;
		transition: letter-spacing 0.2s ease-in-out, color 0.2s ease-in-out;
	}

	li > * {
		padding: 1.5em 3em;
		margin: 0;
		color: var(--color-text);
		text-decoration: none;
	}

	li:hover {
		background: rgba(16, 13, 46, 0.082);
		letter-spacing: 0.12em;
		color: var(--color-theme-1);
	}
</style>
