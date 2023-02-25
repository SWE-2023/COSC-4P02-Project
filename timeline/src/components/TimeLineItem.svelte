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
		user-select: none;
		display: flex;
		position: absolute;
	}

	.lineItem div {
		padding: none;
		position: relative;
	}

	.date {
		color: var(--color-text);
		user-select: none;
		top: -2px;
		font-size: 13px;
		left: 0.2rem;
		opacity: 0.5;
		filter: blur(3px);

		transform-origin: center;
		z-index: -2;
		padding: 0 2.5rem 0 2rem;
		transition: all 0.15s ease-in-out;
	}

	@media (max-width: 1000px) {
		.date {
			padding: 0 2.5rem 0 1rem;
		}
	}

	.lineItem:hover .date {
		cursor: pointer;
		color: #e0dbd4; /* doesnt change since background is red */
		transform: scale(1.2);
		opacity: 1;
		filter: blur(0px);
		z-index: 111;
	}
</style>
