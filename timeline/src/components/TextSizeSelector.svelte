<script context="module">
	import { currentSizeStore } from "../store";

	let size;
	currentSizeStore.subscribe((value) => {
		size = value;
	});

	export function set() {
		const root = document.documentElement;
		root.style.setProperty("--font-size-base", `${size}rem`);
	}

	function handleIncrease() {
		if (size <= 1.8) {
			size += 0.1;
			set();
			currentSizeStore.set(size);
		}
	}

	function handleDecrease() {
		if (size >= 0.8) {
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


<div class="radio-group">
	<button on:click={handleDecrease}
		><span class="material-symbols-rounded"> remove </span></button>
	<button on:click={handleReset}
		><span class="material-symbols-rounded"> refresh </span></button>
	<button on:click={handleIncrease}
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

	.radio-group {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		gap: 5px;
	}

	.radio-group button {
		user-select: none;
		color: var(--color-theme-1);
		line-height: 0;
		height: 2rem;
		width: 2rem;
		margin: 0;
		padding: 0;
		justify-self: center;
		background: #0000001e;
		border-radius: 1rem;
		border: 1px solid var(--border);
		font-size: 2rem; /* not variable */
		font-weight: 900;
		transition: all 0.12s ease-in-out;
	}

	.radio-group button:hover {
		background: #00000044;
	}

	.radio-group button:active {
		background: #00000066;
		transition: none;
	}
</style>
