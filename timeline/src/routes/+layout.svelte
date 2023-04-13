<script>
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { getSessionUser } from "$lib/authStore";
	import "./styles.css";

	onMount(async () => {
		await getSessionUser();
	});
</script>

<div class="app">
	<Header />
	<SvelteToast />
	<main>
		<slot />
	</main>
	<div class="grey">
		<img
			loading="lazy"
			class={$page.url.pathname == "/timeline"
				? "background grey ontimeline"
				: "background grey"}
			alt="Niagara-on-the-Lake Main Street"
			src="assets/landing-page-bg-4.webp" />
	</div>
	{#if $page.url.pathname !== "/timeline"}
	<Footer />
	{/if}
</div>

<style>
	:root {
		--toastBackground: var(--color-bg-1);
		--toastColor: var(--color-text);
		--toastBorderRadius: 0.8rem;
		--toastPadding: 0.5rem;
		--toastBarHeight: 0;
	}
	.background {
		opacity: var(--bg-opacity);
		width: calc(100vw + 20rem);
		filter: blur(0px);
		transition: filter 0.6s cubic-bezier(0.31, 0.21, 0.72, 0.61),
			opacity 0.6s cubic-bezier(0.31, 0.21, 0.72, 0.61);
	}
	.background.ontimeline {
		filter: blur(7px);
		opacity: 0.1;
	}
	.grey {
		position: fixed;
		transform-origin: bottom right;
		transform: scale(0.9);
		bottom: 0;
		right: 0;
		z-index: -99;
		filter: var(--bg-grayscale);
	}
	.app {
		display: flex;
		flex-direction: column;
		max-width: 99vw;
		min-height: 100vh;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 82%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media (max-width: 1000px) {
		.background {
			opacity: 0.05;
		}
	}
</style>
