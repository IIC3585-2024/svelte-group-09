<script>
  import { onMount } from 'svelte';
  import FaHeart from 'svelte-icons/fa/FaHeart.svelte';
  import FaRegHeart from 'svelte-icons/fa/FaRegHeart.svelte';
  import { fly } from 'svelte/transition';
  import {getOpenAiDescription} from './api/getOpenAiDescription';

  export let data;
  let map;
  let favorites = [];
  let selectedActivity = null;
  let openAiDescription = '';

  onMount(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';
    link.onload = () => loadMap();

    document.head.appendChild(link);

    return () => {
      if (map) map.remove();
      link.parentNode.removeChild(link);
    };
  });

  async function loadMap() {
    const L = await import('leaflet');
    map = L.map('map').setView([-33.45694, -70.64827], 12);
    L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18,
    }).addTo(map);

    if (data && data.results) {
      data.results.forEach((activity) => {
        L.marker([activity.location[1], activity.location[0]])
          .addTo(map)
          .bindPopup(activity.title);
      });
    }
  }

  function toggleFavorite(activity) {
    const index = favorites.indexOf(activity.id);
    if (index === -1) {
      favorites = [...favorites, activity.id];
    } else {
      favorites = favorites.filter(fav => fav !== activity.id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  async function handleActivityClick(activity) {
    selectedActivity = activity;
    openAiDescription = '';  // Clear previous description
    const response = await fetch('./api/getOpenAiDescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ activity })
    });

    if (response.ok) {
      const data = await response.json();
      openAiDescription = data.description.trim();  // Ensure description is trimmed of whitespace
    } else {
      openAiDescription = 'Failed to fetch description from OpenAI.';
    }
  }

  function closeModal() {
    selectedActivity = null;
    openAiDescription = '';
  }
</script>

<style>
  .map-container {
    position: relative;
    z-index: 1;
  }

  .modal {
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5); /* Ensures the background is darkened */
  }
</style>

<div class="ml-4 mt-4">
  <h1 class="text-xl font-semibold mb-4">Actividades Disponibles</h1>
  {#if data && data.results}
    <div class="flex flex-col gap-4 overflow-y-auto h-[350px]">
      {#each data.results as activity}
        <div class="flex border border-gray-400 shadow p-2 h-24">
          <div class="flex flex-col text-pink-400 w-4/5 cursor-pointer" on:click={() => handleActivityClick(activity)} role="button" tabindex="0" on:keypress={() => handleActivityClick(activity)}>
            <p class="uppercase font-semibold">{activity.title}</p>
            <p>Santiago de Chile</p>
          </div>
          <div class="w-1/5 self-center">
            {#if favorites.includes(activity.id)}
              <button class="text-red-500 w-6 h-6 mx-auto" on:click={() => toggleFavorite(activity)}>
                <FaHeart />
              </button>
            {:else}
              <button class="text-red-500 w-6 h-6 mx-auto" on:click={() => toggleFavorite(activity)}>
                <FaRegHeart />
              </button>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<div id="map" class="h-[410px] w-full map-container"></div>

{#if selectedActivity}
  <div class="fixed inset-0 flex items-center justify-center modal">
    <div class="bg-white p-4 rounded shadow-lg w-1/2 relative" transition:fly={{ y: 200, duration: 300 }}>
      <button class="absolute top-0 right-0 m-4" on:click={closeModal}>✖</button>
      <h1 class="text-2xl font-bold mb-4">{selectedActivity.title}</h1>
      <p>{selectedActivity.description}</p>
      <div class="mt-4">
        <h2 class="text-xl font-semibold mb-2">Descripción Detallada</h2>
        <p>{openAiDescription}</p>
      </div>
    </div>
  </div>
{/if}
