import { Container, Typography } from "@mui/material";
import { Title } from "../../components/ui/Title";
import { Panel } from "../../components/ui/Panel";
import { CustomCard } from "../../components/ui/CustomCard";

export const Profile = () => {
  return (
<>
<Title text="Profile Page" />
    <Panel>
      <CustomCard>
        <Typography variant="h4" gutterBottom>
          Section 1
        </Typography>
        <Typography>
          Some content here.
        </Typography>
      </CustomCard>
      </Panel>
        <Panel colour="secondary">
      <Container maxWidth="lg">
        <CustomCard>
        <Typography variant="h4" gutterBottom>
          Section 2
        </Typography>
        <Typography>
          Some content here.
        </Typography>
      </CustomCard>
    </Container>
    </Panel>
    </>
  );
};