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

export function CowsZakah() {
  const [numCows, setNumCows] = useState<string>("");
  const [zakahResult, setZakahResult] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const formatNumberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateZakah = (numCows: number): string => {
    let zakahResult = "N/A";
    numCows = Math.floor(numCows / 10) * 10; 

    if (numCows < 30) {
      zakahResult = "Nothing";
    } else if (numCows >= 40 && numCows <= 59) {
      zakahResult = "1 Musinn/Musinnah";
    } else if (numCows >= 30 && numCows <= 39) {
      zakahResult = "1 Tabī'/Tabī'ah";
    } else if (numCows >= 60 && numCows <= 69) {
      zakahResult = "2 Tabī's/Tabī'ahs";
    } else if (numCows >= 70 && numCows <= 79) {
      zakahResult = "1 Musinnah + 1 Tabī";
    } else if (numCows >= 80 && numCows <= 89) {
      zakahResult = "2 Musinns";
    } else if (numCows >= 90 && numCows <= 99) {
      zakahResult = "3 Tabī'ahs";
    } else if (numCows >= 100 && numCows <= 109) {
      zakahResult = "2 Tabī's + 1 Musinnah";
    } else if (numCows % 120 === 0) {
      const musinnahCount = numCows / 40;
      const tabiCount = numCows / 30;
      zakahResult = `${formatNumberWithCommas(
        tabiCount
      )} Tabī's / ${formatNumberWithCommas(musinnahCount)} Musinnahs`;
    } else if (numCows % 40 === 0) {
      const musinnahCount = numCows / 40;
      zakahResult = `${formatNumberWithCommas(musinnahCount)} Musinnahs`;
    } else if (numCows % 30 === 0) {
      const tabiCount = numCows / 30;
      zakahResult = `${formatNumberWithCommas(tabiCount)} Tabī's`;
    } else {
      let tabiCount = 0;
      let musinnahCount = 0;
      while (numCows % 40 !== 0) {
        numCows -= 30;
        tabiCount += 1;
      }
      musinnahCount = Math.floor(numCows / 40);
      zakahResult = `${formatNumberWithCommas(
        tabiCount
      )} Tabī's + ${formatNumberWithCommas(musinnahCount)} Musinnahs`;
    }

 
    zakahResult = zakahResult
      .replace(/\b1 Tabī's\b/, "1 Tabī'")
      .replace(/\b1 Musinnahs\b/, "1 Musinnah");

    return zakahResult;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;


    const numericValue = parseInt(value.replace(/,/g, ""));


    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 1000000000) {
      setNumCows(formatNumberWithCommas(numericValue)); 
      setErrorMessage("");
    } else if (value === "") {
      setNumCows("");
    }
  };

  const handleCalculateClick = () => {
    const parsedNumCows = parseInt(numCows.replace(/,/g, "")); 

    if (isNaN(parsedNumCows) || parsedNumCows < 0) {
  
      setZakahResult(""); 
      setErrorMessage("Enter a valid number of cows!");
    } else if (parsedNumCows >= 1000000000) {
      setZakahResult("No one has that many cows..."); 
      setErrorMessage("");
    } else {
      const result = calculateZakah(parsedNumCows); 
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
          label="Number of Cows"
          variant="outlined"
          slotProps={{
            htmlInput: {
              inputMode: "numeric",
            },
          }}
          value={numCows}
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
                primary="• Tabī': An almost 2-year-old male calf"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Tabī'ah: An almost 2-year-old female calf"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Musinn: An almost 3-year-old male calf"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Musinnah: An almost 3-year-old female calf"
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
                primary="In zakah, cows and oxes are the same"
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
                primary="If you do not have enough cows, then give the equivalent monetary value in zakah"
                primaryTypographyProps={{ sx: { fontWeight: "600" } }}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </CardContent>
  );
}
