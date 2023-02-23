<script>
  import { scale } from "svelte/transition";
  import PageTransition from "../../components/PageTransition.svelte";
  import TimeLineItem from "../../components/TimeLineItem.svelte";
  
  let timeData = [
    {
      id: "1850",
      title: "War of 1850",
      picture: "War of 1850 picture",
      text: "Description about war of 1850",
	  date: "random date in the year 1850"
    },
    {
      id: "1854",
      title: "War of 1854",
      picture: "War of 1854 picture",
      text: "Description about war of 1854",
	  date: "random date in the year 1855"
    },
    {
      id: "1855",
      title: "War of 1855",
      picture: "War of 1855 picture",
      text: "Description about war of 1855",
	  date: "random date in the year 1855"
    },
    {
      id: "1860",
      title: "War of 1860",
      picture: "War of 1860 picture",
      text: "Description about war of 1860",
	  date: "random date in the year 1860"
    },
    {
      id: "1870",
      title: "War of 1870",
      picture: "War of 1870 picture",
      text: "Description about war of 1870",
	  date: "random date in the year 1870"
    },
    {
      id: "1872",
      title: "War of 1872",
      picture: "War of 1872 picture",
      text: "Description about war of 1872",
	  date: "random date in the year 1872"
    },
    {
      id: "1874",
      title: "War of 1874",
      picture: "War of 1874 picture",
      text: "Description about war of 1874",
	  date: "random date in the year 1874"
    },
    {
      id: "1882",
      title: "War of 1882",
      picture: "War of 1882 picture",
      text: "Description about war of 1882",
	  date: "random date in the year 1882"
    },
    {
      id: "1940",
      title: "War of 1940",
      picture: "War of 1940 picture",
      text: "Description about war of 1940",
	  date: "random date in the year 1940"
    },
    {
      id: "1946",
      title: "War of 1946",
      picture: "War of 1946 picture",
      text: "Description about war of 1946",
	  date: "random date in the year 1946"
    },
    {
      id: "1990",
      title: "War of 1990",
      picture: "War of 1990 picture",
      text: "Description about war of 1990",
	  date: "random date in the year 1940"
    },
  ];

  let timelineHeight;
  if (typeof window !== "undefined") {
    timelineHeight = window.innerHeight * 0.8;
  }

  // reworked spacing function
  function getSpacing(key) {
    const top = parseInt(timeData[0].id);
    const bottom = parseInt(timeData[timeData.length - 1].id);
    const current = parseInt(key);

    const percentage = (current - top) / (bottom - top);
    const spacing = percentage * timelineHeight;

    return spacing;
  }

  let title = timeData[0].title;
//   let picture = timeData[0].picture;
  let picture = "assets/placeholder.jpg" //placeholder
  let text = timeData[0].text;

</script>

<svelte:head>
  <title>Timeline | Niagara-on-the-Lake Timeline</title>
  <meta name="description" content="Timeline page" />
</svelte:head>

<PageTransition>
  <section class="layout">
    <section class="line-components">
      <div class="timeElements">
        <span style="height:{timelineHeight}px" class="line"/>
	
        {#each timeData as td (td.id)}
          <TimeLineItem
            item={td}
            spacing={getSpacing(td.id)}
            currentTitle={title}
            currentPicture={picture}
            currentText={text}/>
        {/each}
      </div>
    </section>
    <section class="item-components">
      <div class="picture">
        <img alt="" src={picture}/>
      </div>
      <div class="text">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  </section>
</PageTransition>

<style>
  h1 {
    font-family: var(--font-serif);
    padding: 2em 0 0 0;
    font-size: 3.5rem;
    font-weight: 700;
    margin: 0;
  }

  img {
	width: 100%;
	object-fit: cover;
	margin: 1rem 0rem;
	border-radius: 1rem;
}

  p {
    padding: 1em 0 1em 0;
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  }

  .layout {
    display: flex;
    flex-direction: row;
  }

  .picture,
  .text {
    margin: 2rem;
  }

  .line {
    position: fixed;
    width: 4px;
    background-color: var(--color-theme-1);
    left: 40px;
	padding: 1rem 0;
  }

  .line-components {
    position: fixed;
    left: -9px;
  }

  .item-components {
    display: flex;
    flex-direction: row;
  }
</style>
