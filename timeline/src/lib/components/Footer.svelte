<script>
	import { countStore } from "$lib/stores/store.js";
  import Socials from "./Socials.svelte";

	let countValue;
	countStore.subscribe((value) => {
		countValue = value;
	});
</script>

<footer class="footer">
	<div class="bar" />
	<div class="footer-container">
		<div class="footer-column">
			<h4>Contact</h4>
			<p><span class="material-symbols-rounded i">location_on</span>&nbsp;43 Castlereagh St, Niagara-on-the-Lake, ON L0S 1J0</p>
			<p><span class="material-symbols-rounded i">phone</span><a href="tel:9054683912">&nbsp;(905) 468-3912</a></p>
			<Socials grey/>
		</div>
		<div class="footer-column">
			<h4>Site Links</h4>
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/timeline">Explore</a></li>
				<li><a href="/contact">Contact Us</a></li>
				<li><a href="/about">About Us</a></li>
				<li><a href="/privacy">Privacy Policy</a></li>
				
			</ul>
		</div>
		<div class="footer-column">
			<h4>Related Links</h4>
			<ul>
				<li><a href="https://www.notlmuseum.ca">NOTL Museum</a></li>
				<li><a href="https://www.notl.com">Niagara-on-the-Lake</a></li>
				<li><a href="https://www.niagararegion.ca">Niagara Region</a></li>
				<li><a href="https://github.com/SWE-2023/COSC-4P02-Project">GitHub Repository</a></li>
				<li><a href="https://brocku.ca">Brock University</a></li>
			</ul>
		</div>
	</div>
	<div class="footer-bottom">
		<p>&copy; Niagara-on-the-Lake Museum 2023. All Rights Reserved.</p>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		width: 100%;
		bottom: 0;
		left: 0;
		right: 0;
		border-top:var(--border);
		background-color: var(--color-bg-1);
	}

	.footer-container {
		display: flex;
		justify-content: space-around;
		max-width: 80rem;
		padding: 4rem 1rem;
		margin: 0 auto;
	}

	.footer-column {
		margin:0 1rem;
	}

	.footer-column h4 {
		font-size: var(--font-size-small);
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.footer-column p {
		line-height: 2rem;
		font-size:var(--font-size-small);
	}

	.footer-column ul {
		list-style: none;
		padding: 0;
	}

	.footer-column li {
		margin-bottom: 0.5rem;
		font-size:var(--font-size-small);
	}

	a {
		color: var(--color-text);
		text-decoration: none;
		transition: all 0.5s var(--curve);
	}

	a:hover {
		text-decoration: underline;
		color: var(--color-theme-1);
	}

	.footer-bottom {
		padding:0 1rem;
		background-color: var(--footer);
		height: 4rem;
		color: #fcfcfc;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	@media (max-width: 768px) {
		.footer-container {
			flex-direction: column;
		}

		.footer-column {
			margin-bottom: 2rem;
		}
	}
</style>
