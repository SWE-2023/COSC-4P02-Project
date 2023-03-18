<script>
	import { countStore } from "$lib/stores/store.js";
	import { page } from "$app/stores";

	let countValue;
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
		font-size: var(--font-size-xsmall);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
		padding: 0 16px;
	}

	@media (max-width: 1000px) {
		footer {
			z-index:-99;
			opacity:0.1;
		}
	}
</style>
