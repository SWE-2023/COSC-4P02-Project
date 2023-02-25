<script>
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { createEventDispatcher } from 'svelte';

	export let open;
	let nextTheme = 'Dark Mode';
	const dispatcher = createEventDispatcher();

	function toggleLightorDark() {
		const root = document.documentElement;
		
		if (nextTheme == 'Light Mode'){
			console.log('light')
     		root.style.setProperty('--color-bg-1', '#ffffff');
			root.style.setProperty('--color-bg-2', '#e0dbd4');
			root.style.setProperty('--color-text', "rgba('0, 0, 0, 0.7')");
			dispatcher('themeSelect', 'darkText');
			nextTheme = 'Dark Mode';
		}
		else{
			console.log('dark')
	 		root.style.setProperty('--color-bg-1', '#2b2c36');
			root.style.setProperty('--color-bg-2', '#424354');
			root.style.setProperty('--color-text', "#ffffff");
			dispatcher('themeSelect', 'lightText');
			nextTheme = 'Light Mode';
		}
		open = false;
	}
	function toggleContrast() {
		const root = document.documentElement;
		open = false;
		console.log('contrast')
      	root.style.setProperty('--color-bg-1', '#000000');
     	root.style.setProperty('--color-bg-2', '#000000');
      	root.style.setProperty('--color-text', "#ffffff");
		dispatcher('themeSelect', 'light');
	}

</script>


{#if open}
	<div class="menu" transition:fly={{ x: 100 }}>
		<ul>
			<li transition:fly={{ x: 24, delay: 50 }}>
				<span id="light_dark_theme" on:click={toggleLightorDark} on:keypress={toggleLightorDark}
					>{nextTheme}</span>
			</li>
			<li transition:fly={{ x: 24, delay: 100 }}>
				<span on:click={toggleContrast} on:keydown={toggleContrast}
					>High Constrast</span>
			</li>
		</ul>
	</div>
{/if}

<style>
	.menu {
		z-index: 1;
		position: fixed;
		top: 5rem;
		left: unset;
		right: 0;
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

	/* li[aria-current="page"] {
		border-left: var(--color-theme-1) 0.25em solid;
		transition: border-right 0.2s ease-in-out;
	} */

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