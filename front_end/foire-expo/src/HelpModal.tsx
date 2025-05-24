import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import strings from "./config/strings";
import colors from "./config/color";
interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle
      sx={{
        bgcolor: colors.secondaryBackgroundColor,
        color: colors.textColor,
        position: "relative",
      }}
    >
      {strings.helpModal.title}
      <IconButton
        aria-label="fermer"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: colors.primaryColor,
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent
      dividers
      sx={{
        p: 2,
        maxHeight: "30vh",
        overflowY: "auto",
        backgroundColor: colors.primaryColor,
      }}
    >
      <Typography component="div" whiteSpace="pre-wrap">
        {strings.helpModal.content}
      </Typography>
    </DialogContent>
  </Dialog>
);

export default HelpModal;
