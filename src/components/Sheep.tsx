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
  const [numSheep, setNumSheep] = useState<string>(""); // Changed to string for input formatting
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

    // Format result for large numbers
    if (numSheep >= 1000) {
      zakahResult =
        formatNumberWithCommas(parseInt(zakahResult.replace(/\D/g, ""))) +
        " Sheep/Goats"; // This is a workaround to format numbers correctly
    }

    return zakahResult;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Remove commas for parsing to number
    const numericValue = parseInt(value.replace(/,/g, ""));

    // Check if the parsed number is valid and within range
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 10000000) {
      setNumSheep(formatNumberWithCommas(numericValue)); // Format the value for display with commas
      setErrorMessage(""); // Clear any error message on input
    } else if (value === "") {
      setNumSheep(""); // Clear the input if empty
    }
  };

  const handleCalculateClick = () => {
    const parsedNumSheep = parseInt(numSheep.replace(/,/g, "")); // Remove commas for calculation

    if (isNaN(parsedNumSheep) || parsedNumSheep < 0) {
      // Check for invalid input (NaN or negative)
      setZakahResult(""); // Clear any previous zakah results
      setErrorMessage("Enter a valid number of sheep!"); // Set error message for invalid input
    } else if (parsedNumSheep >= 10000000) {
      setZakahResult("No one has that many sheep..."); // Set message for too many sheep
      setErrorMessage(""); // Clear any previous error messages
    } else {
      const result = calculateZakah(parsedNumSheep); // Calculate zakah
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
          label="Number of Sheep"
          variant="outlined"
          slotProps={{
            htmlInput: {
              inputMode: "numeric", // Use 'numeric' to show the number keyboard
            },
          }}
          value={numSheep}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          onClick={handleCalculateClick} // Call the calculation function here
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
                primary="In zakah, sheep and goats are the same"
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
