// src/components/PageDialog.tsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SMSConversation from "../SmsComponent";
import type { Message } from "../App";
import type { DialogProps } from "./PageContainerComponent";

const PageDialog: React.FC<DialogProps> = (dialogProps) => {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const toggleOption = (opt: string) => {
    if (!dialogProps.setStatsLabels) return;
    dialogProps.setStatsLabels((previous) =>
      previous.includes(opt)
        ? previous.filter((o) => o !== opt)
        : [...previous, opt]
    );
  };

  const handleError = (error: Error, code: number) => {
    console.error("An error occurred:", error);
    // If error is 404, it means the answer is not available
    if (code === 404) {
      dialogProps.setMessages((prev) => [
        ...prev,
        [0, "Désolé, je ne sais pas comment répondre."] as Message,
      ]);
      setSending(false);
      return;
    }
    dialogProps.setMessages((prev) => [
      ...prev,
      [0, "Une erreur est survenue. Veuillez réessayer plus tard."] as Message,
    ]);
    setSending(false);
  };

  const handleSend = async () => {
    // If the input is empty, or we are already sending something, do nothing
    const text = input.trim();
    if (!text || sending) return;
    // Add the message from the user (author = 1)
    dialogProps.setMessages((prev) => [...prev, [1, text] as Message]);
    setInput("");
    setSending(true);
    // Prepare the payload for the API call
    const payload = dialogProps.buildPayload(text);
    // Make the API call

    try {
      const res = await fetch(dialogProps.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.result) {
        handleError(new Error(data.error || "Erreur inconnue"), res.status);
        return;
      }
      // Get the reply from the response
      const reply = data.result as string;
      // Add the reply from the bot (author = 0)
      dialogProps.setMessages((prev) => [...prev, [0, reply] as Message]);
      setSending(false);
    } catch (error) {
      handleError(error as Error, 500);
      return;
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {dialogProps.options && (
        <Box p={1} borderBottom={1} borderColor="divider">
          <Typography variant="subtitle2" gutterBottom>
            Choisissez les options :
          </Typography>
          <FormGroup row>
            {dialogProps.options.map((opt) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox
                    checked={dialogProps.statsLabels?.includes(opt)}
                    onChange={() => toggleOption(opt)}
                  />
                }
                label={opt}
              />
            ))}
          </FormGroup>
        </Box>
      )}
      {/* zone scrollable */}
      <Box
        flex={1}
        sx={{
          overflowY: "auto", // permet le scroll si la liste est longue
          backgroundColor: "grey.100",
        }}
      >
        <SMSConversation messages={dialogProps.messages} />
      </Box>

      {/* input + send */}
      <Box display="flex" alignItems="center" p={1}>
        <TextField
          fullWidth
          placeholder="Votre message…"
          value={input}
          disabled={sending}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={sending || !input.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PageDialog;
