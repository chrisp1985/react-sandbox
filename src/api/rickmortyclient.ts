
export const fetchEpisodes = async () => {
  let episodes = []; 
  let nextUrl = "https://rickandmortyapi.com/api/episode/";
  while (nextUrl) {
    console.log('Fetching episodes from:', nextUrl);
    const res = await fetch(nextUrl);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    episodes = episodes.concat(data.results);
    nextUrl = data.info.next;
  }
  return episodes;
};
