<script>
	export let pos = 0;
	let startYear = 1720;
	let endYear = 2020;
	let cursorHeight = 300;

	let y = 0;

	let currentYear = startYear;

	function updateCurrentYear(yPos) {
		y = yPos;
		const range = endYear - startYear;
		const yearPerPixel = range / cursorHeight;
		const yearOffset = Math.round(y * yearPerPixel);
		currentYear = startYear + yearOffset;
		return currentYear;
	}
</script>

<div class="cursor">
	<div class="year" style="transform: translateY({pos * 5 - 400}%);">
		<!-- {updateCurrentYear(pos)} -->
	</div>
</div>

<style>
	.cursor {
		position: absolute;
		height: 2px;
		background-color: black;
		margin: 0 auto;
	}
	.year {
		user-select: none;
		position: absolute;
		top: -1.5rem;
		left: 5rem !important;
		font-size: 1rem;
		font-weight: bold;
		white-space: nowrap;
	}
</style>
