<script>
	export let grey = false;
</script>

<div class={grey ? "socials grey" : "socials"}>
	<a href="https://www.facebook.com/NOTLMuseum/" title="Facebook"
		><span class="fab fa-facebook" /></a>
	<a href="https://twitter.com/NOTLMuseum" title="Twitter">
		<span class="fab fa-twitter" /></a>
	<a href="https://www.instagram.com/notlmuseum/" title="Instagram"
		><span class="fab fa-instagram" /></a>
	<a href="https://www.youtube.com/user/NOTLMuseum" title="YouTube"
		><span class="fab fa-youtube" /></a>
		<div class=line/>
	<a href="https://github.com/SWE-2023/COSC-4P02-Project" title="GitHub"
		><span class="fab fa-github" /></a>
		<a href="https://play.google.com/store/apps/details?id=app.notltimeline.twa" title="GitHub"
		><span class="fab fa-google-play" /></a>
</div>

<style>
	.socials {
		font-size: var(--font-size-base);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.line {
		border-left: var(--border);
		height: var(--font-size-base);
		margin: 0;
	}

	.grey a {
		color: var(--color-text);
	}
</style>
