import { EVENT_API_TOKEN } from '$env/static/private';

export async function load() {
  const res = await fetch(`https://api.predicthq.com/v1/events?within=1km%40-33.45694%2C-70.64827`, {
    headers: {
      Authorization: `Bearer ${EVENT_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return data;
}