import { Card, CardContent, Box, Container } from "@mui/material";
import { homeContent } from "./homeContent";
import { Title } from "../../components/ui/Title";
import { Panel } from "../../components/ui/Panel";
import { CustomCard } from "../../components/ui/CustomCard";

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
<Panel colour="primary">
      <CustomCard>
          <p>{homeContent.welcome.line2}</p>
          <p>{homeContent.welcome.line3}</p>
          <p>{homeContent.welcome.line4}</p>
      </CustomCard>
  </Panel>
  <Panel colour="secondary">
      <CustomCard>
          <h2>{homeContent.projects.line1}</h2>
          <p>{homeContent.projects.line2}</p>
          <ul>
            {homeContent.projects.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
      </CustomCard>
  </Panel>
</>
);};