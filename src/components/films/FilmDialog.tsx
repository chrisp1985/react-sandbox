import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box
} from '@mui/material';

export const FilmDialog = ({ selectedFilm, setSelected }: { selectedFilm: any; setSelected: any }) => {
  return (
          <Dialog open={!!selectedFilm} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedFilm?.title}</DialogTitle>
        <DialogContent>
          {selectedFilm?.image && (
            <Box component="img" src={selectedFilm.image} alt={selectedFilm.title} sx={{ width: '100%', borderRadius: 1, mb: 2 }} />
          )}
          <DialogContentText>{selectedFilm?.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>Close</Button>
        </DialogActions>
      </Dialog>
  )};