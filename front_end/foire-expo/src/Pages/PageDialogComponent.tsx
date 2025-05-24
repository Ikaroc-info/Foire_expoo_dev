// src/components/PageDialog.tsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import SMSConversation from "../SmsComponent";
import type { Message } from "../App";
import type { DialogProps } from "./PageContainerComponent";
import OptionSelector from "./OptionSelectorComponent";
import colors from "../config/color";
import InputBar from "./InputBarComponent";

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
      {dialogProps.options && dialogProps.setStatsLabels && (
        <OptionSelector
          options={dialogProps.options}
          selectedOptions={dialogProps.statsLabels as string[]}
          onToggle={toggleOption}
        />
      )}
      {/* zone scrollable */}
      <Box
        flex={1}
        sx={{
          overflowY: "auto", // permet le scroll si la liste est longue
          backgroundColor: colors.clearBackgroundColor, // couleur de fond claire
        }}
      >
        <SMSConversation messages={dialogProps.messages} />
      </Box>
      {/* input + send */}
      <InputBar
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={sending}
      />
    </Box>
  );
};

export default PageDialog;
