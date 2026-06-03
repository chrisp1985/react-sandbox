import { Typography, Grid, Card, CardContent, CardActions, CardMedia, Button, Chip, Box } from "@mui/material";
import { Title } from "../../components/ui/Title";
import { Panel } from "../../components/ui/Panel";
import { CustomCard } from "../../components/ui/CustomCard";
import lottiePic from "../../assets/profilepics/LottieBrooks.png";
import familyPic from "../../assets/profilepics/FamilyPlanner.png";
import financePic from "../../assets/profilepics/FinanceTracker.png";
import pactPic from "../../assets/profilepics/PactTest.png";
import userDataApiPic from "../../assets/profilepics/UserDataApi.png";
import userServicePic from "../../assets/profilepics/UserService.png";
import jobsBoardPic from "../../assets/profilepics/JobsBoard.png";

interface ProjectCardProps {
  title: string;
  url: string;
  summary: React.ReactNode;
  tags: string[];
  image?: string;
}

const ProjectCard = ({ title, url, summary, tags, image }: ProjectCardProps) => (
  <Card elevation={2} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
    {image && (
      <Box sx={{ p: 1.5, flexShrink: 0 }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 180, sm: '100%' }, objectFit: 'cover', borderRadius: 1 }}
        />
      </Box>
    )}
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {summary}
        </Typography>
        <Box mt={2} display="flex" flexWrap="wrap" gap={0.5}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" href={url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </Button>
      </CardActions>
    </Box>
  </Card>
);

