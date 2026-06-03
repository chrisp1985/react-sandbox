import { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { type Episode } from './Episode';

interface Character {
  id: number;
  name: string;
}

const charId = (url: string) => parseInt(url.split('/').pop()!);

const SEASON_COLORS = ['#42a5f5', '#66bb6a', '#ef5350', '#ab47bc', '#ff7043', '#26c6da', '#ffa726'];

export const CharacterEpisodeMatrix = ({ episodes }: { episodes: Episode[] }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const countMap: Record<number, number> = {};
    episodes.forEach((ep) => {
      ep.characters.forEach((url) => {
        const id = charId(url);
        countMap[id] = (countMap[id] ?? 0) + 1;
      });
    });

    const topIds = Object.entries(countMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([id]) => parseInt(id));

    fetch(`https://rickandmortyapi.com/api/character/${topIds.join(',')}`)
      .then((r) => r.json())
      .then((data: Character | Character[]) => {
        const all = Array.isArray(data) ? data : [data];
        const seen = new Set<string>();
        setCharacters(
          all.map((c) => {
            if (seen.has(c.name)) return { ...c, name: `${c.name} (Alt.)` };
            seen.add(c.name);
            return c;
          })
        );
      });
  }, [episodes]);

  if (!characters.length) return null;

  const seasonMap: Record<string, Episode[]> = {};
  episodes.forEach((ep) => {
    const s = ep.episode.slice(1, 3);
    (seasonMap[s] ??= []).push(ep);
  });
  const seasons = Object.entries(seasonMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, eps], idx) => ({
      label: `S${parseInt(key)}`,
      episodes: eps,
      color: SEASON_COLORS[idx % SEASON_COLORS.length],
    }));

  const charEpisodeIds = (char: Character) =>
    new Set(
      episodes.flatMap((ep) =>
        ep.characters.filter((url) => charId(url) === char.id).map(() => ep.id)
      )
    );

  const charAppearsInSeason = (char: Character, seasonEps: Episode[]) =>
    seasonEps.some((ep) =>
      ep.characters.some((url) => charId(url) === char.id)
    );

  const episodeCountInSeason = (char: Character, seasonEps: Episode[]) =>
    seasonEps.filter((ep) => ep.characters.some((url) => charId(url) === char.id)).length;

  if (isMobile) {
    return (
      <>
        <h3>Main Character Episode Appearances</h3>
        <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: 110, minWidth: 110, textAlign: 'left', fontSize: 11, paddingBottom: 4 }} />
              {seasons.map(({ label, color }) => (
                <th
                  key={label}
                  style={{
                    textAlign: 'center',
                    padding: '4px 2px',
                    background: color,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 10,
                    borderLeft: '2px solid #fff',
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {characters.map((char) => (
              <tr key={char.id}>
                <td style={{ fontSize: 11, fontWeight: 500, paddingRight: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {char.name}
                </td>
                {seasons.map(({ label, color, episodes: eps }) => {
                  const appears = charAppearsInSeason(char, eps);
                  const count = episodeCountInSeason(char, eps);
                  return (
                    <td
                      key={label}
                      title={appears ? `${count} episode${count !== 1 ? 's' : ''}` : 'Not in this season'}
                      style={{ padding: 3, borderLeft: '2px solid #fff', textAlign: 'center' }}
                    >
                      <div
                        style={{
                          width: '100%',
                          aspectRatio: '1',
                          borderRadius: 3,
                          backgroundColor: appears ? color : '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 9,
                          fontWeight: 700,
                          color: appears ? '#fff' : 'transparent',
                        }}
                      >
                        {count}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 11, color: '#888', marginTop: 8 }}>
          Each cell shows how many episodes a character appeared in that season. Tap a cell for details.
        </p>
      </>
    );
  }

  return (
    <>
      <h3>Main Character Episode Appearances</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: 130, minWidth: 130 }} />
              {seasons.map(({ label, episodes: eps, color }) => (
                <th
                  key={label}
                  colSpan={eps.length}
                  style={{
                    textAlign: 'center',
                    padding: '2px 4px',
                    borderLeft: '3px solid #fff',
                    background: color,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {characters.map((char) => {
              const appearsIn = charEpisodeIds(char);
              return (
                <tr key={char.id}>
                  <td style={{ paddingRight: 10, whiteSpace: 'nowrap', fontWeight: 500, fontSize: 12 }}>
                    {char.name}
                  </td>
                  {seasons.flatMap(({ episodes: eps, color }) =>
                    eps.map((ep, ei) => (
                      <td
                        key={ep.id}
                        title={`${ep.episode}: ${ep.name}`}
                        style={{ padding: 2, borderLeft: ei === 0 ? '3px solid #fff' : undefined }}
                      >
                        <div
                          style={{
                            width: '100%',
                            aspectRatio: '1',
                            borderRadius: 2,
                            backgroundColor: appearsIn.has(ep.id) ? color : '#e0e0e0',
                          }}
                        />
                      </td>
                    ))
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: '#888', marginTop: 8 }}>
        Hover a cell to see the episode name. Columns are individual episodes; rows are the 10 most frequent characters.
      </p>
    </>
  );
};
