// List of NFL team logo URLs. Add more as needed.
export const NFL_TEAM_LOGOS: Record<string, string> = {
  BAL: 'https://static.www.nfl.com/image/private/f_auto/league/ucsdijmddsqcj1i9tddd',
  ARI: 'https://static.www.nfl.com/image/private/f_auto/league/u9fltoslqdsyao8cpm0k',
  ATL: 'https://static.www.nfl.com/image/private/f_auto/league/d8m7hzpsbrl6pnqht8op',
  BUF: 'https://static.www.nfl.com/image/private/f_auto/league/giphcy6ie9mxbnldntsf',
  CAR: 'https://static.www.nfl.com/image/private/f_auto/league/ervfzgrqdpnc7lh5gqwq',
  CHI: 'https://static.www.nfl.com/image/private/f_auto/league/ijrplti0kmzsyoaikhv1',
  CIN: 'https://static.www.nfl.com/image/private/f_auto/league/okxpteoliyayufypqalq',
  CLE: 'https://static.www.nfl.com/image/upload/f_auto/league/bedyixmmjhszfcx5wv2l',
  DAL: 'https://static.www.nfl.com/image/private/f_auto/league/ieid8hoygzdlmzo0tnf6',
  DEN: 'https://static.www.nfl.com/image/private/f_auto/league/t0p7m5cjdjy18rnzzqbx', 
  DET: 'https://static.www.nfl.com/image/private/f_auto/league/ocvxwnapdvwevupe4tpr',
  GB: 'https://static.www.nfl.com/image/private/f_auto/league/gppfvr7n8gljgjaqux2x',
  HOU: 'https://static.www.nfl.com/image/upload/f_auto/league/u6camnphqvjc6mku6u3c',
  IND: 'https://static.www.nfl.com/image/private/f_auto/league/ketwqeuschqzjsllbid5',
  JAX: 'https://static.www.nfl.com/image/private/f_auto/league/qycbib6ivrm9dqaexryk',
  KC: 'https://static.www.nfl.com/image/private/f_auto/league/ujshjqvmnxce8m4obmvs',
  LV: 'https://static.www.nfl.com/image/private/f_auto/league/gzcojbzcyjgubgyb6xf2',
  LAR: 'https://static.www.nfl.com/image/private/f_auto/league/ayvwcmluj2ohkdlbiegi',
  MIA: 'https://static.www.nfl.com/image/private/f_auto/league/lits6p8ycthy9to70bnt',
  MIN: 'https://static.www.nfl.com/image/private/f_auto/league/teguylrnqqmfcwxvcmmz',
  NE: 'https://static.www.nfl.com/image/private/f_auto/league/moyfxx3dq5pio4aiftnc',
  NO: 'https://static.www.nfl.com/image/private/f_auto/league/grhjkahghjkk17v43hdx',
  NYG: 'https://static.www.nfl.com/image/private/f_auto/league/t6mhdmgizi6qhndh8b9p',
  NYJ: 'https://static.www.nfl.com/image/upload/f_auto/league/vdqo4iiufmdrimkaxslj',
  PHI: 'https://static.www.nfl.com/image/private/f_auto/league/puhrqgj71gobgdkdo6uq',
  PIT: 'https://static.www.nfl.com/image/private/f_auto/league/xujg9t3t4u5nmjgr54wx',
  SD: 'https://static.www.nfl.com/image/private/f_auto/league/dhfidtn8jrumakbogeu4',
  SEA: 'https://static.www.nfl.com/image/private/f_auto/league/gcytzwpjdzbpwnwxincg',
  SF: 'https://static.www.nfl.com/image/private/f_auto/league/dxibuyxbk0b9ua5ih9hn',
  TB: 'https://static.www.nfl.com/image/private/f_auto/league/v8uqiualryypwqgvwcih',
  TEN: 'https://static.www.nfl.com/image/private/f_auto/league/pln44vuzugjgipyidsre',
  WAS: 'https://static.www.nfl.com/image/private/f_auto/league/xymxwrxtyj9fhaemhdyd',
};

// NFL logo fallback
export const NFL_LOGO = 'https://static.www.nfl.com/image/upload/v1554321393/league/nvfr7ogywskqrfaiu38m.svg';

export const nflContent = {
  title: "NFL Player Search",
  line1: "This is a search function for NFL players using the SportsData.io API. Enter your API key to fetch player data and view details.",
  line2: "The player list supports pagination and search by name. Click on a player to see more details in a dialog, including their team, college, position, experience, and height.",
  line3: "Team logos are displayed where available, with a fallback NFL logo for teams without a specific logo.",
  line4: "This uses an external API, pulling data and images in real time, so results may vary based on API response and availability."
};
