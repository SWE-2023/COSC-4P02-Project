<script>
	import { fly } from "svelte/transition";
	import { reduceMotionStore } from "../store";
	import { createEventDispatcher } from "svelte";
	import TextSizeSelector from "./TextSizeSelector.svelte";

	export let open;

	let reduceMotion;
	reduceMotionStore.subscribe((value) => {
		reduceMotion = value;
	});

	function toggleReduceMotion() {
		reduceMotionStore.set(!reduceMotion);
	}

	const themes = {
		"Dark Mode": {
			"--color-theme-1": "var(--dark-color-theme-1)",
			"--color-theme-1-light": "var(--dark-color-theme-1-light)",
			"--color-theme-2": "var(--dark-color-theme-2)",
			"--color-theme-2-light": "var(--dark-color-theme-2-light)",
			"--color-bg-1": "var(--dark-color-bg-1)",
			"--color-bg-2": "var(--dark-color-bg-2)",
			"--color-text-card": "var(--dark-color-text-card)",
			"--bg-opacity": "var(--dark-bg-opacity)",
			"--bg-grayscale": "var(--dark-bg-grayscale)",
			"--background-gradient": "var(--dark-color-bg-1)",
			"--color-text": "var(--dark-color-text)",
			"--menu-border": "1px solid white",
			"--button-color": "#ffffff",
			"--button-hover-color": "#000000",
			"--button-active-background": "#ffffff",
		},
		"Light Mode": {
			"--color-theme-1": "var(--light-color-theme-1)",
			"--color-theme-1-light": "var(--light-color-theme-1-light)",
			"--color-theme-2": "var(--light-color-theme-2)",
			"--color-theme-2-light": "var(--light-color-theme-2-light)",
			"--color-bg-1": "var(--light-color-bg-1)",
			"--color-bg-2": "var(--light-color-bg-2)",
			"--color-text-card": "var(--light-color-text-card)",
			"--bg-opacity": "var(--light-bg-opacity)",
			"--bg-grayscale": "var(--light-bg-grayscale)",
			"--background-gradient":
				"linear-gradient(90deg, var(--light-color-bg-1) 0%, (-light-color-bg-2) 100%)",
			"--color-text": "var(--light-color-text)",
			"--menu-border": "0px solid white",
		},
	};

	let nextTheme = "Dark Mode";
	const dispatcher = createEventDispatcher();

	function toggleLightorDark() {
		const root = document.documentElement;
		const theme = themes[nextTheme];

		Object.entries(theme).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});

		if (nextTheme === "Light Mode") {
			location.reload();
			dispatcher("themeSelect", "darkText");
		} else {
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
			root.style.setProperty("--border", "2px solid white");
			dispatcher("themeSelect", "lightText");
		}

		nextTheme = nextTheme === "Light Mode" ? "Dark Mode" : "Light Mode";
		open = false;
	}
	function toggleContrast() {
		const root = document.documentElement;
		open = false;
		const hcProps = [
			"--color-theme-1",
			"--color-theme-1-light",
			"--color-theme-2",
			"--color-theme-2-light",
			"--color-bg-1",
			"--color-bg-2",
			"--color-text-card",
			"--bg-opacity",
			"--bg-grayscale",
			"--background-gradient",
			"--color-text",
		];
		hcProps.forEach((prop) =>
			root.style.setProperty(prop, `var(--hc-${prop.slice(2)})`)
		);
		root.style.setProperty("--button-color", "#ffffff");
		root.style.setProperty("--button-hover-color", "#000000");
		root.style.setProperty("--button-active-background", "#ffffff");
		root.style.setProperty("--border", "2px solid white");
		dispatcher("themeSelect", "light");
	}
</script>

{#if open}
	<div class="menu" transition:fly={{ x: 100 }}>
		<div class="am-title">Accessibility Options</div>
		<TextSizeSelector />
		<ul>
			<li transition:fly={{ x: 24, delay: 50 }}>
				<span
					id="light_dark_theme"
					on:click={toggleLightorDark}
					on:keydown>{nextTheme}</span>
			</li>
			<li transition:fly={{ x: 24, delay: 100 }}>
				<span on:click={toggleContrast} on:keydown={toggleContrast}
					>High Constrast</span>
			</li>
			<li transition:fly={{ x: 24, delay: 100 }}>
				<span
					class={reduceMotion ? "active" : ""}
					on:click={toggleReduceMotion}
					on:keydown>Reduce Motion</span>
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
		display: flex;
		flex-direction: column;
		z-index: 1;
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
		cursor: pointer;
		padding: 1.5em 0;
		transition: letter-spacing 0.2s ease-in-out, color 0.2s ease-in-out;
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

	li:hover {
		background: rgba(16, 13, 46, 0.082);
		letter-spacing: 0.12em;
		color: var(--color-theme-1);
	}
</style>
