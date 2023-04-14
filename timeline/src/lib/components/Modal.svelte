<script>
	import Button from "$lib/components/Button.svelte";
	export let showModal;

	let dialog;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}>
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<div class=btn><Button autofocus text={"OK"} on:click={() => dialog.close()}/></div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 40em;
		background: var(--color-bg-2);
		color: var(--color-text);
		border-radius: 1rem;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
		transition:all 0.5s var(--curve);
	}

	hr {
		border: none;
		border-top: 1px solid var(--color-text);
		opacity: 0.33;
	}

	dialog > div {
		padding: 1.5em;
	}

	dialog[open] {
		animation: zoom 0.5s var(--curve);
	}

	@keyframes zoom {
		from {
			transform: scale(0.8);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.5s var(--curve);
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.btn {
		display: flex;
		justify-content: center;
	}
</style>
