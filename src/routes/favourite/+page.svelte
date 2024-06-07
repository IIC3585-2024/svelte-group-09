<script>
  import { onMount } from 'svelte';
  import FaHeart from 'svelte-icons/fa/FaHeart.svelte';
  import FaRegHeart from 'svelte-icons/fa/FaRegHeart.svelte';
  export let data;

  let favorites = [];

  onMount(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }
  });

  function toggleFavorite(activity) {
    const index = favorites.indexOf(activity.id);
    if (index === -1) {
      favorites = [...favorites, activity.id];
    } else {
      favorites = favorites.filter(fav => fav !== activity.id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  $: favoriteActivities = data && data.results ? data.results.filter(activity => favorites.includes(activity.id)) : [];
</script>

<svelte:head>
  <title>Favoritos</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <div>
    {#if favoriteActivities && favoriteActivities.length > 0}
      <div class="flex flex-col gap-4 overflow-y-auto h-[350px]">
        {#each favoriteActivities as activity}
          <div class="flex border border-gray-400 shadow p-2 h-24">
            <div class="flex flex-col text-pink-400 w-4/5">
              <p class="uppercase font-semibold">{activity.title}</p>
              <p>Santiago de Chile</p>
            </div>
            <div class="w-1/5 self-center">
              <div class="text-red-500 w-6 h-6 mx-auto cursor-pointer" on:click={() => toggleFavorite(activity)}>
                <FaHeart />
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="mx-auto mt-24 block w-80 text-center">No hay actividades favoritas</p>
    {/if}
  </div>
</section>