import { Card, CardContent, Box, Container } from "@mui/material";
import { homeContent } from "./homeContent";
import { Title } from "../common/Title";

const cardSx = {
  maxWidth: '90%', 
  mx: 'auto', 
  backgroundColor: '#f9f9f9', 
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
};  

export const Home = () => {
  return (
<>
<Title text="React Playground" />
<Box sx={{ backgroundColor: "primary.main", py: 5 }}>
  <Box sx={{ maxWidth: '100%', mx: 'auto', mt: 4, p: 0 }}>
    <Container maxWidth={false}>
      <Card sx={cardSx}>
        <CardContent>
          <p>{homeContent.welcome.line2}</p>
          <p>{homeContent.welcome.line3}</p>
          <p>{homeContent.welcome.line4}</p>
        </CardContent>
      </Card>
    </Container>
  </Box>
</Box>
<Box sx={{ backgroundColor: "secondary.main", py: 5 }}>
  <Box sx={{ maxWidth: '100%', mx: 'auto', mt: 4, p: 0 }}>
    <Container maxWidth={false}>
      <Card sx={cardSx}>
        <CardContent>
          <h2>{homeContent.projects.line1}</h2>
          <p>{homeContent.projects.line2}</p>
          <ul>
            {homeContent.projects.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Container>
  </Box>
</Box>
</>
);};