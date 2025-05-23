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
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (opt: string) => {
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
    if (!dialogProps.setStatsLabels) return;
    dialogProps.setStatsLabels((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    // Ajout du message utilisateur (author = 1)
    dialogProps.setMessages((prev) => [...prev, [1, text] as Message]);
    setInput("");
    setSending(true);

    try {
      // Appel API
      const payload = dialogProps.buildPayload(text);
      const res = await fetch(dialogProps.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const { result, error } = await res.json();
      if (error) {
        console.error("API error:", error);
        dialogProps.setMessages((prev) => [
          ...prev,
          [0, "Veuillez sélectionner une source de donnée"] as Message,
        ]);
        return;
      }

      // selon ton backend, adapte la clef : ici on prend result comme clef du JSON
      const reply = result as string;

      // 3Ajout de la réponse (author = 0 puisque c'est le bot)
      dialogProps.setMessages((prev) => [...prev, [0, reply] as Message]);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setSending(false);
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
                    checked={selectedOptions.includes(opt)}
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
