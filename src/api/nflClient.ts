import axios from 'axios';

const BASE_URL = '/nfl-api';

export async function getPlayersByAvailable(apiKey: string) {
  const url = `${BASE_URL}/PlayersByAvailable`;
  const response = await axios.get(url, {
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
    },
  });
  return response.data;
}
