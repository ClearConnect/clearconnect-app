import { createTheme } from '@mui/material/styles';
import { Typography, Button, Grid, Paper, Box } from '@mui/material';
//import { Box } from '@mui/system';
import { LoginButton } from '../features/auth/login';
//import { selectStatus } from '../features/auth/AccessTokenSlice';
//import { useSelector } from 'react-redux';
import { useAppSelector } from '../app/hooks'

import { useRef } from 'react';
import { LinearProgress } from '@mui/material';

import { useAuth0 } from "@auth0/auth0-react";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
interface MessageProps {
  auth0Status: string;
}


export interface ProgressBarProps { message: string };

export const ProgressBar: React.FC<ProgressBarProps> = ({ message }) => {
  const textRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={textRef}>{message}</div>
      <LinearProgress
        sx={{
          width: textRef.current ? textRef.current.offsetWidth : '100%',
        }}
      />
    </>
  );
}


export const MessageOnEmptyScreen: React.FC<{ message:string}> = ({message}) => {
  return (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <Typography variant="h4" component="h1">
      {message}
    </Typography>
  </Box>
  )
}

const MessageGridItem: React.FC<MessageProps> = ({ auth0Status }) => {
  const { /* isAuthenticated, */ isLoading: isAuth0Loading } = useAuth0();
  switch (auth0Status) {
    case 'loading':
      return (<Grid item>
        <Typography variant="h3" component="h2">
          <ProgressBar message='We are getting things ready for you...' />
        </Typography>

      </Grid>)
    case 'idle':
      return (isAuth0Loading ? <></> : <> <Grid item>
        <Typography variant="h6" component="h2">
          To begin...
        </Typography>
      </Grid>
        <Grid item>
          <LoginButton />
        </Grid>
        <Grid item>
          <Typography variant="h6">
            or
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" sx={{ borderRadius: 50 }}>
            Sign up
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            ( It'll be fun )
          </Typography>
        </Grid></>)
  }
  return (<></>)
}
export const WelcomeGrid: React.FC = () => {
  const tokenStatus = useAppSelector(state => state.tokens.status)
  const userIdFromAuth0Metadata: number | undefined = useAppSelector(state => state.tokens.auth0UserMetaData === undefined ? undefined : +state.tokens.auth0UserMetaData)
  return (
    <Grid container style={{ height: '100vh', width: '100vw' }}>
      <Grid item xs={12} style={{ height: '100vh', width: '100vw' }}>
        <Paper elevation={3} style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <MessageGridItem auth0Status={tokenStatus} />
          </Grid>
        </Paper>

      </Grid>
    </Grid>
  );
};







