<script>
	import { slide } from "svelte/transition";
	import PageTransition from "$lib/components/PageTransitionFly.svelte";

	let members = [
		{
			name: "Alec Ames",
			pic: "https://media.licdn.com/dms/image/D5603AQGBaGdxymdLTA/profile-displayphoto-shrink_800_800/0/1679545357267?e=1687392000&v=beta&t=tdCHXPorM-cBHk8URmvTgFk83c2wrhPRO0cd0wFu-OA",
			role: "Team Lead • Developer",
			github: "https://github.com/alecames",
			linkedin: "https://www.linkedin.com/in/alecames/",
		},
		{
			name: "Ibrahim Hashmi",
			pic: "https://media.licdn.com/dms/image/C4E03AQEr70AZWiDNWA/profile-displayphoto-shrink_800_800/0/1613092600500?e=1687392000&v=beta&t=eV5-BPVA_HLEox8wmFLj4MJSPUe2gToHJKCAQ-d8b_o",
			role: "Developer",
			github: "https://github.com/ibhashmi",
			linkedin: "https://www.linkedin.com/in/ibrahimh26/",
		},
		{
			name: "Francis Monwe",
			pic: "https://media.licdn.com/dms/image/C4E03AQFheKji8LLI2g/profile-displayphoto-shrink_800_800/0/1652670840391?e=1687392000&v=beta&t=rykL51jyTdCAXCFHrkmR1bJaELjel8D91hUmYMJk7K8",
			role: "Developer",
			github: "https://github.com/monwe-jr",
			linkedin: "https://www.linkedin.com/in/francis-monwe-674501198/",
		},
		{
			name: "Matthew Benson",
			pic: "https://media.licdn.com/dms/image/C4E03AQFk04BV0Phu4g/profile-displayphoto-shrink_800_800/0/1627429475282?e=1687392000&v=beta&t=8S9vHSFl1v565Hdm9EwftvrDOmUBH-1My5Neua5m5j8",
			role: "Developer",
			github: "https://github.com/MattMBenson",
			linkedin: "https://www.linkedin.com/in/matthew-benson-59b1a31b7/",
		},
		{
			name: "Tommy Pham",
			pic: "https://media.licdn.com/dms/image/C4D03AQFyO7qwiqBjXQ/profile-displayphoto-shrink_800_800/0/1566411354394?e=1687392000&v=beta&t=GEGLxQY6epG9fB6DymGQlPMlPUeObS-zA948WMsP_P0",
			role: "Developer",
			github: "https://github.com/tommyphamca",
			linkedin: "https://www.linkedin.com/in/tommyphamca/",
		},
		{
			name: "Abhijeet Prajapati",
			pic: "https://avatars.githubusercontent.com/u/68875359?v=4",
			role: "Developer",
			github: "https://github.com/TheDasher1",
			linkedin: "https://www.linkedin.com/in/abhijeet-prajapati-4a20a7164/",
		},
		{
			name: "Justin Stickel",
			pic: "https://media.licdn.com/dms/image/C5603AQHhT11yEwhjnw/profile-displayphoto-shrink_800_800/0/1608219438361?e=1687392000&v=beta&t=6zMLZCUaRMBFYvP4CSk_snY1a9PXHFpNOtcwlcD_0cw",
			role: "Scrum Master",
			github: "https://github.com/Stickelation",
			linkedin: "https://www.linkedin.com/in/justin-stickel/",
		},
		{
			name: "Haaris Yahya",
			pic: "https://avatars.githubusercontent.com/u/80646420?v=4",
			role: "Developer",
			github: "https://github.com/haarisyahya",
			linkedin: "https://www.linkedin.com/in/haaris-yahya-398ba9195/",
		},
	];
</script>

<svelte:head>
	<title>About | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="About page" />
</svelte:head>

