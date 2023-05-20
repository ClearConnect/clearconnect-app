// Import the RTK Query methods from the React-specific entry point
import { createApi, BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store';


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


interface Post {
  id: number
  name: string
  jrId: number
}

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
     /*  transformResponse: (rawResult:  [any] , meta) => {
        //                                                        ^
        // The optional `meta` property is available based on the type for the `baseQuery` used

        // The return value for `transformResponse` must match `ResultType`
        const Req1 = rawResult[0];
        const kuku = Req1.jrId
        const kuku1 = Req1.jrPositionTitle
        return rawResult
      }, */
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetJobsForContactQuery, useGetContactInfoQuery } = apiSlice
