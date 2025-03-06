// App.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { VisaBotDashboard } from '../src/pages/VisaBotDashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5D5CDE',
    },
    background: {
      default: '#181818',
      paper: '#1F2937',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <VisaBotDashboard />
    </ThemeProvider>
  );
}