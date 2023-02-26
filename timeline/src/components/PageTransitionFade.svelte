<!-- based on https://dev.to/giorgosk/smooth-page-transitions-in-layout-svelte-with-sveltekit-or-sapper-4mm1 -->
<script>
	import { fade } from "svelte/transition";
</script>

<div
	in:fade={{ duration: 500, delay: 501 }}
	out:fade={{  duration: 500 }}>
	<slot />
</div>
