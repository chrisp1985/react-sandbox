import { Typography, Grid, Card, CardContent, CardActions, Button, Chip, Box } from "@mui/material";
import { Title } from "../../components/ui/Title";
import { Panel } from "../../components/ui/Panel";
import { CustomCard } from "../../components/ui/CustomCard";

interface ProjectCardProps {
  title: string;
  url: string;
  summary: React.ReactNode;
  tags: string[];
}

const ProjectCard = ({ title, url, summary, tags }: ProjectCardProps) => (
  <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
  </Card>
);

const projects: ProjectCardProps[] = [
  {
    title: "Lottie Brooks React Native App",
    url: "https://github.com/chrisp1985/lottie-brooks-app",
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
    summary: (
      <>
        <p>A personal finance app for tracking account balances over time and making sense of where things are heading. You can add multiple accounts, log balance updates as data points, and the app plots them so you can see trends and build a picture of your financial position across everything in one place.</p>
        <p>The focus is on visibility — being able to look back at how balances have moved and project forward based on what the data is showing, rather than just seeing a snapshot of where things stand today.</p>
      </>
    ),
    tags: ["Finance", "Data Visualisation", "Trend Analysis", "Forecasting"],
  },
  {
    title: "Family Planner",
    url: "https://github.com/chrisp1985/family-planner",
    summary: (
      <>
        <p>A family web app with separate user groups for adults and kids. Adults can assign tasks to the kids — things like cleaning their bedroom or emptying the bin — while the kids have their own view where they can see what's been set for them. There's also a shared chat and a shopping list to keep everything in one place.</p>
        <p>The two-tier user model is the main design point: adults get the controls, kids get the task list. It's essentially a lightweight household management tool that doesn't rely on everyone being in the same room to stay coordinated.</p>
      </>
    ),
    tags: ["Family", "Task Management", "Chat", "Shopping List", "Role-based Access"],
  },
  {
    title: "Pact Demo",
    url: "https://github.com/chrisp1985/PactDemo",
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
      <Title text="Profile Page" />
      <Panel>
        <CustomCard>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Projects
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
              <Grid item xs={12} sm={6} md={4} key={project.title}>
                <ProjectCard {...project} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Panel>
    </>
  );
};
