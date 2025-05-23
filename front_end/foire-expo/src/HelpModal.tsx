import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import helpText from "./data/helpContent";

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>
      Aide
      <IconButton
        aria-label="fermer"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers sx={{ p: 2, maxHeight: "60vh", overflowY: "auto" }}>
      <Typography component="div" whiteSpace="pre-wrap">
        {helpText}
      </Typography>
    </DialogContent>
  </Dialog>
);

export default HelpModal;
