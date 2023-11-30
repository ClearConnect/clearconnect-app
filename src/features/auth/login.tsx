import React from "react";
import { useAuth0/* , RedirectLoginOptions */ } from "@auth0/auth0-react";
import { /* Snackbar, */ Button } from '@mui/material';




export const LoginButton: React.FC<{}> = () => {
    const { loginWithRedirect } = useAuth0();
    return (<Button  variant="contained" sx={{borderRadius: 50}} onClick={() => loginWithRedirect()}>
        Log In
        </Button>)
};

export const LoginButtonAPI: React.FC<{}> = () => {
  const { loginWithRedirect } = useAuth0();
  return (<Button  variant="contained" sx={{borderRadius: 50}} onClick={() => loginWithRedirect(
{
  //authorizationParams: {{
    
    //redirect_uri: window.location.origin,
    //audience: "https://dev-1tkiivqacmubkas5.us.auth0.com/api/v2/",
    //scope: "read:current_user read:users read:users_app_metadata",   
}

  )}>
      Log In
      </Button>)
};

export const LogoutButton: React.FC<{}> = () => {
    const { logout } = useAuth0();
  
    return (
      <Button    variant="contained" sx={{borderRadius: 50}}
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </Button>
    );
  };

