<!-- src/routes/+page.svelte -->
<script>
	import Activities from './Activities.svelte';
	import Map from './Map.svelte';
	import Auth from './Auth.svelte';
	export let data;
  </script>
  
  <svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
  </svelte:head>
  
  <section>
	<div 
	  class="pl-10 pt-8 h-64 mt-4 bg-cover bg-[url('https://i.pinimg.com/originals/b7/70/4f/b7704f15d9d9c7d9ed3b2f828f7f10a3.jpg')]">
	  <p class='text-pink-400 w-16 h-8 p-1 bg-white text-center'>Chile</p>
	  <p class='text-white font-bold text-7xl mt-3 font-serif'>Santiago de Chile</p>
	</div>
  
	<section class="flex">
	  <div class="w-1/3">
		<Activities {data} />
	  </div>
	  <div class="w-2/3 p-5">
		<Map {data} />
	  </div>
	</section>
  
	<section>
	  <Auth />
	</section>
  </section>

  