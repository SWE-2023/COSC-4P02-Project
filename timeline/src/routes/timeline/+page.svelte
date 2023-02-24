<script>
  import { scale } from "svelte/transition";
  import PageTransition from "../../components/PageTransition.svelte";
  import TimeLineItem from "../../components/TimeLineItem.svelte";
  import Arrow from '../../components/Arrow.svelte'
  
  let timeData = [
	{
      id: "1720",
      creation_date:"",
      title: "War of 1720",
      image: "War of 1720 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1720",
      start_date: "random date in the year 1720",
      end_date: "random end date in the year 1720"
    },
    {
      id: "1850",
      creation_date:"",
      title: "War of 1850",
      image: "War of 1850 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1850",
	    start_date: "random date in the year 1850",
      end_date: "random end date in the year 1850"
    },
    {
      id: "1854",
      creation_date:"",
      title: "War of 1854",
      image: "War of 1854 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1854",
	    start_date: "random date in the year 1854",
      end_date: "random end date in the year 1854"
    },
    {
      id: "1855",
      creation_date:"",
      title: "War of 1855",
      image: "War of 1855 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1855",
	    start_date: "random date in the year 1855",
      end_date: "random end date in the year 1855"
    },
    {
      id: "1860",
      creation_date:"",
      title: "War of 1860",
      image: "War of 1860 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1860",
	    start_date: "random date in the year 1860",
      end_date: "random end date in the year 1860"
    },
    {
      id: "1870",
      creation_date:"",
      title: "War of 1870",
      image: "War of 1870 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1870",
	    start_date: "random date in the year 1870",
      end_date: "random end date in the year 1870"
    },
    {
      id: "1872",
      creation_date:"",
      title: "War of 1872",
      image: "War of 1872 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1872",
	    start_date: "random date in the year 1872",
      end_date: "random end date in the year 1872"

    },
    {
      id: "1874",
      creation_date:"",
      title: "War of 1874",
      image: "War of 1874 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1874",
	    start_date: "random date in the year 1874",
      end_date: "random end date in the year 1874"
    },
    {
      id: "1882",
      creation_date:"",
      title: "War of 1882",
      image: "War of 1882 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1882",
	    start_date: "random date in the year 1882",
      end_date: "random end date in the year 1882"
    },
    {
      id: "1940",
      creation_date:"",
      title: "War of 1940",
      image: "War of 1940 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1940",
	    start_date: "random date in the year 1940",
      end_date: "random end date in the year 1940"
    },
    {
      id: "1946",
      creation_date:"",
      title: "War of 1946",
      image: "War of 1946 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1946",
	    start_date: "random date in the year 1946",
      end_date: "random end date in the year 1946"
    },
    {
      id: "1990",
      creation_date:"",
      title: "War of 1990",
      image: "War of 1990 picture",
      image_credit: "afafafafa",
      body: "Description about war of 1990",
	    start_date: "random date in the year 1990",
      end_date: "random end date in the year 1990"
    },
	{
      id: "2020",
      creation_date:"",
      title: "War of 2020",
      image: "War of 2020 picture",
      image_credit: "afafafafa",
      body: "Description about war of 2020",
      start_date: "random date in the year 2020",
      end_date: "random end date in the year 2020"
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
  
  let selectedItem = timeData[0];
  let title = timeData[0].title;
  let image = "assets/placeholder.jpg"; //placeholder
  let image_credit = timeData[0].image_credit;
  let body = timeData[0].body;
  let start_date = timeData[0].start_date;

  function setComponenets(){
    title = selectedItem.title;
    image = "assets/placeholder.jpg"; //placeholder
    image_credit = selectedItem.image_credit;
    body = selectedItem.body;
    start_date = selectedItem.start_date;
  }

  let atFirst = false;
  let atLast = false;
  let currentIndex = 0;

  function updateIndex(){
    for(let i=0; i<timeData.length; i++){
      if(selectedItem == timeData[i]){
        currentIndex = i;
        console.log("returned" + i)
      }
    }
  }

  function pageUp(){
    if(!atFirst){
      selectedItem = timeData[currentIndex- 1];
      console.log(currentIndex);
    }
  }

  function pageDown(){
    if(!atLast){
      selectedItem = timeData[currentIndex + 1];
      console.log(currentIndex);
    }
  }

  function updateAtFirst(){
    if(selectedItem == timeData[0]){
      atFirst = true;
    }else{
      atFirst = false;
    }
  }

  function updateAtLast(){
    if(selectedItem == timeData[timeData.length-1]){
      atLast = true;
    }else{
      atLast = false;
    }
  }

</script>

<svelte:head>
  <title>Timeline | Niagara-on-the-Lake Timeline</title>
  <meta name="description" content="Timeline page" />
</svelte:head>

<PageTransition>
  <Arrow on:moveUp={updateAtFirst} on:moveUp={setComponenets} on:moveUp={updateIndex} alt={false} upFunction={pageUp} downFunction={pageDown}></Arrow>
  <section class="layout">
    <section class="line-components">
      <div class="timeElements">
        <span style="height:{timelineHeight}px" class="line"/>
	
        {#each timeData as td (td.id)}
          <TimeLineItem
            item={td}
            spacing={getSpacing(td.id)}
            bind:currentItem={selectedItem}
            on:change={setComponenets}
            on:change={updateAtFirst} 
            on:change={updateAtLast}
            on:change={updateIndex}/>
        {/each}
      </div>
    </section>
    <section class="item-components">
      <div class="image">
        <img alt="" src={image}/>
      </div>
      <div class="text">
        <h1>{title}</h1>
        <p>{start_date}</p>
        <p>{body}</p> 
        <p>{image_credit}</p>
      </div>
    </section>
  </section>
  <Arrow on:moveDown={updateAtLast} on:moveDown={setComponenets} on:moveDown={updateIndex} alt={true} upFunction={pageUp} downFunction={pageDown}></Arrow>
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

  .image,.text {
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
