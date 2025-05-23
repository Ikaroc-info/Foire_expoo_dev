import React from "react";
import { AppBar, Tabs, Tab, Toolbar } from "@mui/material";
import type { PageId } from "./App";

interface MenuBarProps {
  pageId: number;
  setPageId: (id: PageId) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ pageId, setPageId }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: PageId) => {
    setPageId(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Tabs
          value={pageId}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ ml: 2 }}
        >
          <Tab label="Accueil" />
          <Tab label="Elisa" />
          <Tab label="Stats" />
          <Tab label="LLM" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
