<script>
	import { createEventDispatcher } from "svelte";
	import Dot from "./Dot.svelte";
	export let item;
	export let spacing;
	export let currentItem;

	const dispatch = createEventDispatcher();
	const change = () => dispatch("change");
	function setDetails() {
		currentItem = item;
	}
</script>

<div class="lineItem">
	<div style="top:{spacing}vh">
		<Dot eventOne={setDetails} eventTwo={change} isActive={false}>
			<div class="date">{item.id}</div>
		</Dot>
	</div>
</div>

<style>
	.lineItem {
		user-select:none;
		display: flex;
		position: absolute;
		left: 43px;
	}

	.lineItem div {
		padding: none;
		position: relative;
	}

	.date {
		user-select:none;
		top:-2px;
		font-size: 13px;
		left: 0.2rem;
		opacity: 0.5;
		filter: blur(3px);
		
		transform-origin: center;
		z-index: -2;
		padding: 0 2.5rem 0 2rem;
		transition: all 0.15s ease-in-out;
	}

	.lineItem:hover .date {
		cursor: pointer;
		color: var(--color-bg-2);
		transform: scale(1.2);
		opacity: 1;
		filter: blur(0px);
		z-index: 111;
	}

	.lineItem:hover :global(button) {
		cursor: pointer;
		width: 5rem;
		height:1rem;
		transform: scale(1.2);
	}

	.date:hover :global(button) {
		cursor: pointer;
		width: 5rem;
		transform: scale(1.2);
	}
</style>
