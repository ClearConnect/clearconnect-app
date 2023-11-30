import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { CssBaseline } from '@mui/material';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });



interface ParentProps {
  children: React.ReactNode;
}

export  const ToggleColorMode: React.FC<ParentProps> = ( {children}) => {
  //  return <div>{child}</div>;
  //};

  //export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <>
          <IconButton sx={{ position: 'absolute', right: 0 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {children}
        </>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}