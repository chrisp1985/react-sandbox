import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Typography
} from '@mui/material';
import { NFL_TEAM_LOGOS, NFL_LOGO } from './nflContent';

export const NFLDialog = ({ selectedPlayer, setSelected }: { selectedPlayer: any; setSelected: any }) => {

    const teamLogo = selectedPlayer?.Team && NFL_TEAM_LOGOS[selectedPlayer.Team] ? NFL_TEAM_LOGOS[selectedPlayer.Team] : NFL_LOGO;

  return (
        <Dialog open={!!selectedPlayer} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>

          <Typography variant="h2" sx={{ fontWeight: 700, color: '#222', textAlign: 'center' }}>
          {selectedPlayer?.Name}
          </Typography>
        <DialogContent>
          {selectedPlayer?.UsaTodayHeadshotUrl ? (
            <Box component="img" src={teamLogo} alt={selectedPlayer.Name} sx={{ width: '60%', maxWidth: 180, display: 'block', mx: 'auto', borderRadius: 1, mb: 2, mt: 1 }} />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120, bgcolor: 'grey.200', mb: 2, mt: 1 }}>
              <Box sx={{ fontSize: 48 }}>{selectedPlayer?.Name?.[0]}</Box>
            </Box>
          )}
          <DialogContentText>
            <strong>Team:</strong> {selectedPlayer?.Team || 'N/A'}
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}>
            <strong>College:</strong> {selectedPlayer?.College || 'N/A'}
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}>
            <strong>Position:</strong> {selectedPlayer?.Position  || 'N/A'}
          </DialogContentText>             
          <DialogContentText sx={{ mt: 2 }}>
            <strong>Experience:</strong> {selectedPlayer?.Experience || 'N/A'}
          </DialogContentText>    
          <DialogContentText sx={{ mt: 2 }}>
            <strong>Height:</strong> {selectedPlayer?.HeightFeet && selectedPlayer?.HeightInches ? `${selectedPlayer.HeightFeet}'${selectedPlayer.HeightInches}"` : 'N/A'}
          </DialogContentText>              
              
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>Close</Button>
        </DialogActions>
      </Dialog>
  )};