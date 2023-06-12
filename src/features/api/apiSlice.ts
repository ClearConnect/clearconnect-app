// Import the RTK Query methods from the React-specific entry point
import { createSlice } from '@reduxjs/toolkit';
import { createApi, BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { ReqData } from '../jobs/ReqInterfaces';

interface successState {
  noContent: boolean,
  successRetCode: number
}

interface codeAction {
  type: string;
  payload: number;
}
const initsucessState: successState = { noContent: false, successRetCode: 0 }
export const apiResourceSlice = createSlice({
  name: 'resource',
  initialState: initsucessState,
  reducers: {
    codeReducer: (state: successState, action: codeAction): successState => {
      return { ...state, noContent: true, successRetCode: action.payload };
    },
  },
});


const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:7165',
  prepareHeaders: (headers, { getState }) => {
    const rtst: RootState = getState() as RootState
    const token = (getState() as RootState).tokens.JWTs.clearConnect
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});


// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with BASE_URL and have accept and authorizaion headers
  baseQuery: baseQuery,
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getContactInfo: builder.query<any, number>({
      // The URL for the request is '/fakeApi/posts'
      query: (contactId: number) => `/Contacts/${contactId}`,
      transformResponse: (rawResult: { result: { Contact: any } }, meta) => {
        //                                                        ^
        // The optional `meta` property is available based on the type for the `baseQuery` used

        // The return value for `transformResponse` must match `ResultType`
        return rawResult.result.Contact
      },
    }),
    getJobsForContact: builder.query<[any], number>({
      // The URL for the request is '/fakeApi/posts'
      query: (contactId: number) => {
        return `/Req/GetContactReqs/${contactId}`
      },
    }),
    getContactsForJob: builder.query<[any], number>({
      // The URL for the request is '/fakeApi/posts'
      query: (jrId) => {
        return `/Contact/GetReqContacts/${jrId}`
      },
      transformResponse: (rawResult: [any] , meta) => {
        //                                                        ^
        // The optional `meta` property is available based on the type for the `baseQuery` used
        // The return value for `transformResponse` must match `ResultType`
        if( meta?.response?.status === 204)
        { return [null]}
        return rawResult
      },

    }),
    AddJobForContact: builder.mutation<ReqData, { cntId: number, reqData: Pick<ReqData, 'JrPosDescription'> & Partial<ReqData> }>({
      //  AddJob: builder.mutation< ReqData, ReqData  >({
      query: ({ cntId, reqData }) => ({
        url: `/Req/PostReq/${cntId}`,
        method: 'POST',
        body: reqData,
      }),
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetContactsForJobQuery, useGetJobsForContactQuery, useGetContactInfoQuery, useAddJobForContactMutation } = apiSlice

export interface IdProp {
  Id: number;
} 