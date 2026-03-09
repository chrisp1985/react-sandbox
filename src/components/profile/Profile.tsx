import { Box, Container, Typography } from "@mui/material";
import { Title } from "../common/Title";

export const Profile = () => {
  return (
    // <Box>
    // <div style={{ padding: 32, textAlign: 'center' }}>
    //   <h1>Profile</h1>
    //   <p style={{ textAlign: 'left' }}>This is the profile page.</p>
    // </div>
    // </Box>
<>
<Title text="Profile Page" />
    <Box sx={{ backgroundColor: "primary.main", py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Section 1
        </Typography>
        <Typography>
          Some content here.
        </Typography>
      </Container>
    </Box>
        <Box sx={{ backgroundColor: "secondary.main", py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Section 2
        </Typography>
        <Typography>
          Some content here.
        </Typography>
      </Container>
    </Box>
    </>
  );
};