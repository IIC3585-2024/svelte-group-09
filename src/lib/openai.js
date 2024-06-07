import { OPENAI_API_KEY } from '$env/static/private';

export async function getOpenAiDescription(activity) {
  const prompt = `Proporciona una descripción detallada de la actividad "${activity.title}". Incluye información sobre seguridad y equipamiento necesario.`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}
