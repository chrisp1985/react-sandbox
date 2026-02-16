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
import { films } from './FilmList.ts';
import { FilmDialog } from './FilmDialog.tsx';

export const FilmList = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const perPage = 4;

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? films.filter((f) => f.title.toLowerCase().includes(t)) : films;
  }, [q]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const selectedFilm = selected ? films.find((f) => f.title === selected) ?? null : null;

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search films"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            aria-label="Search films"
          />
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {pageItems.map((film) => (
          <Grid key={film.title} >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {film.image ? (
                <CardMedia component="img" height="160" image={film.image} alt={film.title} />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 160, bgcolor: 'grey.200' }}>
                  <Avatar sx={{ width: 80, height: 80 }}>{film.title[0]}</Avatar>
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {film.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {film.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => setSelected(film.title)}>
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack alignItems="center" sx={{ mt: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, p) => setPage(p)}
          color="primary"
        />
      </Stack>

      <FilmDialog selectedFilm={selectedFilm} setSelected={setSelected} />

    </Container>
  );
};