const projects: ProjectCardProps[] = [
  {
    title: "Lottie Brooks React Native App",
    url: "https://github.com/chrisp1985/lottie-brooks-app",
    image: lottiePic,
    summary: (
      <>
        <p>A React Native chat app that lets users hold conversations with fictional characters from the Lottie Brooks children's book series, with each character's responses powered by Claude Sonnet via the Anthropic API. Users register and log in through Amazon Cognito, then either chat one-on-one with a character or join a group conversation with several at once.</p>
        <p>The backend runs entirely serverless on AWS — API Gateway handles authenticated requests, Lambda functions manage conversation logic and call out to the Anthropic API, and DynamoDB stores message history. Each character has its own system prompt to keep its personality consistent across sessions.</p>
        <p>Infrastructure is managed with AWS SAM and deployed via GitHub Actions, with Expo handling the mobile build pipeline through EAS CLI.</p>
      </>
    ),
    tags: ["React Native", "Expo", "AWS Lambda", "Anthropic", "DynamoDB", "Cognito", "SAM"],
  },
  {
    title: "Finance Tracker",
    url: "https://github.com/chrisp1985/finance-tracker",
    image: financePic,
    summary: (
      <>
        <p>A personal finance SPA for tracking balances across savings accounts, ISAs, pensions, and property investments — including equity calculations for the property side. You can log balance updates over time and the app plots the trends, so you can see where things have been and where they're heading rather than just what the number is today.</p>
        <p>The frontend is built in React with Vite and deployed to S3 via CloudFront. The backend is a single Node.js Lambda exposed through a function URL — no API Gateway needed — with DynamoDB storing the account data using a single-table design. Local development falls back to a JSON file so there's no AWS dependency when working offline.</p>
        <p>Infrastructure is managed with Terraform, Lambda deployments with AWS SAM, and the whole pipeline is automated through GitHub Actions.</p>
      </>
    ),
    tags: ["React", "Vite", "AWS Lambda", "DynamoDB", "S3", "CloudFront", "Terraform", "GitHub Actions"],
  },
  {
    title: "Family Planner",
    url: "https://github.com/chrisp1985/family-planner",
    image: familyPic,
    summary: (
      <>
        <p>A serverless family organiser covering meal planning, shopping lists, chore assignments, and group messaging. Authentication is handled through AWS Cognito with two distinct user groups: Admins (parents) who can assign chores, manage message history, and control the household setup, and Users (children) who can view their tasks, mark them done, and contribute to shared lists.</p>
        <p>The frontend is React 18 with Vite and Tailwind CSS, using dnd-kit for drag-and-drop chore management and TanStack Query for data fetching. The backend runs on Node.js 20 Lambda functions behind API Gateway, with DynamoDB for storage and S3 and CloudFront serving the static site. Each deployment is scoped to a single family via a Lambda environment variable.</p>
        <p>Infrastructure is defined in Terraform and deployments are fully automated through GitHub Actions — running tests, applying infrastructure changes, pushing Lambda updates, and syncing the frontend build to S3 in one pipeline.</p>
      </>
    ),
    tags: ["React", "Vite", "Tailwind CSS", "AWS Lambda", "DynamoDB", "Cognito", "Terraform", "TanStack Query", "GitHub Actions"],
  },
  {
    title: "Pact Demo",
    url: "https://github.com/chrisp1985/PactDemo",
    image: pactPic,
    summary: (
      <>
        <p>A worked example of consumer-driven contract testing between two Spring Boot microservices using Pact. The problem it's solving is a classic one — both services have green tests in isolation, but they break each other in production because neither side checked they were speaking the same language. Pact fixes that by letting the consumer define what it expects and making the producer verify it before anything gets deployed.</p>
        <p>The repo contains a consumer service and a producer service, with a Pact Broker running locally via Docker to manage and share the contracts between them. The workflow is: consumer publishes its pact, producer runs verification against it, and only then is it safe to deploy.</p>
      </>
    ),
    tags: ["Java", "Spring Boot", "Pact", "Contract Testing", "Docker", "PostgreSQL", "Gradle"],
  },
  {
    title: "User Data API",
    url: "https://github.com/chrisp1985/UserDataApi",
    image: userDataApiPic,
    summary: (
      <>
        <p>A Spring Boot WebFlux API demonstrating how to build a genuinely non-blocking reactive application end-to-end. The key point is that using a standard JDBC driver with WebFlux defeats the purpose — so this project uses R2DBC to keep the database layer async as well, with Mono and Flux returning single and multiple results respectively without blocking any threads.</p>
        <p>The stack includes MySQL (via Docker), Flyway for schema migrations, and Testcontainers for integration tests that run against a real database. Prometheus and Grafana are wired up for metrics, and the project includes Helm charts for Kubernetes deployment with environment-specific value files.</p>
      </>
    ),
    tags: ["Java", "Spring Boot", "WebFlux", "R2DBC", "MySQL", "Testcontainers", "Helm", "Kubernetes"],
  },
  {
    title: "User Service",
    url: "https://github.com/chrisp1985/UserService",
    image: userServicePic,
    summary: (
      <>
        <p>A Spring Boot service that generates user data on a schedule and publishes it to a Kafka topic on Confluent Cloud. It also exposes versioned REST endpoints so data can be submitted manually if needed. The idea is to have a realistic event-driven source of data that other services can consume.</p>
        <p>Deployment is fully automated — GitHub Actions builds a Docker image, pushes it to a private ECR repository, and AWS AppRunner picks it up from there. Infrastructure is defined in Terraform. The project also tracks DORA metrics (lead time, deployment frequency, test coverage) and ships them to Prometheus and Grafana.</p>
      </>
    ),
    tags: ["Java", "Spring Boot", "Kafka", "Confluent", "AWS AppRunner", "ECR", "Terraform", "Prometheus"],
  },
  {
    title: "Jobs Board",
    url: "https://github.com/chrisp1985/Jobs-Board",
    image: jobsBoardPic,
    summary: (
      <>
        <p>A REST API for a jobs management system built with Spring Boot, secured with Keycloak for OAuth 2.0 / OpenID Connect authentication. Users register and log in via Keycloak, receive a JWT, and can then interact with job listings depending on their role — admins can create, update, and delete jobs, while regular authenticated users can view them.</p>
        <p>The stack uses PostgreSQL as the database with Spring Data JPA, and Docker Compose spins up both the database and Keycloak locally. Role-based access control is enforced at the endpoint level, with admin and general roles configured directly in Keycloak.</p>
      </>
    ),
    tags: ["Java", "Spring Boot", "Keycloak", "OAuth 2.0", "PostgreSQL", "Docker", "JWT", "Gradle"],
  },
];

export const Profile = () => {
  return (
    <>
      <Title text="Projects" />
      <Panel>
        <CustomCard>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Playground
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A collection of personal and demo projects spanning mobile apps, backend services, event-driven systems, and testing patterns.
          </Typography>
        </CustomCard>
      </Panel>
      <Panel colour="secondary">
        <Box px={2} py={1}>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid size={{ xs: 12 }} key={project.title}>
                <ProjectCard {...project} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Panel>
    </>
  );
};
