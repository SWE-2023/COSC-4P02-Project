<script>
    function IncFontSize() {
		var elmntsToChg = document.querySelectorAll('[id=text]');

		for (let i = 0; i < elmntsToChg.length; i ++) {
			// @ts-ignore
			let temp = window.getComputedStyle(elmntsToChg[i]).fontSize;
			// 1 rem is equal to 16px and ^ returns size in px
			let tem = parseInt(temp); // turn into float
			tem = tem + 16; // add 16 to inc by 1 rem equival
			tem = tem / 16; // div by 16 to turn back to rem equival
			let finaltem = tem.toString() + 'rem'; // change back to 'rem' style
			// console.log(tem);

			// @ts-ignore
			elmntsToChg[i].style.fontSize = finaltem; // changes size

		}

	}

	function DecFontSize() {
		var elmntsToChg = document.querySelectorAll('[id=text]');
		
		for (let i = 0; i < elmntsToChg.length; i ++) {	
			// @ts-ignore
			let temp = window.getComputedStyle(elmntsToChg[i]).fontSize;
			// 1 rem is equal to 16px and ^ returns size in px
			let tem = parseInt(temp); // turn into float (js acting weird if i just use the same variable, so using another)
			tem = tem - 16; // subt 16 to dec by 1 rem equival
			tem = tem / 16; // div by 16 to turn back to rem equival
			let finaltem = tem.toString() + 'rem'; // change back to 'rem' style
			// console.log(tem);

			// @ts-ignore
			elmntsToChg[i].style.fontSize = finaltem; // changes size

		}

	}

</script>

<button class="PosButton" on:click={IncFontSize}>+</button>
<button class="NegButton" on:click={DecFontSize}>-</button>

<style>
    .PosButton {
		position: absolute;
		top: 15%;
		left: 50%;
	}

	.NegButton {
		position: absolute;
		top: 15%;
		left: 55%;
	}
</style>
