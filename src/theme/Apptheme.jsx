import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { purpleTheme } from './purpleTheme';

export const Apptheme = ({ children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
