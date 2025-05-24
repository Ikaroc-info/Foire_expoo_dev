import React from "react";
import { AppBar, Tabs, Tab, Toolbar } from "@mui/material";
import type { PageId } from "./App";
import strings from "./config/strings";
import colors from "./config/color";

interface MenuBarProps {
  pageId: number;
  setPageId: (id: PageId) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ pageId, setPageId }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: PageId) => {
    setPageId(newValue);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.secondaryBackgroundColor,
        color: colors.textColor,
        boxShadow: "none",
        borderBottom: `2px solid ${colors.backgroundColor}`,
      }}
    >
      <Toolbar disableGutters>
        <Tabs
          value={pageId}
          onChange={handleChange}
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: colors.primaryColor,
              color: colors.darkTextColor,
            },
            "& .MuiTab-root": {
              color: colors.textColor,
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
