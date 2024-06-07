// src/routes/api/getOpenAiDescription.js

import { getOpenAiDescription as fetchOpenAiDescription} from '$lib/openai';

export async function getOpenAiDescription({ request }) {
  console.log('Handling POST request to /api/getOpenAiDescription');
  const { activity } = await request.json();
  const description = await fetchOpenAiDescription(activity);

  return new Response(JSON.stringify({ description }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
