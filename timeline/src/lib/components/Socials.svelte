<script>
	export let grey = false;
</script>

<div class={grey ? "socials grey" : "socials"}>
	<a href="https://www.facebook.com/NOTLMuseum/" title="Facebook"
		><span class="fa fa-facebook" /></a>
	<a href="https://twitter.com/NOTLMuseum" title="Twitter">
		<span class="fa fa-twitter" /></a>
	<a href="https://www.instagram.com/notlmuseum/" title="Instagram"
		><span class="fa fa-instagram" /></a>
	<a href="https://www.youtube.com/user/NOTLMuseum" title="YouTube"
		><span class="fa fa-youtube-play" /></a>
	<a href="https://github.com/SWE-2023/COSC-4P02-Project" title="GitHub"
		><span class="fa fa-github" /></a>
</div>

<style>
	.socials {
		font-size: var(--font-size-base);
		display: flex;
		gap: 1rem;
	}

	.grey a {
		color: var(--color-text);
	}
</style>
