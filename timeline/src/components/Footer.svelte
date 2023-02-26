<script>
	import { countStore } from "../store.js";
	import { page } from "$app/stores";
	import PageTransitionFly from "./PageTransitionFly.svelte";

	let countValue = 0;
	countStore.subscribe((value) => {
		countValue = value;
	});
</script>

<footer>
	<p>
		<span
			style="opacity:{countValue / 100 + 0.2};font-weight:{countValue *
				100};color:{countValue >= 100
				? 'var(--color-theme-1)'
				: 'var(--color-text)'}">{countValue}</span>
		{#if !$page.url.pathname.startsWith("/timeline")}
			| <a href="https://www.notlmuseum.ca">NOTL Museum</a>
			| <a href="https://www.notl.com">NOTL</a> |
			<a href="https://www.niagararegion.ca">Niagara Region</a>
		{/if}
		| &copy; 2023
	</p>
</footer>

<style>
	footer {
		position: fixed;
		bottom: 0;
		right: 0;
		font-size: 0.8em;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
		padding: 0 16px;
	}
</style>
