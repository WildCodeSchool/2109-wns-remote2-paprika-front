import { createTheme } from '@mui/material/styles';
import componentsOverride from './overrides';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f1c40f',
      light: '#f3fff9',
      dark: '#c39d04',
      contrastText: 'rgba(30,30,30,0.87)',
    },
    secondary: {
      main: '#FFC3C3',
    },
    error: {
      main: '#e74c3c',
      light: '#FFC3C3',
    },
    info: {
      main: '#B3E5FC',
    },
    warning: {
      main: '#FFF3CD',
    },
    background: {
      paper: '#fcfcfc',
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
  },
});

theme.components = componentsOverride(theme);

export default theme;
