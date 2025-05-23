import React from "react";
import PageAccueil from "./PageAccueilComponent";
import type { Message, PageProps } from "../App";
import PageDialog from "./PageDialogComponent";

export type PageContainerProps = {
  pageId: number;
  pageProps: PageProps;
};

export type StatsPayload = {
  input: string;
  list: string[];
};
export type SimplePayload = {
  input: string;
};

export type DialogPayload = SimplePayload | StatsPayload;

export type DialogProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  url: string;
  buildPayload: (input: string) => DialogPayload;
  statsLabels?: string[];
  setStatsLabels?: React.Dispatch<React.SetStateAction<string[]>>;
  options?: string[];
};

const PageContainer: React.FC<PageContainerProps> = ({ pageId, pageProps }) => {
  const dialogEliza: DialogProps = {
    messages: pageProps.messagesEliza,
    setMessages: pageProps.setMessagesEliza,
    url: "http://localhost:5000/eliza",
    buildPayload: (input: string) => ({ input }),
  };
  const dialogStats: DialogProps = {
    messages: pageProps.messagesStats,
    setMessages: pageProps.setMessagesStats,
    url: "http://localhost:5000/stat",
    buildPayload: (input: string) => ({
      input,
      list: pageProps.statsLabels,
    }),
    statsLabels: pageProps.statsLabels,
    setStatsLabels: pageProps.setStatsLabels,
    options: ["La bible", "Harry Potter", "Another Book"],
  };
  const dialogLLM: DialogProps = {
    messages: pageProps.messagesLLM,
    setMessages: pageProps.setMessagesLLM,
    url: "http://localhost:5000/LLM",
    buildPayload: (input: string) => ({ input }),
  };
  switch (pageId) {
    case 0:
      return <PageAccueil />;
    case 1:
      return <PageDialog {...dialogEliza} />;
    case 2:
      return <PageDialog {...dialogStats} />;
    case 3:
      return <PageDialog {...dialogLLM} />;
    default:
      return null;
  }
};

export default PageContainer;
