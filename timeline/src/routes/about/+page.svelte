<script>
	import { slide } from "svelte/transition";
	import PageTransition from "$lib/components/PageTransitionFly.svelte";

	let members1 = [
		{
			name: "Alec Ames",
			pic: "https://media.licdn.com/dms/image/D5603AQGBaGdxymdLTA/profile-displayphoto-shrink_800_800/0/1679545357267?e=1687392000&v=beta&t=tdCHXPorM-cBHk8URmvTgFk83c2wrhPRO0cd0wFu-OA",
			github: "https://github.com/alecames",
			linkedin: "https://www.linkedin.com/in/alecames/"
		},
		{
			name: "Ibrahim Hashmi",
			pic: "https://media.licdn.com/dms/image/C4E03AQEr70AZWiDNWA/profile-displayphoto-shrink_800_800/0/1613092600500?e=1687392000&v=beta&t=eV5-BPVA_HLEox8wmFLj4MJSPUe2gToHJKCAQ-d8b_o",
			github: "https://github.com/ibhashmi",
			linkedin: "https://www.linkedin.com/in/ibrahimh26/"
		},
		{
			name: "Francis Monwe",
			pic: "https://media.licdn.com/dms/image/C4E03AQFheKji8LLI2g/profile-displayphoto-shrink_800_800/0/1652670840391?e=1687392000&v=beta&t=rykL51jyTdCAXCFHrkmR1bJaELjel8D91hUmYMJk7K8",
			github: "https://github.com/monwe-jr",
			linkedin: "https://www.linkedin.com/in/francis-monwe-674501198/"
		},
		{
			name: "Matthew Benson",
			pic: "https://media.licdn.com/dms/image/C4E03AQFk04BV0Phu4g/profile-displayphoto-shrink_800_800/0/1627429475282?e=1687392000&v=beta&t=8S9vHSFl1v565Hdm9EwftvrDOmUBH-1My5Neua5m5j8",
			github: "https://github.com/MattMBenson",
			linkedin: "https://www.linkedin.com/in/matthew-benson-59b1a31b7/"
		
		}
	];

	let members2 = [
		{
			name: "Tommy Pham",
			pic: "https://media.licdn.com/dms/image/C4D03AQFyO7qwiqBjXQ/profile-displayphoto-shrink_800_800/0/1566411354394?e=1687392000&v=beta&t=GEGLxQY6epG9fB6DymGQlPMlPUeObS-zA948WMsP_P0",
			github: "https://github.com/tommyphamca",
			linkedin: "https://www.linkedin.com/in/tommyphamca/"
		},
		{
			name: "Abhijeet Prajapati",
			pic: "https://avatars.githubusercontent.com/u/68875359?v=4",
			github: "https://github.com/TheDasher1",
			linkedin: "https://www.linkedin.com/in/abhijeet-prajapati-4a20a7164/"
		},
		{
			name: "Justin Stickel",
			pic: "https://media.licdn.com/dms/image/C5603AQHhT11yEwhjnw/profile-displayphoto-shrink_800_800/0/1608219438361?e=1687392000&v=beta&t=6zMLZCUaRMBFYvP4CSk_snY1a9PXHFpNOtcwlcD_0cw",
			github: "https://github.com/Stickelation",
			linkedin: "https://www.linkedin.com/in/justin-stickel/"
		},
		{
			name: "Haaris Yahya",
			pic: "https://avatars.githubusercontent.com/u/80646420?v=4",
			github: "https://github.com/haarisyahya",
			linkedin: "https://www.linkedin.com/in/haaris-yahya-398ba9195/"
		}
	];
	

</script>

<svelte:head>
	<title>About | Niagara-on-the-Lake Timeline</title>
	<meta name="description" content="About page" />
</svelte:head>

