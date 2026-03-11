import { Box, Typography } from "@mui/material";
import wilbur from "../../assets/images/wilbur.jpg";

export const Title = ({ text }: { text: string }) => {
    return (
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${wilbur})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        {/* Overlay */}
        <Box sx={{ position: "absolute", inset: 0, backgroundColor: "rgba(18, 1, 49, 0.78)" }} /> #120131
        <Typography variant="h1"
  sx={{
    position: "relative",
    color: "white",
    textAlign: "center",
    maxWidth: "90%",
    px: 2,
    wordBreak: "break-word",
    fontSize: {
      xs: "4rem",
      sm: "5rem",
      md: "6rem",
      lg: "7rem"
    }
  }}
>
  {text}
</Typography>
      </Box>
    );
}