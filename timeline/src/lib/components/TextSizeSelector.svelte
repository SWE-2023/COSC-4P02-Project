<script context="module">
	import { currentSizeStore } from "$lib/stores/store";

	let size;
	currentSizeStore.subscribe((value) => {
		size = value;
	});

	export function set() {
		const root = document.documentElement;
		root.style.setProperty("--font-size-base", `${size}rem`);
	}

	function handleIncrease() {
		if (size <= 2.5) {
			size += 0.1;
			set();
			currentSizeStore.set(size);
		}
	}

	function handleDecrease() {
		if (size >= 0.70) {
			size -= 0.1;
			set();
			currentSizeStore.set(size);
		}
	}

	function handleReset() {
		size = 1.2;
		set();
		currentSizeStore.set(size);
	}
</script>

<div class="btn-group">
	<button class=btn disabled>
		<span class="material-symbols-rounded"> format_size </span>
	</button>
	<button class=btn on:click={handleDecrease}
		><span class="material-symbols-rounded"> remove </span></button>
	<button class=btn on:click={handleReset}
		><span class="material-symbols-rounded"> refresh </span></button>
	<button class=btn on:click={handleIncrease}
		><span class="material-symbols-rounded"> add </span></button>
</div>

<style>
	:root {
		--font-size-xsmall: calc(var(--font-size-base) * 0.66); /* 0.8rem */
		--font-size-small: calc(var(--font-size-base) * 0.83); /* 0.99rem */
		--font-size-base: 1.2rem;
		--font-size-medium: calc(var(--font-size-base) * 1.2); /* 1.44rem */
		--font-size-large: calc(var(--font-size-base) * 1.5); /* 1.8rem */
		--font-size-xlarge: calc(var(--font-size-base) * 1.6); /* 1.92rem */
		--font-size-xxlarge: calc(var(--font-size-base) * 2); /* 2.4rem */
		--font-size-xxxlarge: calc(var(--font-size-base) * 3); /* 3.6rem */
		--font-size-xxxxlarge: calc(var(--font-size-base) * 4); /* 4.8rem */
	}

	.btn {
		border: none !important;
	}

	.btn-group {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		padding:0 var(--font-size-xxlarge);
		gap: 5px;
	}

	.btn-group .btn {
		user-select: none;
		color: var(--color-theme-1);
		line-height: 0;
		height: calc((var(--font-size-base) * 1) + 1.5rem);
		width: calc(var(--font-size-base) * 1 + 1.5rem);
		margin: 0;
		padding: 0;
		justify-self: center;
		background: var(--color-bg-2);
		border-radius: 100rem;
		border: 1px solid var(--border);
		font-weight: 900;
		transition: all 0.33s var(--curve);
	}

	.btn > span {
		font-size: var(--font-size-medium);
	}

	.btn-group .btn:disabled, .btn-group .btn:disabled:hover, .btn-group .btn:disabled:active {
		color: var(--color-text);
		background:none;
	}

	.btn-group .btn:hover {
		filter: invert(0.1);
	}

	.btn-group .btn:active {
		filter: invert(0.3);
		transition: none;
	}
</style>
