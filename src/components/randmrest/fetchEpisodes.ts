import axios from "axios";

export const fetchEpisodes = async () => {
  let episodes = [];
  let nextUrl = "https://rickandmortyapi.com/api/episode/";
  while (nextUrl) {
    const res = await axios.get(nextUrl);
    episodes = episodes.concat(res.data.results);
    nextUrl = res.data.info.next;
  }
  return episodes;
};
