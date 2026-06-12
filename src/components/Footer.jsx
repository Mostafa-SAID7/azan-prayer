import { Box, Typography } from "@mui/material";
import { useLang } from "../contexts/LanguageContext";

const Footer = () => {
  const { lang } = useLang();
  return (
    <Box sx={{ background: "rgba(9,121,16,1)", py: 1.5 }}>
      <Typography
        justifyContent="center"
        display="flex"
        alignItems="center"
        color="#fff"
        variant="body2"
        sx={{ fontSize: 13, opacity: 0.9 }}
      >
        {lang === "ar" ? "تصميم وتطوير" : "Designed & developed by"}&nbsp;
        <Box component="span" sx={{ color: "#ffe200", fontWeight: "bold" }}>
          M.Said
        </Box>
        &nbsp;© 2024
      </Typography>
    </Box>
  );
};

export default Footer;
