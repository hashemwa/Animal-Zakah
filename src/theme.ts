// src/theme.ts
import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#006766', // Main color for primary theme
    },
    secondary: {
      main: '#ffffff', // Change this to your desired secondary color
    },
    background: {
      default: '#f5f5f5', // Default background color
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      "'Segoe UI'",
      "'Roboto'",
      "'Oxygen'",
      "'Ubuntu'",
      "'Cantarell'",
      "'Fira Sans'",
      "'Droid Sans'",
      "'Helvetica Neue'",
      'sans-serif',
    ].join(','),
  },
});

export default theme;
