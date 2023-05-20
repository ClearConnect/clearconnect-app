import React, { useEffect, useState } from 'react';
//import { useSelector, TypedUseSelectorHook } from 'react-redux';
//import { useDispatch } from 'react-redux'
//import { RootState } from './app/store'
import { useAppSelector, useAppDispatch } from './app/hooks'
//import { selectStatus } from './features/auth/AccessTokenSlice';
import { getAuth0APIAccessToken } from './features/auth/AccessTokenSlice'

import { useAuth0 } from "@auth0/auth0-react";
import Paper from "@mui/material/Paper";

//import logo from './logo.svg';
//import './App.css';
import ReqCardGrid from './features/jobs/ReqCardGrid';

//import { LoginButton } from "./features/auth/login"
import { WelcomeGrid } from "./theme/Theme"
import { darkTheme, lightTheme } from './theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import NavDrawer from './features/Nav/NavDrawer';

import { ToggleColorMode } from './app/ColorToggle';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ReqCard from './features/jobs/ReqCard';



//let openDrawer:boolean
//function handleDrawerClose() : void{}

interface AppProps { }

interface MyComponentState {
  isOpen: boolean;
}


//function App() {
const App: React.FC<AppProps> = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [open, setOpen] = useState<MyComponentState>({ isOpen: false });
  const authObject = useAuth0()
  const dispatch = useAppDispatch()
  const tokenStatus = useAppSelector(state => state.tokens.status)

  function handleAvatarClick(): void {
    setOpen({ isOpen: true })
  }

  const handleDrawerClose = () => {
    setOpen({ isOpen: false });
  };

  useEffect(() => {
    if (tokenStatus === 'idle' && authObject.isAuthenticated) {
      dispatch(getAuth0APIAccessToken(authObject))
    }
  }, [tokenStatus, authObject, dispatch])
//{(!isAuthenticated || tokenStatus !== 'succeeded') ? <WelcomeGrid /> : <ReqCardGrid cards={cards} AvatarClickFunction={handleAvatarClick} />}
  return (
    <>
      <div><Avatar sx={{
        position: 'absolute',
        top: '20px',
        left: '15px',
        zIndex: 1,
        opacity: 0.9,
      }} onClick={handleAvatarClick} >JD</Avatar></div>
      <div>
        {(!isAuthenticated || tokenStatus !== 'succeeded') ? <WelcomeGrid /> : <ReqCardGrid cntId={2037}/>}
      </div>
      <div> <NavDrawer items={["Item 1", "Item 2", "Item 3"]} isOpen={open.isOpen} onClose={handleDrawerClose} />    </div>
    </>
  );
}
export default App;


