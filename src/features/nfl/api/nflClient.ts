const BASE_URL = '/nfl-api';

export async function getPlayersByAvailable(apiKey: string) {
  const url = `${BASE_URL}/PlayersByAvailable`;
  const response = await fetch(url, {
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}
