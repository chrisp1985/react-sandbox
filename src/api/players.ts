import axios from 'axios';

export interface Player {
    playerNo: number;
    name: string;
    age: number;
    rating: number;
    position: string;
    club: string;
    nationality: string;
}

export interface PaginatedPlayers {
  data: Player[];
  total: number;
  page: number;
  limit: number;
}

export async function getPlayers(): Promise<PaginatedPlayers> {
  const response = await axios.get<PaginatedPlayers>(
    "http://localhost:8082/players"
  );

  return response.data;
}