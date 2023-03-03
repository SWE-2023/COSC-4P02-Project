<script>
	export let title;
	export let image;
	export let image_credit;
	export let start_date;
</script>

<section class="item-components">
	<div class="image-component">
		<div class="image">
			<img
				alt={image_credit}
				src={image
					? image
					: "https://joadre.com/wp-content/uploads/2019/02/no-image.jpg"} />
			<a href={image_credit} target="_blank" rel="noreferrer" class="image_cred"
				>Source</a>
		</div>
	</div>
	<div class="text-component">
		<h1 class="title">{title}</h1>
		<p class="date"><i>{start_date}</i></p>
		<p class="desc"><slot>No</slot></p>
	</div>
</section>

<style>
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
	
	img {
		z-index: 1;
		max-height: 70vh;
		max-width: 80vw;
		object-position: center center;
		object-fit: fill;
		border-radius: 1.5rem;
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