<PageTransition>
	<gap />
	<section class="page" in:slide>
		<div>
			<h1>About Niagara-on-the-Lake</h1>
			<div class="row v-align">
				<p>
					Niagara-on-the-Lake (NOTL) is a small town located in southern
					Ontario, Canada. Despite its size, it has a rich history dating back
					to the 19th century. The town was home to Fort George, which was built
					by the British to defend against American offensives in the 19th
					century. Today, NOTL is known for its beautiful flowers and trees and
					is home to the summer Shaw Festival and its iconic wineries.
				</p>
				<img class="radius" src="assets/clock-tower.webp" alt="Clock Tower" />
			</div>
		</div>
		<div>
			<h1>About the Museum</h1>
			<div class="row v-align">
				<img
					class="radius"
					src="assets/museum.jpg"
					alt="Niagara-on-the-Lake Museum Logo" />
				<p>
					The NOTL Museum is operated and owned by the Niagara Historical
					Society (est. 1895) and continues to present and represent
					Niagara-on-the-Lake’s rich heritage and history. The museum has over
					8,500 artifacts, 41,000 documents, 400 photographs, and 900 books
					ranging from the Indigenous settlement period to the present day. The
					museum hosts a permanent exhibition called “Our Story,” which
					documents the history of NOTL. It also hosts two temporary exhibitions
					yearly and over 80 engaging programs that are enjoyed by people from
					all walks of life.
				</p>
			</div>
		</div>
		<div>
			<h1>About the Timeline</h1>
			<div class="row v-align">
				<p>
					The Niagara-on-the-Lake Timeline is a project created a team of
					student developers from Brock University created for the
					Niagara-on-the-Lake Museum. The project is an interactive timeline
					that documents the history of NOTL from 1726 to the present day. The
					timeline is developed as a term-long project for COSC 4P02 &mdash; the
					Software Engineering course taught by Prof. Naser Ezzati-Jivan at
					Brock University.
				</p>
				<img
					width="100"
					class="radius"
					src="assets/brock.png"
					alt="Brock University Logo" />
			</div>
			<gap />
			<p>
				Want to download the app? Click the button below!
				<a
					href="https://play.google.com/store/apps/details?id=app.notltimeline.twa&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
					><img
						width="250"
						alt="Get it on Google Play"
						src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" /></a>
			</p>
		</div>
		<div>
			<h1>Our Team</h1>
			<div class="row v-align">
				<p style="text-align:center">
					Meet the software development team behind the Niagara-on-the-Lake
					Timeline.
				</p>
				<!-- Team container  -->
				<div class="container">
					<!-- {#each members as {name, pic, github}} -->
					{#each members as member}
						<div class="member-card">
							<div class="avatar">
								<a href={member.github}
									><img src={member.pic} alt={member.name} /></a>
							</div>
							<div class="team-content">
								<h3 class="title">{member.name}</h3>
								<span class="role">{member.role}</span>
							</div>
							<ul class="social">
								<li>
									<a href={member.linkedin}
										><span class="fab fa-linkedin" /></a>
								</li>
								<li>
									<a href={member.github}><span class="fab fa-github" /></a>
								</li>
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
	<big-gap />
</PageTransition>

<style>
	.container {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		margin: auto;
		gap: 2rem;
	}

	.member-card {
		flex: 1 20%;
		min-width: 16rem;
		background: var(--color-bg-1);
		padding: 1rem;
		text-align: center;
		align-items: center;
		overflow: hidden;
		position: relative;
		border-radius: 1.5rem;
		border: var(--border);
	}

	.member-card .avatar {
		display: inline-block;
		align-self: center;
		width: 10rem;
		height: 10rem;
		margin-bottom: 0px;
		z-index: 1;
		position: relative;
	}

	.member-card .avatar::before {
		content: "";
		width: 100%;
		height: 0;
		border-radius: 100%;
		background: var(--color-theme-2);
		position: absolute;
		bottom: 135%;
		right: 0;
		left: 0;
		opacity: 0.2;
		transform: scale(3);
		transition: all 0.3s var(--curve);
	}

	.member-card:hover .avatar::before {
		height: 10rem;
	}

	.member-card .avatar img {
		width: 100%;
		height: auto;
		border-radius: 50%;
		transform: scale(1);
		transition: all 0.5s var(--curve);
	}

	.member-card:hover .avatar img {
		box-shadow: 0 0 0 14px var(--color-theme-2);
		transform: scale(0.9);
	}

	.member-card .team-content {
		margin-bottom: 4rem;
	}

	.member-card .title {
		font-size: var(--font-size-base);
	}

	.member-card .role {
		display: block;
		font-size: var(--font-size-small);
	}

	.member-card .social {
		width: 100%;
		padding: 0;
		margin: 0;
		background: var(--color-theme-2);
		position: absolute;
		bottom: -100px;
		left: 0;
		transition: all 0.5s var(--curve);
	}

	.member-card:hover .social {
		bottom: 0;
	}

	.member-card .social li {
		display: inline-block;
	}

	.member-card .social li a {
		text-decoration: none;
		display: inline-flex;
		padding: 0.7rem;
		font-size: var(--font-size-small);
		color: #fff;
		transition: all 0.3s var(--curve);
	}

	h1 {
		text-align: center;
	}

	section {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}

	section p {
		flex: 1 1 50%;
		text-align: justify;
		display: flex;
		align-items: center;
		flex-flow: column;
		margin: 0 auto;
		max-width: 40rem;
	}

	.row > img {
		flex: 1 1 50%;
		display: flex;
		margin: 0 auto;
		width: 100%;
		max-width: 30rem;
	}

	.row {
		gap: 3rem;
	}
</style>
