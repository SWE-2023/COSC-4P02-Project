<script>
	export let title;
	export let media;
	export let image_credit;
	export let start_date;
	let placeholder =
		"https://joadre.com/wp-content/uploads/2019/02/no-image.jpg";
</script>

<section class="item-components">
	<div class="media-component">
		<div class="image-cont">
			{#if media}
				{#if media.includes("youtube.com")}
					<iframe
						class="video"
						title="youtube video"
						src={media.replace("watch?v=", "embed/")}
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen />
				{:else}
					<img class="image" src={media} alt={title} />
				{/if}
			{:else}
				<img class="image" src={placeholder} alt={title} />
			{/if}
		</div>
		{#if image_credit != "null"}
			<div class="image_cred">
				<a href={image_credit}  target="_blank" rel="noreferrer"
					>Source</a>
			</div>
		{/if}
	</div>
	<div class="text-component">
		<h1 class="title">{title}</h1>
		<p class="date"><i>{start_date}</i></p>
		<p class="desc">
			<slot>No Content Provided</slot>
		</p>
	</div>
</section>

<style>
	:root {
		--vid-ratio: 0.5625;
	}
	h1 {
		font-family: var(--font-serif);
		font-size: var(--font-size-xxlarge);
		font-weight: 700;
		margin: 0;
	}

	p {
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		padding: 1em 0 1em 0;
		margin: 0.5rem;
	}

	.item-components {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		transition: all 0.2s ease-in-out;
		margin-bottom: 3rem;
	}

	.item-components > div {
		margin: 0 1rem;
	}

	.text-component {
		flex: 1 1 33%;
		padding: 2rem 2rem;
		border-radius: 2rem;
		background: #3f0f000f;
		text-align: justify;
	}

	.title {
		padding-top: 1rem;
		text-align: center;
	}

	.date {
		text-align: center;
		padding: 0;
		font-size:var(--font-size-base);
		font-weight: 400;
	}

	.desc {
		text-align: justify;
		padding-top: 1rem;
	}

	.image-cont {
		display: flex;
		padding-top: 1.7rem;
		flex-direction: column;
		align-items: center;
		max-width:100%;
	}
	
	.image {
		z-index: 1;
		cursor: pointer;
		min-height:60vh;
		max-height: 50vh;
		max-width:100%;
		
		object-position: center center;
		object-fit: cover;
		border-radius: 1.5vw;
		box-shadow: 1rem 0rem 28px 0 #00000030;
		transition: all 0.3s ease-in-out;
	}

	@media (max-width: 1000px) {
		.item-components {
			margin: 0 -1rem 0 -1rem;
		}
		.text-component {
			padding: 2rem 1rem;
			background: #3f0f000f;
			text-align: justify;
		}
		.title {
			font-size: var(--font-size-large);
		}
		.date {
			font-size: var(--font-size-small);
		}
		.desc {
			font-size: var(--font-size-base);
		}
		.image {
			min-height:0vh;
			max-height: 40vh;
		}
	}

	.video {
		z-index: 1;
		max-width: 50vw;
		width: 60vw;
		height: calc(60vw * var(--vid-ratio));
		object-position: center center;
		object-fit: cover;
		border-radius: 1.5vw;
		box-shadow: 1rem 0rem 28px 0 #00000030;
	}

	img:hover {
		transform: scale(1.01);
		box-shadow: 0.5rem 0rem 32px 0 #00000030;
	}

	.image_cred {
		font-size: var(--font-size-xsmall);
		display: flex;
		justify-content: center;
	}

	.image_cred a {
		color: var(--color-text);
		padding: 0.5rem 4rem;
		opacity: 0.5;
		font-weight: 400;
		transition: all 0.15s ease-in-out;
	}

	.image_cred a:hover {
		opacity: 1;
		color: var(--color-theme-2);
		text-decoration: none;
	}

	
</style>
