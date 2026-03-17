import { Box, Typography } from "@mui/material";
import wilbur from "../../assets/images/wilbur.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const Title = ({ text }: { text: string }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${wilbur})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: isMobile ? 850 : 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
        {/* Overlay */}
        <Box sx={{ position: "absolute", inset: 0, backgroundColor: "rgba(18, 1, 49, 0.78)" }} />
        <Typography variant="h1"
  sx={{
    position: "relative",
    color: "white",
    textAlign: "center",
    // maxWidth: "90%",
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