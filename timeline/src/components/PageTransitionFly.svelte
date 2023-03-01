<!-- based on https://dev.to/giorgosk/smooth-page-transitions-in-layout-svelte-with-sveltekit-or-sapper-4mm1 -->
<script>
	import { fly } from "svelte/transition";
</script>

<div
	in:fly={{ y: -50, duration: 500, delay: 501 }}
	out:fly={{ y: -50, duration: 500 }}>
	<slot />
</div>
