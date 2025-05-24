import { useState } from "react";
import MenuBar from "./MenuBarComponent";
import Footer from "./FooterComponent";
import PageContainer from "./Pages/PageContainerComponent";
import { Box } from "@mui/material";
import strings from "./config/strings";
import colors from "./config/color";
export type Message = [0 | 1, string];

export type PageId = 0 | 1 | 2 | 3;

export type PageProps = {
  messagesEliza: Message[];
  setMessagesEliza: React.Dispatch<React.SetStateAction<Message[]>>;
  messagesStats: Message[];
  setMessagesStats: React.Dispatch<React.SetStateAction<Message[]>>;
  statsLabels: string[];
  setStatsLabels: React.Dispatch<React.SetStateAction<string[]>>;
  messagesLLM: Message[];
  setMessagesLLM: React.Dispatch<React.SetStateAction<Message[]>>;
};

function App() {
  const [pageId, setPageId] = useState<PageId>(0);
  // Message list of Eliza
  const [messagesEliza, setMessagesEliza] = useState<Message[]>([
    [0, strings.greetings.elisa],
  ]);
  // Message list of Stats
  const [messagesStats, setMessagesStats] = useState<Message[]>([
    [0, strings.greetings.stats],
  ]);
  const [statsLabels, setStatsLabels] = useState<string[]>([]);
  // Message list of the LLM
  const [messagesLLM, setMessagesLLM] = useState<Message[]>([
    [0, strings.greetings.llm],
  ]);

  const pageProps: PageProps = {
    messagesEliza,
    setMessagesEliza,
    messagesStats,
    setMessagesStats,
    statsLabels,
    setStatsLabels,
    messagesLLM,
    setMessagesLLM,
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="95vh" // prend toute la hauteur de la fenêtre
      sx={{
        bgcolor: colors.backgroundColor, // fond gris clair
        overflow: "hidden", // pas de scroll sur le conteneur principal
      }}
    >
      <MenuBar pageId={pageId} setPageId={setPageId} />
      <Box
        component="main"
        flex={1} // prend tout l’espace restant
        bgcolor={colors.backgroundColor} // fond gris clair
        overflow="auto" // scroll si le contenu déborde
      >
        <PageContainer pageId={pageId} pageProps={pageProps} />
      </Box>
      <Footer pageId={pageId} setPageId={setPageId} />
    </Box>
  );
}

export default App;
