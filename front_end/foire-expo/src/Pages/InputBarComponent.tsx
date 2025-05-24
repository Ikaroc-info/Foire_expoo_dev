// src/components/InputBar.tsx
import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import colors from "../config/color";

export interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const InputBar: React.FC<InputBarProps> = ({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Votre message…",
}) => (
  <Box display="flex" alignItems="center" p={1}>
    <TextField
      fullWidth
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSend()}
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: colors.backgroundColor,
          borderRadius: 2,
        },
        "& .MuiInputBase-input": {
          color: colors.textColor,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderWidth: 2,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.primaryColor,
        },
        "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.primaryColor,
        },
      }}
    />
    <IconButton
      onClick={onSend}
      disabled={disabled || !value.trim()}
      sx={{
        marginLeft: 1,
        color: disabled ? "transparent" : colors.primaryColor,
        // hover
        "&:hover": {
          backgroundColor: disabled
            ? "transparent"
            : colors.secondaryBackgroundColor,
          color: colors.primaryColor,
        },
      }}
    >
      <SendIcon />
    </IconButton>
  </Box>
);

export default InputBar;
