<script>
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { getSessionUser } from "$lib/authStore";
	import { themeStore } from "$lib/stores/store";
	import {
		windowWidth,
		windowHeight,
		scrollY,
		scrollX,
		mobile,
	} from "$lib/stores/window";
	import "./styles.css";

	$: mobile.set($windowWidth < 1000);

	onMount(async () => {
		await getSessionUser();
	});
</script>

<svelte:window
	bind:innerHeight={$windowHeight}
	bind:innerWidth={$windowWidth}
	bind:scrollY={$scrollY}
	bind:scrollX={$scrollX} />

<div class="{$themeStore} app">
	<Header />
	<SvelteToast />
	<main>
		<slot />
	</main>
	<div
		class="grey"
		style={$page.url.pathname == "/"
			? "position: absolute;"
			: "position: fixed;"}>
		<img
			loading="lazy"
			class={$page.url.pathname == "/timeline"
				? "background grey ontimeline"
				: "background grey"}
			alt="Niagara-on-the-Lake Main Street"
			src="assets/landing-page-bg-4.webp" />
	</div>

	<div class="bg" />
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
		width: clamp(100rem, 120vw, 200rem);
		filter: blur(0px);
		transition: filter 0.6s cubic-bezier(0.31, 0.21, 0.72, 0.61),
			opacity 0.6s cubic-bezier(0.31, 0.21, 0.72, 0.61);
	}

	.background.ontimeline {
		filter: blur(7px);
		opacity: calc(var(--bg-opacity) * 0.5);
	}

	.bg {
		position: fixed;
		z-index: -10;
		width: 100vw;
		height: 100vh;
		background-color: var(--color-bg-1);
	}

	.grey {
		transform-origin: bottom right;
		transform: scale(0.9);
		bottom: 0;
		right: 0;
		margin-bottom: -1rem;
		z-index: -9;
		filter: var(--bg-grayscale);
	}

	.app {
		display: flex;
		flex-direction: column;
		max-width: 100vw;
		min-height: 100vh;
		overflow-x: hidden;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 80%;
		margin: 0 auto;
		min-height: 88vh;
	}

	@media (max-width: 1000px) {
		.background.background.ontimeline {
			opacity: 0.1;
		}
	}

	@media (max-width: 600px) {
		.background.background.ontimeline {
			opacity: 0;
		}
	}
</style>
