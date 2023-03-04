<script>
	import Header from "../components/Header.svelte";
	import Footer from "../components/Footer.svelte";
	import { page } from "$app/stores";
	import "./styles.css";
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
	<img
		class={$page.url.pathname == "/timeline"
			? "background on-timeline"
			: "background"}
		alt="Niagara-on-the-Lake Main Street"
		src="assets/landing-page-bg-4.png" />
	<Footer />
</div>

<style>
	:root {
		--anim: 0.4s cubic-bezier(0.31, 0.21, 0.72, 0.61);
	}

	.background {
		position: fixed;
		transform-origin: bottom right;
		transform: scale(0.66);
		z-index: -99;
		opacity: var(--bg-opacity);
		bottom: 0;
		right: 0;
		filter: blur(0px) var(--bg-grayscale);
		transition: filter var(--anim), opacity var(--anim);
	}

	.background.on-timeline {
		filter: blur(7px) var(--bg-grayscale);
		opacity: 0.1;
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
		max-width: 80%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media (max-width: 800px) {
		.background {
			opacity: 0.05;
		}
	}
</style>
