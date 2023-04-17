<script context="module">
	import { currentSizeStore } from "$lib/stores/store";

	let size;
	currentSizeStore.subscribe((value) => {
		size = value;
	});

	export function setFontSize() {
		const root = document.documentElement;
		root.style.setProperty("--font-size-base", `${size}rem`);
	}

	function handleIncrease() {
		if (size <= 2) {
			size += 0.1;
			setFontSize();
			currentSizeStore.set(size);
		}
	}

	function handleDecrease() {
		if (size >= 0.7) {
			size -= 0.1;
			setFontSize();
			currentSizeStore.set(size);
		}
	}

	function handleReset() {
		size = 1.2;
		setFontSize();
		currentSizeStore.set(size);
	}
</script>

<div class="btn-group">
	<button class="btn" disabled>
		<span class="material-symbols-rounded"> format_size </span><b>&nbsp;{(Number($currentSizeStore)/1.2).toFixed(1)}x</b>
	</button>
	<button title="Decrease font size" class="btn" on:click={handleDecrease}
		><span class="material-symbols-rounded"> remove </span></button>
	<button title="Reset font size" class="btn" on:click={handleReset}
		><span class="material-symbols-rounded"> refresh </span></button>
	<button title="Increase font size" class="btn" on:click={handleIncrease}
		><span class="material-symbols-rounded"> add </span></button>
</div>

<style>
	:root {
		--font-size-xsmall: calc(var(--font-size-base) * 0.66); /* 0.8rem */
		--font-size-small: calc(var(--font-size-base) * 0.83); /* 0.99rem */
		--font-size-smallish: calc(var(--font-size-base) * 0.9); /* 1.08rem */
		--font-size-base: 1.2rem;
		--font-size-medium: calc(var(--font-size-base) * 1.2); /* 1.44rem */
		--font-size-large: calc(var(--font-size-base) * 1.5); /* 1.8rem */
		--font-size-xlarge: calc(var(--font-size-base) * 1.6); /* 1.92rem */
		--font-size-xxlarge: calc(var(--font-size-base) * 2); /* 2.4rem */
		--font-size-xxxlarge: calc(var(--font-size-base) * 3); /* 3.6rem */
		--font-size-xxxxlarge: calc(var(--font-size-base) * 4); /* 4.8rem */
	}

	.btn {
		border: none;
	}

	.btn-group {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		padding: 0 var(--font-size-xxlarge);
		/* gap: 5px; */
	}

	.btn-group .btn:not(:disabled) {
		user-select: none;
		color: var(--color-theme-1);
		line-height: 0;
		height: 3em;
		width: 3em;
		margin: 2px;
		justify-self: center;
		background: none;
		backdrop-filter: invert(0.1);
		border-radius: 5rem;
		border:var(--border);
		font-weight: 900;
		transition: all 0.33s var(--curve);
	}

	b {
		line-height:0;
		vertical-align:4px;
	}

	.btn:disabled > span{
		font-size: var(--font-size-base);
	}

	.btn > span {
		font-size: var(--font-size-medium);
	}

	.btn-group .btn:disabled,
	.btn-group .btn:disabled:hover,
	.btn-group .btn:disabled:active {
		color: var(--color-text);
		background: none;
	}

	.btn-group .btn:hover:not(:disabled) {
		filter: invert(0.2);
	}

	.btn-group .btn:active {
		filter: invert(0.3);
		transition: none;
	}
</style>
