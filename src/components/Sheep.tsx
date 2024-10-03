import React, { useState } from "react";
import {
  CardContent,
  TextField,
  Stack,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export function SheepZakah() {
  const [numSheep, setNumSheep] = useState<string>("");
  const [zakahResult, setZakahResult] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const formatNumberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateZakah = (numSheep: number): string => {
    let zakahResult = "N/A";

    if (numSheep < 40) {
      zakahResult = "Nothing";
    } else if (numSheep >= 40 && numSheep <= 120) {
      zakahResult = "1 Sheep/Goat";
    } else if (numSheep >= 121 && numSheep <= 200) {
      zakahResult = "2 Sheep/Goats";
    } else if (numSheep >= 201 && numSheep <= 399) {
      zakahResult = "3 Sheep/Goats";
    } else if (numSheep >= 400) {
      const extraSheepGoats = Math.floor((numSheep - 400) / 100);
      zakahResult = `${extraSheepGoats + 4} Sheep/Goats`;
    }

    if (numSheep >= 1000) {
      zakahResult =
        formatNumberWithCommas(parseInt(zakahResult.replace(/\D/g, ""))) +
        " Sheep/Goats";
    }

    return zakahResult;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const numericValue = parseInt(value.replace(/,/g, ""));

    if (
      !isNaN(numericValue) &&
      numericValue >= 0 &&
      numericValue <= 1000000000
    ) {
      setNumSheep(formatNumberWithCommas(numericValue));
      setErrorMessage("");
    } else if (value === "") {
      setNumSheep("");
    }
  };

  const handleCalculateClick = () => {
    const parsedNumSheep = parseInt(numSheep.replace(/,/g, ""));

    if (isNaN(parsedNumSheep) || parsedNumSheep < 0) {
      setZakahResult("");
      setErrorMessage("Enter a valid number of sheep!");
    } else if (parsedNumSheep >= 1000000000) {
      setZakahResult("No one has that many sheep...");
      setErrorMessage("");
    } else {
      const result = calculateZakah(parsedNumSheep);
      setZakahResult(result);
      setErrorMessage("");
    }
  };

  return (
    <CardContent
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px",
      }}
    >
      <Stack direction="column" spacing={2}>
        <TextField
          label="Number of Sheep"
          variant="outlined"
          slotProps={{
            htmlInput: {
              inputMode: "numeric",
            },
          }}
          value={numSheep}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          onClick={handleCalculateClick}
          sx={{ marginBottom: "10px" }}
        >
          Calculate
        </Button>
      </Stack>
      <Typography
        variant="h5"
        component="div"
        sx={{ fontWeight: "600", mt: 8 }}
      >
        Zakah Due
      </Typography>
      <Typography
        component="div"
        sx={{
          mt: 2,
          width: "80%",
          textAlign: "center",
          height: "auto",
          minHeight: "100px",
          backgroundColor: "#006766",
          borderRadius: "10px",
          color: "white",
          fontWeight: "600",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          fontSize: "1.3rem",
        }}
      >
        {zakahResult || errorMessage}
      </Typography>
      <IconButton
        color="primary"
        aria-label="note"
        sx={{ mt: 2 }}
        onClick={toggleDrawer}
      >
        <FormatListBulletedIcon fontSize="medium" />
      </IconButton>
      <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer}>
        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
          style={{
            padding: "50px 20px",
          }}
        >
          <List
            sx={{
              zIndex: 5,
              color: "text.secondary",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
            }}
          >
            <ListItem>
              <ListItemText
                primary="In zakah, sheep and goats are the same"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
          </List>
          <List
            sx={{
              zIndex: 5,
              color: "text.secondary",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              mt: 2,
            }}
          >
            <ListItem>
              <ListItemText
                primary="If you do not have enough sheep/goats, then give the equivalent monetary value in zakah"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </CardContent>
  );
}
