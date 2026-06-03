import { useEffect, useState } from 'react';
import { type Episode } from './Episode';

interface Character {
  id: number;
  name: string;
}

const charId = (url: string) => parseInt(url.split('/').pop()!);

const SEASON_COLORS = ['#42a5f5', '#66bb6a', '#ef5350', '#ab47bc', '#ff7043', '#26c6da', '#ffa726'];

export const CharacterEpisodeMatrix = ({ episodes }: { episodes: Episode[] }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

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
    .map(([key, eps], idx) => ({ label: `S${parseInt(key)}`, episodes: eps, color: SEASON_COLORS[idx % SEASON_COLORS.length] }));

  const charIdSet = (char: Character) => new Set(
    episodes.flatMap((ep) =>
      ep.characters.filter((url) => charId(url) === char.id).map(() => ep.id)
    )
  );

  return (
    <>
      <h3>Main Character Episode Appearances</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', fontSize: 12, tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: 160, minWidth: 160 }} />
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
              const appearsIn = charIdSet(char);
              return (
                <tr key={char.id}>
                  <td
                    style={{
                      paddingRight: 10,
                      whiteSpace: 'nowrap',
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  >
                    {char.name}
                  </td>
                  {seasons.flatMap(({ episodes: eps, color }) =>
                    eps.map((ep, ei) => (
                      <td
                        key={ep.id}
                        title={`${ep.episode}: ${ep.name}`}
                        style={{
                          width: 14,
                          height: 14,
                          padding: 1,
                          borderLeft: ei === 0 ? '3px solid #fff' : undefined,
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 12,
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
