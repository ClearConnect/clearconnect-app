import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import store from './app/store'
import { Provider } from 'react-redux'

import { darkTheme, lightTheme } from './theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToggleColorMode } from './app/ColorToggle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
    <ToggleColorMode child={
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
            //prompt: "consent"
          }}
        >
          <ToggleColorMode child={<App />} />

        </Auth0Provider>
      </Provider>
    } />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
