import React, { useEffect, useState } from 'react';
//import { useSelector, TypedUseSelectorHook } from 'react-redux';
//import { useDispatch } from 'react-redux'
//import { RootState } from './app/store'
import { useAppSelector, useAppDispatch } from './app/hooks'
//import { selectStatus } from './features/auth/AccessTokenSlice';
import { getAuth0APIAccessToken } from './features/auth/AccessTokenSlice'
import {  IdProp } from './features/api/apiSlice'
import { useAuth0 } from "@auth0/auth0-react";

import ReqCardGrid from './features/jobs/ReqCardGrid';
import { WelcomeGrid, MessageOnEmptyScreen } from "./theme/Theme"
import NavDrawer from './features/Nav/NavDrawer';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import { NewJobForContact } from './features/jobs/PasteJobDesc';

import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
  useParams 
} from "react-router-dom";

import ContactCardGrid from './features/contacts/ContactCardGrid'


interface AppProps { }

interface MyComponentState {
  isOpen: boolean;
  optionSelected: string | null
}
/* export default function App() {
  return <RouterProvider router={router} />;
} */
const App: React.FC<AppProps> = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [drawerState, setDrawerState] = useState<MyComponentState>({ isOpen: false, optionSelected: '' });
  const authObject = useAuth0()
  const dispatch = useAppDispatch()
  const tokenStatus = useAppSelector(state => state.tokens.status)
  const tokenError = useAppSelector(state => state.tokens.error)
  const userIdFromAuth0Metadata: number = useAppSelector(state => {
    if (state.tokens.auth0UserMetaData === undefined)
      return 0
    const { cnt_contact_id } = state.tokens.auth0UserMetaData
    return state.tokens.auth0UserMetaData.cnt_contact_id
  })
  const kukuk = userIdFromAuth0Metadata
  function handleAvatarClick(): void {
    setDrawerState({ ...drawerState, isOpen: true })
  }
  const handleDrawerClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    setDrawerState({ ...drawerState, optionSelected: event.currentTarget.textContent })
    console.log(`Clicked on ${event.currentTarget.innerText}`);
  }

  const handleDrawerClose = () => {
    setDrawerState({ ...drawerState, isOpen: false });
  };

  useEffect(() => {
    if (tokenStatus === 'idle' && authObject.isAuthenticated) {
      dispatch(getAuth0APIAccessToken(authObject))
    }
  }, [tokenStatus, authObject, dispatch])

  const newJobOptionSelected: boolean = false//drawerState.optionSelected == 'Item 1'
// cntId={userIdFromAuth0Metadata} />} />
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/"
            element=
            {(
              <div>
                {(tokenStatus === 'failed') ? <MessageOnEmptyScreen message={"Oops...  Authenticatioin provider reporeted this error: " + tokenError} /> :
                  (tokenStatus === 'succeeded' && userIdFromAuth0Metadata === 0) ? <MessageOnEmptyScreen message="Oops...  Looks like your Auth0 set up is missig metadata not been completed.  Please call 917.509.4725" /> :
                    (!isAuthenticated || tokenStatus !== 'succeeded') ? <WelcomeGrid /> : <ReqCardGrid Id={userIdFromAuth0Metadata} />
                }
              </div>
            )} />
            <Route path="/PasteJob/:Id" element={< UserPageWrapper component={NewJobForContact} />} />
            <Route path="/JobContacts/:Id" element={< UserPageWrapper component={ContactCardGrid}   />} />
        </Routes>
        <div><Avatar sx={{
          position: 'absolute',
          top: '20px',
          left: '15px',
          zIndex: 1,
          opacity: 0.9,
        }} onClick={handleAvatarClick} >JD</Avatar></div>

        <div> <NavDrawer items={[
          { itemTitle: "Paste Job", itemHref: "/PasteJob/:Id" },
          { itemTitle: "Jobs", itemHref: "/" },
          { itemTitle: "Job Contacts", itemHref: "/JobContacts/:Id" }
        ]} isOpen={drawerState.isOpen} onClose={handleDrawerClose} onClick={handleDrawerClick} />    </div>
      </>
    </BrowserRouter>
  );
}

const UserPageWrapper: React.FC<{
  component: React.ComponentType<IdProp>;
  //propName: string;
}> = ({ component: Component }) => {
  const { Id } = useParams();
  const dynamicProp = { Id: parseInt(Id as string) };
  return <Component {...dynamicProp} />;
};

export default App

