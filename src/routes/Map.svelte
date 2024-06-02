<script>
  import { onMount } from 'svelte';

  export let data;
  let map;

  onMount(() => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';
      link.onload = () => loadMap();

      document.head.appendChild(link);

      return () => {
          map.remove();
          link.parentNode.removeChild(link);
      };
  });

  async function loadMap() {
      await import('leaflet');
      map = L.map('map').setView([-33.45694, -70.64827], 12);
      L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
          attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
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
</script>

<div id="map" class="h-[410px] w-full"></div>