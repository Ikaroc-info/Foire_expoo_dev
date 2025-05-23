// src/components/SMSConversation.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

type Message = [0 | 1, string];

interface SMSConversationProps {
  messages: Message[];
}

const SMSConversation: React.FC<SMSConversationProps> = ({ messages }) => {
  return (
    <Box display="flex" flexDirection="column" gap={1} p={2} height="100%">
      {messages.map(([author, text], idx) => (
        <Box
          key={idx}
          display="flex"
          justifyContent={author === 0 ? "flex-start" : "flex-end"}
        >
          <Box
            maxWidth="70%"
            px={2}
            py={1}
            borderRadius={2}
            bgcolor={author === 0 ? "grey.300" : "primary.main"}
            color={author === 0 ? "text.primary" : "common.white"}
          >
            <Typography variant="body1">{text}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SMSConversation;
