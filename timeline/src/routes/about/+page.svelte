<script>
	import { fade } from 'svelte/transition';
	import PageTransition from '../../components/PageTransition.svelte';

	function IncFontSize() {
		var elmntsToChg = document.querySelectorAll('[id=text]');
		
		for (let i = 0; i < elmntsToChg.length; i ++) {
			// @ts-ignore
			if (!elmntsToChg[i].style.fontSize) {
				if (elmntsToChg[i].className.includes('title', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "3.5rem";

				} else if (elmntsToChg[i].className.includes('subtitle', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "2.5rem";
				
				} else {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "1.5rem";
					
				}

			} else {
				// @ts-ignore
				let temp = elmntsToChg[i].style.fontSize;
				temp = parseFloat(temp);
				temp = temp + 1;
				let finalTemp = temp.toString() + 'rem';

				// @ts-ignore
				elmntsToChg[i].style.fontSize = finalTemp;


			}

		}

	}
	
	function DecFontSize() {
		var elmntsToChg = document.querySelectorAll('[id=text]');
		
		for (let i = 0; i < elmntsToChg.length; i ++) {
			// @ts-ignore
			if (!elmntsToChg[i].style.fontSize) {
				if (elmntsToChg[i].className.includes('title', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "3.5rem";

				} else if (elmntsToChg[i].className.includes('subtitle', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "2.5rem";
				
				} else {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "1.5rem";
					
				}

			} else {
				// @ts-ignore
				let temp = elmntsToChg[i].style.fontSize;
				temp = parseFloat(temp);
				temp = temp - 1;
				let finalTemp = temp.toString() + 'rem';

				// @ts-ignore
				elmntsToChg[i].style.fontSize = finalTemp;
			}

		}

	}

</script>

<svelte:head>
	<title>About | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="About page" />
</svelte:head>

<button class="PosButton" on:click={IncFontSize}>+</button>
<button class="NegButton" on:click={DecFontSize}>-</button>

<PageTransition>
<section in:fade>
	<h1 id="text">About</h1>
	<p id="text">Sample Text</p>
</section>
</PageTransition>

<style>
	h1 {
		font-family: var(--font-serif);
		padding: 2em 0 0 0;
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
	}


	p {
		padding: 1em 0 1em 0;
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0;
		text-align: center;
		text-transform: uppercase;
	}

	.PosButton {
		position: absolute;
		top: 15%;
		left: 96%;
	}

	.NegButton {
		position: absolute;
		top: 15%;
		left: 98%;
	}

</style>

