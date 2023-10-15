import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Auth0ContextInterface } from "@auth0/auth0-react";
//import type { RootState } from '../../app/store'

export type auth0UserMetaDataType = { cnt_contact_id: number }
export interface authStateInterface {
  JWTs: { auth0: string, clearConnect: string },
  auth0UserMetaData: auth0UserMetaDataType | undefined,
  status: 'consent_required' | 'failed' | 'idle' | 'loading' | 'succeeded'
  error: string | undefined
}
const authInitialState: authStateInterface = {
  JWTs: { auth0: '', clearConnect: '' },
  auth0UserMetaData: undefined,
  //clearconnectUserData: undefined,
  status: 'idle',
  error: ''
}

export async function GetUserMetadata(authobject: Auth0ContextInterface, ): Promise<{ user_metadata: auth0UserMetaDataType, accessTokenAuth0: string }> {
  let accessTokenAuth0: string
  return new Promise((resolve, reject) => {
    const differentAudienceOptions = {
      authorizationParams: {
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
        redirect_uri: window.location.origin
      }
    }
     authobject.getAccessTokenWithPopup( differentAudienceOptions
    //authobject.getAccessTokenSilently(differentAudienceOptions
      /*  {
       authorizationParams: {
         audience: `https://${domain}/api/v2/`,
         scope: "read:current_user", authobject
       },
     } */
    ).then(accessToken => {
      accessTokenAuth0 = accessToken as string
      console.log('auth0 AccessToken', accessToken);
      //resolve(result);
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${authobject.user?.sub}`;
      return fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
    }).then(metadataResponse => {
      return metadataResponse.json()
    }).then(jsonObject => {
      const { user_metadata } = jsonObject
      resolve({ user_metadata: user_metadata, accessTokenAuth0: accessTokenAuth0 })
    }).catch(error => {
      console.error('The Promise was rejected with:', error);
      reject(error + '(while getting Auth0 API JWT)');
    });
  });
}

async function GetClearConnectToken(auth0object: Auth0ContextInterface): Promise<string> {
  let accessTokenClearconnect_API: string
  return new Promise((resolve, reject) => {
    auth0object.getAccessTokenSilently({
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: `https://clearconnect_API`,
        scope: "ReqAccess EventAccess"
      }
    }).then(accessToken => {
      accessTokenClearconnect_API = accessToken
      console.log('ClearConnect AccessToken', accessToken);
      resolve(accessTokenClearconnect_API);
    }).catch(error => {
      console.error('The Promise was rejected with:', error);
      reject(error);
    });
  });
}


interface auth0PayloadInterface {
  auth0: string,
  clearConnect: string,
  auth0UserMetaData: auth0UserMetaDataType
}
//https://redux.js.org/tutorials/essentials/part-5-async-logic#sending-data-with-thunks
export const getJwtTokens_Auth0AndClearConnect = createAsyncThunk<auth0PayloadInterface, Auth0ContextInterface>(
  'auth/auth0apiaccesstoken',
  async (authobject, thunkApi) => {
    //const mystate = thunkApi.getState()
    //const {user_metadata, accessTokenAuth0} = await GetUserMetadata(authobject)
    const p1 = GetUserMetadata(authobject)
    //const response1 = await p1
    const p2 = GetClearConnectToken(authobject)
    //const  clearConnectToken = await p2    
    const [response1, clearConnectToken] = await Promise.all([p1, p2])
    return { auth0: response1.accessTokenAuth0, clearConnect: clearConnectToken, auth0UserMetaData: response1.user_metadata }
  }
)
const domain = "dev-1tkiivqacmubkas5.us.auth0.com";
const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: authInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getJwtTokens_Auth0AndClearConnect.pending, (state, action) => {
      state.status = 'loading'
    })
      .addCase(getJwtTokens_Auth0AndClearConnect.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        const auth0Payload: auth0PayloadInterface = action.payload
        state.auth0UserMetaData = auth0Payload.auth0UserMetaData
        state.JWTs = { auth0: auth0Payload.auth0, clearConnect: auth0Payload.clearConnect }

      })
      .addCase(getJwtTokens_Auth0AndClearConnect.rejected, (state, action) => {
        state.error = action.error.message
        if (action.error.message?.toLowerCase().includes('consent')) {
          state.status = 'consent_required'
        } else
          state.status = 'failed'

      })
  }
})


//export const { getAuth0APIAccessToken } = accessTokenSlice.actions

export default accessTokenSlice.reducer
export const selectStatus = (state: authStateInterface) => state.status