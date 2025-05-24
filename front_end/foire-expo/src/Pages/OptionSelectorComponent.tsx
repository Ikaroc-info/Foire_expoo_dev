// src/components/OptionSelector.tsx
import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import strings from "../config/strings";
import colors from "../config/color";

export interface OptionSelectorProps {
  options: string[];
  selectedOptions: string[];
  onToggle: (opt: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  selectedOptions,
  onToggle,
}) => (
  <Box
    p={1}
    borderBottom={1}
    borderColor="divider"
    sx={{ bgcolor: colors.backgroundColor }}
  >
    <Typography variant="subtitle1" gutterBottom color={colors.textColor}>
      {strings.options.title}
    </Typography>
    <FormGroup row>
      {options.map((opt) => (
        <FormControlLabel
          key={opt}
          sx={{
            color: colors.textColor,
            "& .MuiFormControlLabel-label": {
              color: colors.textColor,
            },
            "& .MuiCheckbox-root": {
              color: colors.textColor,
            },
          }}
          control={
            <Checkbox
              checked={selectedOptions.includes(opt)}
              onChange={() => onToggle(opt)}
              sx={{
                color: colors.textColor,
                "&.Mui-checked": {
                  color: colors.primaryColor,
                },
              }}
            />
          }
          label={opt}
        />
      ))}
    </FormGroup>
  </Box>
);

export default OptionSelector;
