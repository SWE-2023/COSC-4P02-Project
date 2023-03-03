<script>
	export let title;
	export let media;
	export let image_credit;
	export let start_date;
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
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0;
	}

	p {
		font-family: var(--font-sans);
		padding: 1em 0 1em 0;
		font-size: 1.2rem;
		margin: 0.5rem;
	}

	.title {
		text-align: center;
	}

	.date {
		text-align: center;
		padding: 0;
		font-size: 1.2rem;
		font-weight: 400;
	}

	.desc {
		text-align: justify;
		padding: 1rem 3rem;
	}

	.image {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
		transition:all 0.3s ease-in-out;
	}

	img:hover {
		transform:scale(1.01);
		box-shadow: 0.5rem 0rem 32px 0 #00000030;

	}
	.image_cred {
		color: var(--color-text);
		text-align: center;
		font-size: 0.8rem;
		position: relative;
		padding: 0.5rem;
		opacity: 0.5;
		font-weight: 400;
		transition: all 0.15s ease-in-out;
	}

	.image_cred:hover {
		opacity: 1;
		color: var(--color-theme-2);
		text-decoration: none;
	}

	.item-components {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		transition: all 0.2s ease-in-out;
	}

	.item-components > div{
		margin:0 4rem;
	}

	.image-component {
		flex: 1;
	}

	.text-component {
		flex: 2 1 50%;
		padding: 1rem 1rem;
		border-radius: 2rem;
		background: #3f0f000f;
		text-align: justify;
		position:relative;
	}

	@media (max-width: 1500px) {
		.image-component,
		.text-component {
			flex: 1;
			padding: 1rem 1rem;
		}
	}
</style>
