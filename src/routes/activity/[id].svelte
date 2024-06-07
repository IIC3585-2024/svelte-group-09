<script context="module">
  import { getOpenAiDescription } from '$lib/openai';

  export async function load({ params, fetch }) {
    const res = await fetch(`https://api.predicthq.com/v1/events/${params.id}`, {
      headers: {
        Authorization: `Bearer ${EVENT_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      return {
        status: res.status,
        error: new Error(`Could not fetch activity with id ${params.id}`)
      };
    }

    const activity = await res.json();

    // Obtener la descripción de OpenAI
    const openAiDescription = await getOpenAiDescription(activity);

    return { props: { activity, openAiDescription } };
  }
</script>

<script>
  export let activity;
  export let openAiDescription;
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">{activity.title}</h1>
  <p>{activity.description}</p>

  <div class="mt-4 p-4 border rounded shadow-lg">
    <h2 class="text-xl font-semibold mb-2">Descripción Detallada</h2>
    <p>{openAiDescription}</p>
  </div>
</div>
