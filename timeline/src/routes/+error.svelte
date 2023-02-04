<script>
// @ts-nocheck
	import { page } from '$app/stores';
	
</script>

<div>
	<h1>{$page.status}</h1>
	<p>{$page.error.message}</p>
	<a href="/">GO HOME</a>
</div>

<style>
	div {
		border: 5px dashed var(--color-theme-1);
		border-radius: 100%;
		width: 16rem;
		height: 16rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: auto auto;
	}

	h1 {
		font-size: 5rem;
		font-weight: 700;
		margin: 0;
	}
	p {
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0;
		text-align: center;
		text-transform: uppercase;
	}
</style>
