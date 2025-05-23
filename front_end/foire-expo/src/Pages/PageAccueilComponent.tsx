// src/components/PageAccueil.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const PageAccueil: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    // Charge le fichier a.txt situé dans le dossier public
    fetch("/accueil.txt")
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) =>
        console.error("Erreur de chargement de accueil.txt:", error)
      );
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      p={2}
      sx={{
        bgcolor: "grey.100",
        overflow: "auto", // permet le scroll si le texte dépasse
        whiteSpace: "pre-wrap", // conserve les sauts de ligne
      }}
    >
      {/*//REMPLACER ICI PAR
      LE CONTENU'''*/}
      <Typography component="div">{content}</Typography>
    </Box>
  );
};

export default PageAccueil;
