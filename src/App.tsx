import React, { ReactNode, useEffect, useState } from 'react';
//import { useSelector, TypedUseSelectorHook } from 'react-redux';
//import { useDispatch } from 'react-redux'
//import { RootState } from './app/store'
import { useAppSelector, useAppDispatch } from './app/hooks'
//import { selectStatus } from './features/auth/AccessTokenSlice';
import { getJwtTokens_Auth0AndClearConnect } from './features/auth/AccessTokenSlice'
import { IdProp } from './features/api/ClearConnectApiSlice'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

import { ReqCardGrid } from './features/jobs/ReqCardGrid';
import { MessageGridWrappedWithState, MessageOnEmptyScreen } from "./theme/Theme"
import NavDrawer from './features/Nav/NavDrawer';
import { Avatar } from '@mui/material';

import { JobEdit } from './features/jobs/PastJobRHF';

//import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useParams
} from "react-router-dom";

import ContactCardGrid from './features/contacts/ContactCardGrid'
import MediaControlCard from './features/contacts/ContactMedia';
import { AuthPopUp } from './features/auth/AuthPopUp';
import { ToggleColorMode } from './app/ColorToggle';
import { Provider } from 'react-redux';
import store from './app/store';
interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | undefined,
  errorInfo: React.ErrorInfo | undefined
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: true, error: undefined, errorInfo: undefined }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    //console.log(errorInfo)
    this.state = { hasError: true, errorInfo: errorInfo, error: error }
  }
  //static getDerivedStateFromError(error: Error): ErrorBoundaryState {
  //return { hasError: true, error: undefined, errorInfo: undefined }
  //}

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (<div>Something Went Wrong {this.state.error?.message}  </div>)
    }
    return this.props.children
  }
}


interface AppProps { }
export const AppWithStoreAuth0Povider: React.FC = () => {
  return (
    <Provider store={store}>
      <Auth0Provider
        domain="dev-1tkiivqacmubkas5.us.auth0.com"
        clientId="gZxAQIU9dXOMozZwikrSHAw7LAivYq34"
        authorizationParams={{
          useRefreshTokens: false,
          redirect_uri: window.location.origin,
          //audience: "https://dev-1tkiivqacmubkas5.us.auth0.com/api/v2/",
          //scope: "read:current_user read:users read:users_app_metadata",
          audience: "https://clearconnect_API",
          scope: "ReqAccess EventAccess",
          prompt: "consent"
        }}
      >
        <ToggleColorMode children={<App />} />
      </Auth0Provider>
    </Provider>


  )
}






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
    //const { cnt_contact_id } = state.tokens.auth0UserMetaData
    return state.tokens.auth0UserMetaData.cnt_contact_id
  })


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
   /*  const handleNavigateAway = (event: BeforeUnloadEvent) => {
      console.log( 'BeforeUnloadEvent')
      const message = 'Sure you want to leave?';
      event.preventDefault();
      event.returnValue = true
    };
    console.log('App addEventListener(beforeunload ')
    window.addEventListener('beforeunload', handleNavigateAway, true);
*/
    if (tokenStatus === 'idle' && authObject.isAuthenticated) {
      dispatch(getJwtTokens_Auth0AndClearConnect(authObject))
    }   
   
    // Cleanup the event listener when the component unmounts
    //return () => {
    //  window.removeEventListener('beforeunload', handleNavigateAway);
    //};
  }, [tokenStatus, authObject, dispatch])
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/"
            element=
            {
              <div>
                {(isLoading) && <MessageGridWrappedWithState />}
                {!isAuthenticated && <MessageGridWrappedWithState />}
                {(tokenStatus === 'failed') && <MessageOnEmptyScreen message={"Oops...  Authenticatioin provider reported: " + tokenError} />}
                {(tokenStatus === 'consent_required') && <AuthPopUp authObject={authObject} show={true} children={[]} />}
                {(tokenStatus === 'succeeded' && (userIdFromAuth0Metadata === undefined || userIdFromAuth0Metadata === 0)) && <MessageOnEmptyScreen message="Oops...  Looks like your Auth0 set up is missig metadata not been completed.  Please call 917.509.4725" />}
                {(tokenStatus === 'succeeded' && isAuthenticated && userIdFromAuth0Metadata > 0) && <ReqCardGrid id={userIdFromAuth0Metadata} />}
              </div>
            } />
          <Route path="/PasteJob/:Id" element={< UserPageWrapper component={JobEdit} />} />
          <Route path="/JobContacts/:Id" element={< UserPageWrapper component={ContactCardGrid} />} />
          <Route path="/me" element={< UserPageWrapper component={MediaControlCard} />} />
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
          { itemTitle: "Job Contacts", itemHref: "/JobContacts/:Id" },
          { itemTitle: "Me", itemHref: "/me" }
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
  const dynamicProp = { id: parseInt(Id as string) };
  return <Component {...dynamicProp} />;
};

export default App

