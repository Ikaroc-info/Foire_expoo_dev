import React from "react";
import { AppBar, Tabs, Tab, Toolbar } from "@mui/material";
import type { PageId } from "./App";
import strings from "./config/strings";

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
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "white",
              color: "black",
            },
            "& .MuiTab-root": {
              color: "white",
              backgroundColor: "transparent",
            },
          }}
        >
          <Tab label={strings.menu.accueil} />
          <Tab label={strings.menu.elisa} />
          <Tab label={strings.menu.stats} />
          <Tab label={strings.menu.llm} />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
