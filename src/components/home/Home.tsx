import { Card, CardContent } from "@mui/material";

export const Home = () => {
  return (
    <div style={{ padding: 32, }}>
      <h1 style={{ textAlign: 'center'}}>Welcome to my Page</h1>
      <Card sx={{ maxWidth: '80%', mx: 'auto', mt: 4, backgroundColor: '#f9f9f9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <p>A lot of what I'm doing here is to trial different React components and libraries. The page is a work in progress and will be updated regularly.</p>
          <p>Use the navigation bar to explore the different projects and my profile.</p>
          <p>The pages explore various aspects of web development, including UI design, state management, and API integration. It also uses different charting libraries and data visualization techniques.</p>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: '80%', mx: 'auto', mt: 4, backgroundColor: '#f9f9f9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <h2>Projects</h2>
            <p>The projects include:</p>
            <ul>
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </CardContent>
        </Card>
    </div>
  );
};