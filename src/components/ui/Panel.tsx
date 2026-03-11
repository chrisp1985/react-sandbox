import { Box, Container } from "@mui/material";

export const Panel = ({ children, colour = "primary" }: { children: React.ReactNode, colour?: "primary" | "secondary" }) => {
    return (
        <Box sx={{ backgroundColor: `${colour}.main`, py: 5 }}>
            <Container maxWidth={false}> {children} </Container>
        </Box>
    );
}   