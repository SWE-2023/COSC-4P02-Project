<script>
	import { fade } from 'svelte/transition';
	import PageTransition from '../../components/PageTransition.svelte';

	function IncFontSize() {
		var elmntsToChg = document.querySelectorAll('[id=text]');
		
		console.log(elmntsToChg);
		
		// elmntsToChg.forEach(elmnt => {
		// 	elmnt.style.font-size = "4rem";
		// });

		for (let i = 0; i < elmntsToChg.length; i ++) {
			// @ts-ignore
			console.log(elmntsToChg[i].style.fontSize);
			// @ts-ignore
			// elmntsToChg[i].style.fontSize = "5rem";

			// @ts-ignore
			if (!elmntsToChg[i].style.fontSize) {
				console.log('still here');
				// if (elmntsToChg[i].className === 'title') {
				if (elmntsToChg[i].className.includes('title', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "3.5rem";

				} else if (elmntsToChg[i].className.includes('subtitle', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "2.5rem";
				
				// } else if (elmntsToChg[i].className.includes('subtext')) {
				} else {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "1.5rem";
					// @ts-ignore
					// console.log(elmntsToChg[i].style.fontSize);

				}

			} else {
				console.log('defaulted here now');
				// get fontSize which is string
				// trimm the 'rem' off the end so only the numerical digit is present
				// turn into integer (any number format)
				// increase that integer by 1, (decided to add 1 instead since parseFloat() func doess the top steps 2 in 1 go)
				// turn integer back to string
				// attach 'rem' back too the end of the integer
				// set that as it's new fontSize
				// @ts-ignore
				// elmntsToChg[i].style.fontSize = elmntsToChg[i].style.fontSize + (1 * "1rem");

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
		
		// console.log(elmntsToChg);

		for (let i = 0; i < elmntsToChg.length; i ++) {
			// @ts-ignore
			// console.log(elmntsToChg[i].style.fontSize);

			// @ts-ignore
			if (!elmntsToChg[i].style.fontSize) {
				console.log('still here');
				// if (elmntsToChg[i].className === 'title') {
				if (elmntsToChg[i].className.includes('title', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "3.5rem";

				} else if (elmntsToChg[i].className.includes('subtitle', 0)) {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "2.5rem";
				
				// } else if (elmntsToChg[i].className.includes('subtext')) {
				} else {
					// @ts-ignore
					elmntsToChg[i].style.fontSize = "1.5rem";
					// @ts-ignore
					// console.log(elmntsToChg[i].style.fontSize);

				}

			} else {
				console.log('defaulted here now');
				// get fontSize which is string
				// trimm the 'rem' off the end so only the numerical digit is present
				// turn into integer (any number format)
				// increase that integer by 1, (decided to add 1 instead since parseFloat() func doess the top steps 2 in 1 go)
				// turn integer back to string
				// attach 'rem' back too the end of the integer
				// set that as it's new fontSize
				// @ts-ignore
				// elmntsToChg[i].style.fontSize = elmntsToChg[i].style.fontSize + (1 * "1rem");

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
	<title>Contact | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="Contact page" />
</svelte:head>

<button class="PosButton" on:click={IncFontSize}>+</button>
<button class="NegButton" on:click={DecFontSize}>-</button>

<PageTransition>
	<section in:fade>
		<h1 id="text">Contact the Museum</h1>
		<p id="text">
			Visit the <a href="https://www.notlmuseum.ca"
				>Niagara-on-the-Lake Museum</a
			>.
		</p>
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

