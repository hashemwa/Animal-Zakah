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

const camelLookup: { [key: number]: string } = {
  0: "",
  1: "Bint Makhād",
  2: "Bint Labūns",
  3: "Hiqqahs",
  4: "Jadha'ah",
};

export function CamelsZakah() {
  const [numCamels, setNumCamels] = useState<string>(""); // Changed to string for input formatting
  const [zakahResult, setZakahResult] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString(); // Format the number with commas
  };

  const calculateZakah = (num: number): string => {
    if (num < 0) {
      return "Number of camels cannot be negative.";
    } else if (num < 5) {
      return "Nothing";
    }

    let zakahResult = "N/A";
    let zakah: 0 | 1 | 2 | 3 | 4 | undefined;

    if (num >= 5 && num <= 24) {
      zakahResult = `${formatNumber(Math.floor(num / 5))} Sheep/Goats`;
    } else if (num >= 25 && num <= 75) {
      if (num >= 25 && num <= 35) {
        zakah = 1;
      } else if (num >= 36 && num <= 45) {
        zakah = 2;
      } else if (num >= 46 && num <= 60) {
        zakah = 3;
      } else if (num >= 61) {
        zakah = 4;
      }
      if (zakah !== undefined) {
        zakahResult = `1 ${camelLookup[zakah]}`;
      }
    } else if (num >= 76 && num <= 124) {
      if (num >= 76 && num <= 90) {
        zakah = 2;
      } else if (num >= 90) {
        zakah = 3;
      }
      if (zakah !== undefined) {
        zakahResult = `2 ${camelLookup[zakah]}`;
      }
    } else if (num >= 125 && num <= 144) {
      zakahResult = `2 ${camelLookup[3]} + ${formatNumber(
        Math.floor((num - 120) / 5)
      )} Sheep/Goats`;
    } else if (num >= 145 && num <= 149) {
      zakahResult = `2 ${camelLookup[3]} + 1 ${camelLookup[1]}`;
    } else if (num >= 150 && num <= 154) {
      zakahResult = `3 ${camelLookup[3]}`;
    } else if (num >= 155 && num <= 174) {
      zakahResult = `3 ${camelLookup[3]} + ${formatNumber(
        Math.floor((num - 150) / 5)
      )} Sheep/Goats`;
    } else if (num >= 175 && num <= 185) {
      zakahResult = `3 ${camelLookup[3]} + 1 ${camelLookup[1]}`;
    } else if (num >= 186 && num <= 195) {
      zakahResult = `3 ${camelLookup[3]} + 1 ${camelLookup[2]}`;
    } else if (num >= 196 && num <= 200) {
      zakahResult = `4 ${camelLookup[3]}`;
    } else {
      zakahResult = calculateZakahAmount250(num);
    }

    // Singular adjustments
    if (zakahResult.endsWith("Sheep/Goats")) {
      zakahResult = zakahResult.replace("1 Sheep/Goats", "1 Sheep/Goat");
    }
    if (zakahResult.endsWith("Bint Labūns")) {
      zakahResult = zakahResult.replace("1 Bint Labūns", "1 Bint Labūn");
    }
    if (zakahResult.endsWith("Hiqqahs")) {
      zakahResult = zakahResult.replace("1 Hiqqahs", "1 Hiqqah");
    }

    return zakahResult;
  };

  const calculateZakahAmount250 = (num: number): string => {
    let x = num;
    let addHiqqahs = 0;
    while (x >= 200) {
      x = x - 50;
      addHiqqahs++;
    }
    const zakahResult = calculateZakah(x);
    const numHiqqahs = addHiqqahs + parseInt(zakahResult[0]);
    return formatNumber(numHiqqahs) + zakahResult.slice(1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Remove commas for parsing to number
    const numericValue = parseInt(value.replace(/,/g, ""));

    // Check if the parsed number is valid and within range
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 1000000) {
      setNumCamels(formatNumber(numericValue)); // Format the value for display with commas
      setErrorMessage(""); // Clear any error message on input
    } else if (value === "") {
      setNumCamels(""); // Clear the input if empty
    }
  };

  const handleCalculateClick = () => {
    const parsedNumCamels = parseInt(numCamels.replace(/,/g, "")); // Remove commas for calculation

    if (isNaN(parsedNumCamels) || parsedNumCamels < 0) {
      // Check for invalid input (NaN or negative)
      setZakahResult(""); // Clear any previous zakah results
      setErrorMessage("Enter a valid number of camels!"); // Set error message for invalid input
    } else if (parsedNumCamels >= 1000000) {
      setZakahResult("No one has that many camels..."); // Set message for too many camels
      setErrorMessage(""); // Clear any previous error messages
    } else {
      const result = calculateZakah(parsedNumCamels); // Calculate zakah
      setZakahResult(result); // Update the zakah result
      setErrorMessage(""); // Clear any previous error messages
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
          label="Number of Camels"
          variant="outlined"
          slotProps={{
            htmlInput: {
              inputMode: "numeric", // Use 'numeric' to show the number keyboard
            },
          }}
          value={numCamels}
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
          height: "100%",
          backgroundColor: "#006766",
          borderRadius: "10px",
          color: "white",
          fontWeight: "600",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          fontSize: "1.2rem",
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
            padding: "20px",
          }}
        >
          <List
            sx={{
              zIndex: 5,
              color: "text.secondary",
              backgroundColor: "#f6f6f6",
              borderRadius: "10px",
            }}
          >
            <ListItem>
              <ListItemText
                primary="• Bint Makhād: An almost 2-year-old she-camel"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Bint Labūn: An almost 3-year-old she-camel"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Hiqqah: An almost 4-year-old she-camel"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Jadha'ah: An almost 5-year-old she-camel"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
          </List>
          <List
            sx={{
              zIndex: 5,
              color: "text.secondary",
              backgroundColor: "#f6f6f6",
              borderRadius: "10px",
              mt: 2,
            }}
          >
            <ListItem>
              <ListItemText
                primary="If you do not have enough camels, then give the equivalent monetary value in zakah"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </CardContent>
  );
}
