import * as React from "react";
import { SyntheticEvent } from "react";
import { useLocation, Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import Camels from "../assets/camel.svg";
import Cows from "../assets/cow.svg";
import Sheep from "../assets/sheep.svg";

export function Nav() {
  const location = useLocation();
  const [value, setValue] = React.useState(getTabIndex(location.pathname));

  function getTabIndex(path: string) {
    switch (path) {
      case "/cows":
        return 1;
      case "/sheep":
        return 2;
      case "/":
      default:
        return 0;
    }
  }

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon tabs"
      sx={{ marginTop: "20px" }}
    >
      <Tab
        component={Link}
        to="/"
        label="Camels"
        icon={<img src={Camels} alt="Camels" width="35px" />}
        sx={{
          opacity: value === 0 ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
      />
      <Tab
        component={Link}
        to="/cows"
        label="Cows"
        icon={<img src={Cows} alt="Cows" width="35px" />}
        sx={{
          opacity: value === 1 ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
      />
      <Tab
        component={Link}
        to="/sheep"
        label="Sheep"
        icon={<img src={Sheep} alt="Sheep" width="35px" />}
        sx={{
          opacity: value === 2 ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
      />
    </Tabs>
  );
}
