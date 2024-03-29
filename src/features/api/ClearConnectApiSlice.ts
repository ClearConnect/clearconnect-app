// Import the RTK Query methods from the React-specific entry point
import { createSlice } from '@reduxjs/toolkit';
import { createApi, /* BaseQueryFn, */ fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
//import { useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { JobReqConsultantDTO, JobReqConsultantDTOUpdate, LovDTO, ReqData } from '../jobs/ReqInterfaces';

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

//const apiUrl = process.env.REACT_APP_API_BASE_URL || 'default-url';
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL_overwrite || process.env.REACT_APP_API_BASE_URL,// || 'https://localhost:7165',// 'https://localhost:7165',
  prepareHeaders: (headers, { getState }) => {
    const baseUrlValue = process.env.REACT_APP_API_BASE_URL_overwrite || process.env.REACT_APP_API_BASE_URL
    console.log('base URL:' + baseUrlValue)
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
    getLov: builder.query<LovDTO, void>({
      query: () => "/lov"
    }),
    getContactInfo: builder.query<any, number>({
      query: (contactId: number) => `/Contacts/${contactId}`,
    }),
    getJobsForContact: builder.query<[JobReqConsultantDTO], number>({
      query: (contactId: number) => {
        return `/Req/GetContactReqs/${contactId}`
      },
      providesTags: (result) => {
        if (result) {
          return [...result.map(({ id, jrId }) => ({ type: 'Reqs4Contact' as const, id: id ? id : jrId })), { type: 'Reqs4Contact', id: 'LIST' }]
        }
        return [{ type: 'Reqs4Contact' as const, id: 'LIST' }]
      }
    }),
    getContactsForJob: builder.query<[any], number>({
      query: (jrId) => {
        return `/Contact/GetReqContacts/${jrId}`
      },

    }),
    AddJobForContact: builder.mutation<ReqData, { cntId: number, reqData: Pick<ReqData, 'jrPosDescription'> & Partial<ReqData> }>({
      //  AddJob: builder.mutation< ReqData, ReqData  >({
      query: ({ cntId, reqData }) => ({
        url: `/Req/PostReq?cntId=${cntId}`,
        method: 'POST',
        body: reqData,
      }),
      invalidatesTags: [{ type: 'Reqs4Contact', id: 'LIST' }]
    }),
    DeleteContactReq: builder.mutation<void, { cntId: number, jrId: string }>({
      query: ({ cntId, jrId }) => ({
        url: `/Req?cntId=${cntId}&jrId=${jrId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, response, deleted) => {
        if (response == undefined)//delete ok          
          return [{ type: 'Reqs4Contact', id: deleted.jrId }]
        return []

      }
    }),
    UpdateContactReq: builder.mutation<JobReqConsultantDTO, { cntId: number, jobReqConsultantDTO: JobReqConsultantDTOUpdate }>({
      query: ({ cntId, jobReqConsultantDTO }) => ({
        url: `/Req?cntId=${cntId}`,
        method: 'PATCH',
        body: jobReqConsultantDTO,
      }),
      invalidatesTags: (result, response, updated) => {
        if (response == undefined)//delete ok     
        {
          if (result?.consultantReqInterestDTO.cnsintId === 18)  //no go
            return [{ type: 'Reqs4Contact', id: updated.jobReqConsultantDTO.jrId }]
        }
        return []

      }
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetLovQuery, useGetContactsForJobQuery, useGetJobsForContactQuery, useGetContactInfoQuery,
  useAddJobForContactMutation, useDeleteContactReqMutation, useUpdateContactReqMutation } = clearConnectApiSlice

export interface IdProp {
  id: number;
}
/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}
/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}