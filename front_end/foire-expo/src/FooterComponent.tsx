// src/components/Footer.tsx
import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpModal from "./HelpModal";
import type { PageId } from "./App";
import colors from "./config/color";

interface FooterProps {
  pageId: number;
  setPageId: (id: PageId) => void;
}

const Footer: React.FC<FooterProps> = ({ pageId, setPageId }) => {
  const [helpOpen, setHelpOpen] = useState(false);
  const handlePrev = () => setPageId(Math.max(0, pageId - 1) as PageId);
  const handleNext = () => setPageId(Math.min(3, pageId + 1) as PageId);
  const handleHelp = () => setHelpOpen(true);

  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      bgcolor={colors.secondaryBackgroundColor}
      boxShadow={3}
    >
      {/* Flèche gauche */}
      <IconButton
        onClick={handlePrev}
        disabled={pageId === 0}
        sx={{
          color: pageId === 0 ? "transparent" : colors.backgroundColor,
          backgroundColor:
            pageId === 0 ? "transparent" : colors.secondaryBackgroundColor,
          "&:hover": {
            backgroundColor:
              pageId === 0 ? "transparent" : colors.backgroundColor,
            color: colors.primaryColor,
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* Centre : aide et lancement */}
      <Box display="flex" gap={1}>
        <IconButton
          onClick={handleHelp}
          sx={{
            color: pageId === 0 ? "transparent" : colors.backgroundColor,
            backgroundColor:
              pageId === 0 ? "transparent" : colors.secondaryBackgroundColor,
            "&:hover": {
              backgroundColor:
                pageId === 0 ? "transparent" : colors.backgroundColor,
              color: colors.primaryColor,
            },
          }}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Box>

      {/* Flèche droite */}
      <IconButton
        onClick={handleNext}
        disabled={pageId === 3}
        sx={{
          color: pageId === 3 ? "transparent" : colors.backgroundColor,
          backgroundColor:
            pageId === 3 ? "transparent" : colors.secondaryBackgroundColor,
          "&:hover": {
            backgroundColor:
              pageId === 3 ? "transparent" : colors.backgroundColor,
            color: colors.primaryColor,
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </Box>
  );
};

export default Footer;
