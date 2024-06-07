<script>
  import { onMount } from 'svelte';
  import FaHeart from 'svelte-icons/fa/FaHeart.svelte';
  import FaRegHeart from 'svelte-icons/fa/FaRegHeart.svelte';
  import { goto } from '$app/navigation';

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

  function openActivityDetails(activity) {
    goto(`/activity/${activity.id}`);
  }
</script>

<div class="ml-4 mt-4">
  <h1 class="text-xl font-semibold mb-4">Actividades Disponibles</h1>
  {#if data && data.results}
    <div class="flex flex-col gap-4 overflow-y-auto h-[350px]">
      {#each data.results as activity}
        <div class="flex border border-gray-400 shadow p-2 h-24 cursor-pointer" on:click={() => openActivityDetails(activity)}>
          <div class="flex flex-col text-pink-400 w-4/5">
            <p class="uppercase font-semibold">{activity.title}</p>
            <p>Santiago de Chile</p>
          </div>
          <div class="w-1/5 self-center" on:click|stopPropagation={() => toggleFavorite(activity)}>
            {#if favorites.includes(activity.id)}
              <div class="text-red-500 w-6 h-6 mx-auto cursor-pointer">
                <FaHeart />
              </div>
            {:else}
              <div class="text-red-500 w-6 h-6 mx-auto cursor-pointer">
                <FaRegHeart />
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
