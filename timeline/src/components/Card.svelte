<script>
	import { Card, Button, Toggle } from "flowbite-svelte";
	let vCard = false;
  </script>
  <div>
	<Card img="/images/image-1.webp" reverse={vCard}>
	  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
	  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
		Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
	  </p>
	  <Button>
		Read more <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
	  </Button>
	</Card>
	<Toggle bind:checked={vCard} class="mt-4 italic dark:text-gray-500">Reverse</Toggle>
  </div>