<PageTransition>
	<gap/>
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
			<h1>Our Team</h1>
			<div class="row v-align">
				<!-- Team container  -->
				<div class="container">
				
					<!-- {#each members as {name, pic, github}} -->
					{#each members1 as member}
						<div class="our-team">
							<div class="avatar">
								<img src={member.pic} alt="">
							</div>
							<div class="team-content">
								<h3 class="title"> {member.name}</h3>
								<span class="post">Developer</span>
							</div>
							<ul class="social">
								<li><a href={member.linkedin} class="fa fa-linkedin-square"></a></li>
								<li><a href={member.github} class="fa fa-github"></a></li>
							</ul>
						</div>
					{/each}
				</div>
				<div class="container">
					{#each members2 as member}
						<div class="our-team">
							<div class="avatar">
								<img src={member.pic} alt="">
							</div>
							<div class="team-content">
								<h3 class="title"> {member.name}</h3>
								<span class="post">Developer</span>
							</div>
							<ul class="social">
								<li><a href={member.linkedin} class="fa fa-linkedin-square"></a></li>
								<li><a href={member.github} class="fa fa-github"></a></li>
							</ul>
						</div>
					{/each}
				</div>
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
					timeline is developed for the Software Engineering II course taught by
					Prof. Naser Ezzati-Jivan at Brock University. We designed this timeline
					to be accessible for all users, on desktop and mobile devices.
				</p>
				<img
					width="100"
					class="radius"
					src="assets/brock.png"
					alt="Brock University Logo" />
			</div>
		</div>
	</section>
	<big-gap/>
</PageTransition>

<style>

	body{
		margin: 0;
		padding: 100px, 0px;
		height: 100%;
		box-sizing: border-box;
		font-family: sans-serif;
	}

	.container{
		display:flex;
		flex-flow:row wrap;
		align-items:center;
		justify-content: center;
		width: 80%;
		margin:auto;

		/* margin: 0; */
		padding: 100px, 0px;
		height: 100%;
		box-sizing: border-box;
		font-family: sans-serif;
	}

	.our-team{
		flex:1;
		background:#f7f5ec;
		text-align: center;
		align-items: center;
		overflow: hidden;
		position: relative;
		margin: 0px 25px;
		padding: 30px 70px;
		border-radius: 20%;
	}

	.our-team .avatar{
		display:inline-block;
		align-self: center;
		width: 130px;
		height: 130px;
		margin-bottom: 0px;
		z-index: 1;
		position: relative;
	}

	.our-team .avatar::before{
		content: "";
		width: 100%;
		height: 0;
		border-radius: 50%;
		background: #1785eb;
		position: absolute;
		bottom: 135%;
		right: 0;
		left: 0;
		opacity: 0.2;
		transform: scale(3);
		/* transition: all 0.3s linear 0s; */
		transition: all 0.5s var(--curve);
	}

	.our-team:hover .avatar::before{
		height:100%;
	}

	.our-team .avatar::after{
		content:"";
		width:100%;
		height: 100%;
		border-radius: 50%;
		background: #1785eb;
		position: absolute;
		top:0;
		left:0;
		z-index:-1;
	}

	.our-team .avatar img{
		width: 100%;
		height: auto;
		border-radius: 50%;
		transform: scale(1);
		transition: all 0.5s var(--curve);
	}

	.our-team:hover .avatar img{
		box-shadow: 0 0 0 14px #f7f5ec;
		transform: scale(0.9);

	}

	.our-team .team-content{

		margin-bottom: 30px;

	}

	.our-team .title{
		font-size: 22px;
		font-weight: 700;
		color: #4e5052;
		letter-spacing: 1px;
		margin-bottom: 5px;
	}

	.our-team .post{
		display: block;
		font-size: 15px;
		color: #4e5052;

	}

	.our-team .social{
		width: 100%;
		padding: 0;
		margin: 0;
		background: #1785eb;
		position: absolute;
		bottom: -100px;
		left: 0;
		transition: all 0.5s var(--curve);
	}

	.our-team:hover .social{
		bottom: 0;
	}

	.our-team .social li{
		display: inline-block;

	}

	.our-team .social li a{
		text-decoration: none;
		display:block;
		padding: 10px;
		font-size: 17px;
		color: #fff;
		transition: all 0.5s var(--curve);
	
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

	img {
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
