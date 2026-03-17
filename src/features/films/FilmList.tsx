import { useMemo, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, TextField, InputAdornment, Pagination, Stack, Paper, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { films } from './FilmList.ts';
import { FilmDialog } from './FilmDialog.tsx';
import { Title } from '../../components/ui/Title.tsx';
import { Panel } from '../../components/ui/Panel.tsx';
import { CustomCard } from '../../components/ui/CustomCard.tsx';

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
    <>
    <Title text="Film List" />
    <Panel colour = "primary">
      <CustomCard>
          <p style={{ textAlign: 'left' }}>This is a film list page using Material UI components. It displays a collection of films with their titles, descriptions, and images.</p>
          <p style={{ textAlign: 'left' }}>The list supports pagination and search by title. Click on a film to see more details in a dialog.</p>
          <p style={{ textAlign: 'left' }}>Data is static, but images are loaded in real time, so results may vary based on image availability.</p>
        </CustomCard>
      </Panel>
      <Panel colour = "secondary">
        <CustomCard>
          <Paper sx={{ p: 2, mb: 3, maxWidth: '100%', mx: 'auto', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField value={q} onChange={(e) => {
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
          <Grid container spacing={3} alignItems="stretch">
            {pageItems.map((film) => (
              <Grid key={film.title}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  
                  <CardMedia component="img" image={film.image} alt={film.title} sx={{ height: 180, objectFit: "cover" }} />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {film.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
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
        <Pagination count={pageCount} page={page} onChange={(_, p) => setPage(p)} color="primary" />
      </Stack>

      <FilmDialog selectedFilm={selectedFilm} setSelected={setSelected} />
      </CustomCard>
      </Panel>
    </>
  );
};