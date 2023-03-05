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
	<div class="grey">
		<img loading="lazy"
			class={$page.url.pathname == "/timeline"
				? "background grey ontimeline"
				: "background grey"}
			alt="Niagara-on-the-Lake Main Street"
			src="assets/landing-page-bg-4.png" />
	</div>
	<Footer />
</div>

<style>
	.background {
		opacity: var(--bg-opacity);
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
		transform: scale(.9);
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
