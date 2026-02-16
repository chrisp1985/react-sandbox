import { useMemo, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Pagination,
  Stack,
  Paper,
  Avatar,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NFLDialog } from './NFLDialog.tsx';
import { NFL_TEAM_LOGOS, NFL_LOGO } from './teamLogos';

export const NFLList = ({ players }: { players: any[] }) => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const perPage = 6;

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? players.filter((p) => p.Name.toLowerCase().includes(t)) : players;
  }, [q]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const selectedPlayer = selected ? players.find((p) => p.Name === selected) ?? null : null;

  return (
    <Container maxWidth={false} sx={{ py: 4, width: '100%', maxWidth: '1900px' }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search players"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            aria-label="Search players"
          />
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {pageItems.map((player) => {
          // Try to get logo for player's team
          const teamLogo = player.Team && NFL_TEAM_LOGOS[player.Team] ? NFL_TEAM_LOGOS[player.Team] : NFL_LOGO;
          return (
            <Grid key={player.PlayerID}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundImage: `url(${teamLogo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Overlay for opacity */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.7)', // adjust opacity as needed
                    zIndex: 1,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, position: 'relative', zIndex: 2 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontFamily: 'Roboto Slab, serif',
                      fontWeight: 700,
                      color: '#222',
                      fontSize: '1.6rem',
                      letterSpacing: 0.5,
                    }}
                  >
                    {player.Name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: 'Roboto, Arial, sans-serif',
                      fontWeight: 500,
                      color: '#444',
                      fontSize: '1rem',
                      mb: 0.5,
                    }}
                  >
                    {player.Team}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Roboto, Arial, sans-serif',
                      color: '#555',
                      fontSize: '0.95rem',
                      mt: 1,
                    }}
                  >
                    <strong>College:</strong> {player.College || 'N/A'}
                  </Typography>
                </CardContent>
                <CardActions sx={{ flexGrow: 1, position: 'relative', zIndex: 2 }}>
                  <Button size="small" onClick={() => setSelected(player.Name)}>
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Stack alignItems="center" sx={{ mt: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, p) => setPage(p)}
          color="primary"
        />
      </Stack>

      <NFLDialog selectedPlayer={selectedPlayer} setSelected={setSelected} />

    </Container>
  );
};