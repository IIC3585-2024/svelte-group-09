// src/routes/api/getOpenAiDescription.js

import { getOpenAiDescription } from '$lib/openai';

export async function POST({ request }) {
  console.log('Handling POST request to /api/getOpenAiDescription');
  const { activity } = await request.json();
  const description = await getOpenAiDescription(activity);

  return new Response(JSON.stringify({ description }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
