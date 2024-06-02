<script>
  export let data;
</script>

<div class="ml-4 mt-4">
  <h1 class="text-xl font-semibold mb-4">Actividades Disponibles</h1>
  {#if data && data.results}
    <div class="flex flex-col gap-4 overflow-y-auto h-[350px]">
      {#each data.results as activity}
        <div class="border border-gray-400 shadow p-2 h-24">
          <div class="flex flex-col text-pink-400">
            <p class="uppercase font-semibold">{activity.title}</p>
            <p>Santiago de Chile</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>