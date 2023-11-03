// Import the RTK Query methods from the React-specific entry point
import { createSlice } from '@reduxjs/toolkit';
import { createApi, /* BaseQueryFn, */ fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import { useDispatch } from 'react-redux';
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
    //const rtst: RootState = getState() as RootState
    const token = (getState() as RootState).tokens.JWTs.clearConnect
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});


// Define our single API slice object
export const clearConnectApiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with BASE_URL and have accept and authorizaion headers
  baseQuery: baseQuery,
  tagTypes: ['Reqs4Contact'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    getContactInfo: builder.query<any, number>({
      query: (contactId: number) => `/Contacts/${contactId}`,
    }),
    getJobsForContact: builder.query<[any], number>({
      query: (contactId: number) => {
        return `/Req/GetContactReqs/${contactId}`
      },
      providesTags: (result) => {
        if (result) {
          return [...result.map(({ jrId }) => ({ type: 'Reqs4Contact' as const, id: jrId })), { type: 'Reqs4Contact', id: 'LIST' }]
        }
        return [{ type: 'Reqs4Contact' as const, id: 'LIST' }]
      }
    }),
    getContactsForJob: builder.query<[any], number>({
      query: (jrId) => {
        return `/Contact/GetReqContacts/${jrId}`
      },

    }),
    AddJobForContact: builder.mutation<ReqData, { cntId: number, reqData: Pick<ReqData, 'JrPosDescription'> & Partial<ReqData> }>({
      //  AddJob: builder.mutation< ReqData, ReqData  >({
      query: ({ cntId, reqData }) => ({
        url: `/Req/PostReq?cntId=${cntId}`,
        method: 'POST',
        body: reqData,
      }),
      invalidatesTags: [{ type: 'Reqs4Contact', id: 'LIST' }]
    }),
    DeleteReq: builder.mutation<void, { cntId: number, jrId: number }>({
      query: ({ cntId, jrId }) => ({
        url: `/Req?cntId=${cntId}&jrId=${jrId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, response, deleted) => {
        if (response == undefined)//delete ok          
          return [{ type: 'Reqs4Contact', id: deleted.jrId }]
        return []

      }
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetContactsForJobQuery, useGetJobsForContactQuery, useGetContactInfoQuery,
  useAddJobForContactMutation, useDeleteReqMutation } = clearConnectApiSlice

export interface IdProp {
  Id: number;
} 