<script>
  import PageTransitionFly from "$lib/components/PageTransitionFly.svelte";

</script>


<PageTransitionFly>
	<section class=page>
		<h1>Privacy Policy</h1>
	
		<p>Last updated: April 19th, 2023</p>
	
		<p>
			This Privacy Policy explains how we handle your personal information when you use our Niagara-on-the-Lake (NOTL) Interactive
			Timeline application ("the Application").
		</p>
	
		<h2>Information We Collect</h2>
	
		<p>
			We do not collect any personal information from users of the Application,
			except for the information voluntarily provided by users through the Contact
			Us page. This may include the user's name, email address, phone number, and any other
			information included in their inquiry.
		</p>
	
		<h2>How We Use Your Information</h2>
	
		<p>
			We use the information provided through the Contact Us page solely for the
			purpose of responding to user inquiries and providing customer support. We
			do not share this information with any third parties, except as required by
			law or to protect our rights.
		</p>
	
		<h2>Invite-Only Access</h2>
	
		<p>
			Access to certain features of the Application, such as signing in, is
			available on an invite-only basis for museum staff and administrators. We do not collect any
			personal information from users as part of this process, other than the
			information required to verify their identity and grant them access to these
			features.
		</p>
	
		<h2>Security</h2>
	
		<p>
			We take reasonable measures to protect the security of the information that
			users provide to us through the Contact Us page. However, no method of
			electronic transmission or storage is 100% secure, and we cannot guarantee
			the absolute security of your information.
		</p>
	
		<h2>Changes to This Privacy Policy</h2>
	
		<p>
			We may update this Privacy Policy from time to time. We will notify you of
			any changes by posting the new Privacy Policy on this page and updating the
			"Last updated" date at the top of this policy. You are advised to review
			this Privacy Policy periodically for any changes.
		</p>
	
		<h2>Contact Us</h2>
	
		<p>
			If you have any questions about this Privacy Policy, please contact us by
			email at <a href="mailto:dev@alecames.com">dev@alecames.com</a>, or through the Contact Us page on the Application.
		</p>
	</section>
</PageTransitionFly>


<style>
	section {
		max-width: 50rem;
		margin: 0 auto;
		padding: 2rem;
		background: var(--color-bg-1);
		border-radius:1rem;
		border:var(--border);
	}

	@media (max-width: 1000px) {
		section {
			margin: 0 -3rem;
		}
	}

	p {
		font-size: var(--font-size-small);
	}

	
</style>